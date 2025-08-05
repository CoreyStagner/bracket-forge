"use client";

import Form from "./components/Form/Form";
import Select from "./components/Form/components/Select";
import "./styles/globals.css";

import React, { useState } from "react";

export default function Page({}: Readonly<{
  children: React.ReactNode;
}>) {

  const [currentGame, setCurrentGame] = useState<string | null>(null);
  
  // TODO: Create an API call to fetch existing games from a database
  const [games, setGames] = useState<Game[]>([]);

  React.useEffect(() => {
    // This is where you would fetch the games from an API or database
    // For now, we are using a static list
    fetch("/api/games")
      .then(async (res) => {
        const body = await res.json();
        return body;
      })
      .then((data) => {
        const { games } = data;
        if (Array.isArray(games)) {
          setGames(games);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch games:", err);
        setGames([]);
      });
  }, []);

  const handleSettingUpNewGame = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedGame = formData.get("selected-game") as string;
    setCurrentGame(selectedGame);
  };

  return (
    <>
      <main>
          <h1>Bracket Forge</h1>
          {currentGame ? (
              <>
                <div>Current Game</div>
                <div>{currentGame}</div>
              </>
            ) : (
              <div>
                {/* Create a game selection component for the parent DIV and children */}
                <p>No current game selected.</p>
                <p>Please select a game to view details.</p>
                
                  <div className="game-selection" style={{ marginTop: "20px" }}>
                    <Form
                      onSubmit={handleSettingUpNewGame}
                      className="game-selection-form"
                      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                      autoComplete="off"
                    >
                      <Select
                        label="Or choose from existing games"
                        id="selected-game"
                        name="selected-game"
                        options={games.map((game) => ({ value: game.id, label: game.name }))}
                        onChange={(e) => setCurrentGame(e.target.value)}
                      />
                    </Form>
                  </div>
              </div>
            )
          }
      </main>
    </>
  );
}
