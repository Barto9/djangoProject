import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import GDDList from "./components/GddList";
import GDDCreator from './components/GDDCreator';
import NoteScreen from "./components/NoteScreen";

<Route path="/gdd/create" element={<GDDCreator />} />

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));

  // Keep isLoggedIn in sync with localStorage (for reloads, logout, etc.)
  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem('access'));
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/gdds" /> : <LoginScreen setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/gdds"
          element={
            isLoggedIn ? <GDDList /> : <Navigate to="/" />
          }
        />
        <Route
          path="/gdd/:gddId/notes/"
          element={
            isLoggedIn ? <NoteScreen /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
