import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import RightMenu from "./RightMenu"; // Dodaj import

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

  // Dodaj stany do panelu bocznego:
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLocation, setWeatherLocation] = useState("Warszawa");

  // Funkcje do obsługi pogody i wyszukiwania (skopiuj z LoginScreen)
  async function getCoords(city) {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pl&format=json`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return {
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
        name: data.results[0].name
      };
    }
    throw new Error("Nie znaleziono miasta");
  }

  async function fetchWeather(city) {
    try {
      const coords = await getCoords(city);
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`
      );
      const data = await res.json();
      setWeatherData({ ...data.current_weather, city: coords.name });
    } catch (e) {
      setWeatherData({ error: "Błąd pobierania pogody" });
    }
  }

  useEffect(() => {
    fetchWeather(weatherLocation);
  }, [weatherLocation]);

  // Przykładowa funkcja wyszukiwania (możesz podmienić na własną)
  async function searchGames(query) {
    // ...implementacja lub kopiuj z LoginScreen...
    setSearchResults([]); // tymczasowo pusta
  }

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const gameList = await searchGames(value);
      setSearchResults(gameList);
    } catch (error) {
      setSearchResults([]);
      alert("Wystąpił błąd podczas wyszukiwania gier: " + error.message);
    }
  };

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
            <button 
              onClick={handleSave} 
              disabled={saving} 
              style={{ 
                marginTop: 16, 
                background: 'none', border: 'none', padding: '5px', cursor: 'pointer' 
              }}
              title={saving ? "Saving..." : "Save"}
            >
              <img src="/dyskietka.png" alt={saving ? "Saving..." : "Save"} style={{ width: '24px', height: '24px' }} />
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
          <button 
            onClick={handleCreateNote} 
            disabled={creating || !newNoteTitle.trim()}
            style={{ 
              background: 'none', border: 'none', padding: '5px', cursor: 'pointer', verticalAlign: 'middle' 
            }}
            title={creating ? "Creating..." : "Add Note"}
          >
            <img 
              src="/save.png" 
              alt={creating ? "Creating..." : "Add Note"} style={{ width: '24px', height: '24px' }} />
          </button>
        </div>
        {tree.length > 0 ? renderTree(tree) : <div>No notes yet.</div>}
      </div>
      {/* Right Dropdown Panel */}
      <RightMenu
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        searchResults={searchResults}
        weatherData={weatherData}
        weatherLocation={weatherLocation}
        setWeatherLocation={setWeatherLocation}
      />
    </div>
  );
}

export default NoteScreen;