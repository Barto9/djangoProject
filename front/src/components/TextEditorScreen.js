import React, { useState } from "react";

export default function TextEditorScreen() {
  const [title, setTitle] = useState("Untitled Document");
  const [content, setContent] = useState("");

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "Segoe UI, sans-serif" }}>
      {/* Toolbar */}
      <div style={{ backgroundColor: "#f3f3f3", padding: "10px 20px", borderBottom: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ fontSize: "1.2rem", border: "none", background: "transparent", fontWeight: "bold" }}
        />
        <div>
          <button style={buttonStyle}>Save</button>
          <button style={buttonStyle}>Export</button>
        </div>
      </div>

      {/* Formatting bar */}
      <div style={{ backgroundColor: "#fff", padding: "8px 20px", borderBottom: "1px solid #ccc", display: "flex", gap: "10px" }}>
        <button style={buttonStyle}>Bold</button>
        <button style={buttonStyle}>Italic</button>
        <button style={buttonStyle}>Underline</button>
        <select style={buttonStyle}>
          <option value="normal">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
        </select>
        <button style={buttonStyle}>🖋️ Font</button>
        <button style={buttonStyle}>🎨 Color</button>
      </div>

      {/* Main editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ flexGrow: 1, padding: "20px", fontSize: "1rem", lineHeight: "1.6", border: "none", outline: "none", resize: "none" }}
        placeholder="Start typing your document..."
      />
    </div>
  );
}

const buttonStyle = {
  padding: "6px 12px",
  fontSize: "0.9rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#f9f9f9",
  cursor: "pointer",
};
