"use client";

import Image from "next/image";
import React from "react";

export default function Page() {
  const [events, setEvents] = React.useState([]);
  const [games, setGames] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/games")
      .then(async (res) => {
        const body = await res.json();
        return body;
      })
      .then((data) => {
        const { games } = data;
        if (Array.isArray(games)) {
          setGames(games);
        } else {
          setGames([]);
        }
      })
      .catch((err) => {     
        console.error("Failed to fetch games:", err);
        setGames([]);
      });
    // Fetch events from the API
    fetch("/api/events")
      .then(async (res) => {
        const body = await res.json();
        return body;
      })
      .then((data) => {
        if (Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setEvents([]);
      });
  }, []);
  return (
    <div style={{
      maxWidth: 700,
      margin: "2rem auto",
      background: "#fff",
      padding: "2rem",
      borderRadius: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      fontFamily: "Arial, sans-serif",
      color: "#222",
      backgroundColor: "#f9f9f9"
    }}>
      <h1 style={{ color: "#2c3e50" }}>Here are the events that are going on now</h1>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ color: "#34495e" }}>{event.name}</h2>
            <p>Games Supported:</p>
            { event.gamesSupported && event.gamesSupported.length > 0 ? (
              <ul style={{ marginLeft: "1.5rem" }}>
                {event.gamesSupported.map((gameId) => {
                  const game = games.find(g => g.id === gameId);
                  if (!game) {
                    return <li key={gameId}>Game not found</li>;
                  }
                  return (
                    <li key={gameId}>{game.name}</li>
                  );
                })}
              </ul>
            ) : (
              <p>No games supported.</p>
            )}
          </div>
        ))
      ) : (
        <p>No events available at the moment.</p>
      )}
    </div>
  );
}