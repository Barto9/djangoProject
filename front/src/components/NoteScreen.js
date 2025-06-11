import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";

function NoteScreen() {
  const { gddId } = useParams();
  const [tree, setTree] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [creating, setCreating] = useState(false);

  // Fetch hierarchical notes
  useEffect(() => {
    api.get(`/editor/gdd/${gddId}/notes-hierarchy/`)
      .then(res => setTree(res.data))
      .catch(err => console.error(err));
  }, [gddId]);

  // Fetch note details when selected
  useEffect(() => {
    if (!selectedNote) return;
    api.get(`/editor/gdd/${gddId}/notes/${selectedNote}/`)
      .then(res => {
        setNoteTitle(res.data.title);
        setNoteContent(res.data.content);
      })
      .catch(err => console.error(err));
  }, [selectedNote, gddId]);

  // Save note
  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/editor/gdd/${gddId}/notes/${selectedNote}/`, {
        title: noteTitle,
        content: noteContent,
      });
      alert("Note saved!");
    } catch (err) {
      alert("Save failed");
    }
    setSaving(false);
  };

  // Create new note
  const handleCreateNote = async () => {
    if (!newNoteTitle.trim()) return;
    setCreating(true);
    try {
      // parent: null means root note; you can add parent selection if needed
      const res = await api.post(`/editor/gdd/${gddId}/notes/`, {
        title: newNoteTitle,
        content: "",
        parent: null,
      });
      setNewNoteTitle("");
      // Reload tree and select the new note
      api.get(`/editor/gdd/${gddId}/notes-hierarchy/`)
        .then(res2 => {
          setTree(res2.data);
          setSelectedNote(res.data.id);
        });
    } catch (err) {
      if (err.response) {
    alert(JSON.stringify(err.response.data));
  } else {
    alert("Failed to create note");
  }
    }
    setCreating(false);
  };

  // Recursive tree rendering
  const renderTree = (nodes) => (
    <ul style={{ listStyle: "none", paddingLeft: 16 }}>
      {nodes.map(node => (
        <li key={node.id}>
          <span
            style={{
              cursor: "pointer",
              fontWeight: selectedNote === node.id ? "bold" : "normal",
              color: selectedNote === node.id ? "#0074d9" : "#333"
            }}
            onClick={() => setSelectedNote(node.id)}
          >
            {node.title}
          </span>
          {node.children && node.children.length > 0 && renderTree(node.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Note Editor */}
      <div style={{ flex: 3, padding: 32 }}>
        {selectedNote ? (
          <div>
            <input
              value={noteTitle}
              onChange={e => setNoteTitle(e.target.value)}
              style={{ fontSize: 24, width: "100%", marginBottom: 16 }}
              placeholder="Note title"
            />
            <textarea
              value={noteContent}
              onChange={e => setNoteContent(e.target.value)}
              style={{ width: "100%", height: "70vh", fontSize: 16 }}
              placeholder="Note content"
            />
            <br />
            <button onClick={handleSave} disabled={saving} style={{ marginTop: 16 }}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <div style={{ color: "#888" }}>Select a note from the right to edit.</div>
        )}
      </div>
      {/* Hierarchical Note List */}
      <div style={{
        flex: 1,
        borderLeft: "1px solid #ccc",
        padding: 24,
        overflowY: "auto",
        background: "#f9f9f9"
      }}>
        <h3>Notes</h3>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="New note title"
            value={newNoteTitle}
            onChange={e => setNewNoteTitle(e.target.value)}
            style={{ width: "70%", marginRight: 8 }}
          />
          <button onClick={handleCreateNote} disabled={creating || !newNoteTitle.trim()}>
            {creating ? "Creating..." : "Add"}
          </button>
        </div>
        {tree.length > 0 ? renderTree(tree) : <div>No notes yet.</div>}
      </div>
    </div>
  );
}

export default NoteScreen;