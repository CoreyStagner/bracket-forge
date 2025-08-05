"use client";
// import Image from "next/image";

export default function Page() {
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
      <h1 style={{ color: "#2c3e50" }}>Crokinole Rules</h1>
      {/* TODO: add image to repo and call it here */}
      {/* <Image
        src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Crokinole_board.jpg"
        alt="Crokinole Board"
        width={300}
        height={300}
        style={{
          display: "block",
          margin: "1rem auto",
          border: "1px solid #ccc",
          borderRadius: 8,
          objectFit: "cover"
        }}
      /> */}
      <h2 style={{ color: "#34495e", marginTop: "2rem" }}>Objective</h2>
      <p>
        Crokinole is a dexterity board game where players flick discs, aiming to score points by landing them in higher-value areas of the board while knocking away opponents&apos; discs.
      </p>

      <h2 style={{ color: "#34495e", marginTop: "2rem" }}>Setup</h2>
      <ul style={{ marginLeft: "1.5rem" }}>
        <li>Played by 2 or 4 players (singles or doubles).</li>
        <li>Each player/team gets 12 discs of one color.</li>
        <li>Players sit opposite each other if playing doubles.</li>
      </ul>

      <h2 style={{ color: "#34495e", marginTop: "2rem" }}>Gameplay</h2>
      <ul style={{ marginLeft: "1.5rem" }}>
        <li>Players take turns flicking one disc from their quadrant&apos;s outer edge.</li>
        <li>If there are opponent discs on the board, you must hit at least one with your shot.</li>
        <li>If no opponent discs are present, you must land your disc in the 15-point zone or closer to the center.</li>
        <li>Discs that leave the board or fail to meet the above requirements are removed for the round.</li>
        <li>Play continues until all discs have been shot.</li>
      </ul>

      <h2 style={{ color: "#34495e", marginTop: "2rem" }}>Scoring</h2>
      <ul style={{ marginLeft: "1.5rem" }}>
        <li>After all discs are played, count points based on where discs rest:</li>
        <ul>
          <li>Center hole: 20 points (remove immediately after scoring)</li>
          <li>Inner circle: 15 points</li>
          <li>Middle circle: 10 points</li>
          <li>Outer circle: 5 points</li>
        </ul>
        <li>Only discs completely within a scoring ring count for that value.</li>
        <li>Subtract the lower score from the higher; only the winner scores the difference.</li>
      </ul>

      <h2 style={{ color: "#34495e", marginTop: "2rem" }}>Winning</h2>
      <ul style={{ marginLeft: "1.5rem" }}>
        <li>Play to a set number of points (e.g., 100), or best of a set number of rounds.</li>
      </ul>

      <h2 style={{ color: "#34495e", marginTop: "2rem" }}>Additional Rules</h2>
      <ul style={{ marginLeft: "1.5rem" }}>
        <li>No leaning or moving the board during play.</li>
        <li>Flicking must be done with a single finger.</li>
        <li>Discs touching the line score the lower value.</li>
      </ul>

      <p style={{ marginTop: "2rem", fontSize: "0.9em", color: "#888" }}>
        For more details, see the{" "}
        <a href="https://en.wikipedia.org/wiki/Crokinole" target="_blank" rel="noopener noreferrer">
          Wikipedia page on Crokinole
        </a>.
      </p>
    </div>
  );
}