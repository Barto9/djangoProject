import React, { useState, useEffect } from "react";
import GDDList from './GddList';

export default function LoginScreen({ setIsLoggedIn }) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ email: "", username: "", password: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLocation, setWeatherLocation] = useState("Warszawa");

  // Funkcja do pobierania współrzędnych miasta (prosty przykład, można rozbudować)
  async function getCoords(city) {
    // Open-Meteo geocoding API
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

  // Funkcja do pobierania pogody
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

  // Pobierz pogodę przy pierwszym renderze i po zmianie miasta
  useEffect(() => {
    fetchWeather(weatherLocation);
  }, [weatherLocation]);


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
      localStorage.setItem('access', data.access);
      setIsLoggedIn(true); // <-- update parent state!
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

  async function searchGames(query) {
    const clientId = '***'; // Podmień na swój Client ID
    const clientSecret = '***'; // Podmień na swój Client Secret

    // Step 1: Get access token from Twitch
    const tokenResponse = await fetch(
      "https://id.twitch.tv/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        Authorization: 'Bearer ' + clientSecret,
        body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      }
    );
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    alert("Access Token: " + accessToken); // Debugging line to check the token
    // Step 2: Search games using IGDB API
  const igdbResponse = await fetch('https://*****.execute-api.us-west-2.amazonaws.com/production/v4/games', {
    method: 'POST',
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      //query: query,
      limit: 10,
    }),
  });

  if (!igdbResponse.ok) {
    // Handle HTTP errors
    alert(`Request failed: ${igdbResponse.status}`);
  }

  const games = await igdbResponse.json();
  return games;
}

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
      
      {/* Search Input and Results - Top Right */}
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

// RightMenu component for the right section
function RightMenu({ searchQuery, handleSearchChange, searchResults, weatherData, weatherLocation, setWeatherLocation }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "350px",
        padding: "20px",
        borderLeft: "1px solid black",
        borderBottom: "1px solid black",
        background: "#fff",
        zIndex: 10,
        minHeight: "100px"
      }}
    >
      <button
        style={{ float: "right", background: 'none', border: 'none', padding: '5px', cursor: 'pointer' }}
        title="Menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <img src="/menu.png" alt="Menu" style={{ width: '24px', height: '24px' }} />
      </button>
      {menuOpen && (
        <div>
          <h3 style={{ marginTop: "60px" }}>Wyszukaj grę</h3>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <div id="results">
            {searchResults && searchResults.length > 0 ? (
              <div>
                <h4>Wyniki wyszukiwania:</h4>
                <ul style={{ paddingLeft: "20px" }}>
                  {searchResults.map((game) => (
                    <li key={game.id}>
                      {game.cover?.url && (
                        <img src={game.cover.url} alt={game.name} width="100" />
                      )}
                      <div>
                        <strong>{game.name}</strong> - Ocena: {game.rating || "Brak danych"}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              searchQuery && <div>Brak wyników.</div>
            )}
          </div>
          {/* WEATHER SECTION */}
          <div style={{ marginTop: "30px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
            <h4>Aktualna pogoda</h4>
            <form
              onSubmit={e => {
                e.preventDefault();
                setWeatherLocation(e.target.elements.city.value);
              }}
              style={{ marginBottom: "10px" }}
            >
              <input
                type="text"
                name="city"
                placeholder="Miasto"
                defaultValue={weatherLocation}
                style={{ width: "70%", marginRight: "5px" }}
              />
              <button type="submit">Pokaż</button>
            </form>
            {weatherData ? (
              weatherData.error ? (
                <div>{weatherData.error}</div>
              ) : (
                <div>
                  <div><strong>{weatherData.city}</strong></div>
                  <div>Temperatura: {weatherData.temperature}°C</div>
                  <div>Wiatr: {weatherData.windspeed} km/h</div>
                  <div>Kierunek wiatru: {weatherData.winddirection}°</div>
                </div>
              )
            ) : (
              <div>Ładowanie pogody...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
