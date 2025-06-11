import React, { useState, useEffect } from "react";

export default function RightMenu({
  searchQuery,
  handleSearchChange,
  searchResults,
  weatherData,
  weatherLocation,
  setWeatherLocation,
}) {
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
      <button style={{ float: "right" }} title="Menu">
        ☰
      </button>
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
              <button
                style={{ marginTop: "10px" }}
                onClick={() => {
                  const text =
                    `Pogoda dla ${weatherData.city}:\n` +
                    `Temperatura: ${weatherData.temperature}°C\n` +
                    `Wiatr: ${weatherData.windspeed} km/h\n` +
                    `Kierunek wiatru: ${weatherData.winddirection}°`;
                  navigator.clipboard.writeText(text);
                }}
              >
                Kopiuj do schowka
              </button>
            </div>
          )
        ) : (
          <div>Ładowanie pogody...</div>
        )}
      </div>
    </div>
  );
}