import React, { useState } from "react";

export default function LoginScreen() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ email: "", username: "", password: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoginSuccess(null);

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoginError(errorData.detail || "Login failed");
        return;
      }

      const data = await response.json();
      setLoginSuccess("Login successful!");
      console.log("Logged in user data:", data);
      // TODO: save tokens/session, redirect, etc.
    } catch (error) {
      setLoginError("Network error");
      console.error("Login error:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError(null);
    setRegisterSuccess(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setRegisterError(errorData.detail || "Registration failed");
        return;
      }

      const data = await response.json();
      setRegisterSuccess("Registration successful! Please log in.");
      console.log("Registered user data:", data);
      // Optionally clear the register form
      setRegisterData({ email: "", username: "", password: "" });
    } catch (error) {
      setRegisterError("Network error");
      console.error("Register error:", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Left Section */}
      <div style={{ flex: 3, padding: "20px" }}>
        <h2>wiadomość powitalna</h2>
        <div style={{ border: "1px solid black", padding: "10px", width: "300px", marginBottom: "30px" }}>
          Witaj developerze!
        </div>

        {/* Login Form */}
        <h3>okno logowania</h3>
        <form onSubmit={handleLogin} style={{ border: "1px solid black", padding: "10px", width: "300px", marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="login"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="********"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
          <button type="submit">Zaloguj</button>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          {loginSuccess && <p style={{ color: "green" }}>{loginSuccess}</p>}
        </form>

        {/* Registration Form */}
        <h3>nowy użytkownik</h3>
        <form onSubmit={handleRegister} style={{ border: "1px solid black", padding: "10px", width: "300px" }}>
          <input
            type="email"
            placeholder="email@email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="login"
            value={registerData.username}
            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="********"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
          <button type="submit">Zarejestruj</button>
          {registerError && <p style={{ color: "red" }}>{registerError}</p>}
          {registerSuccess && <p style={{ color: "green" }}>{registerSuccess}</p>}
        </form>
      </div>

      {/* Right Section (Search + Menu) */}
      <div style={{ flex: 1, borderLeft: "1px solid black", padding: "20px" }}>
        <button style={{ float: "right" }} title="Menu">
          ☰
        </button>
        <div style={{ marginTop: "60px" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <div>
            <div>1. result</div>
            <div>2. result</div>
            <div>3. result</div>
          </div>
          <p style={{ fontSize: "0.8em", color: "#555", marginTop: "20px" }}>
            Wyszukiwarka informacji o grach w IGDB pozostaje aktywna
          </p>
        </div>
      </div>
    </div>
  );
}
