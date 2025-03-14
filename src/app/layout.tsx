"use client";

// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { useState, useRef, useEffect } from "react";
import { Howl } from "howler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({}: Readonly<{
  children: React.ReactNode;
}>) {
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null);

  // This state is for if an admin is running this externally.
  const [hasAdmin, setHasAdmin] = useState(false);
  const [timerLength, setTimerLength] = useState(0);
  const [prevTimerLength, setPrevTimerLength] = useState(0);
  const [warningLength, setWarningLength] = useState(0);
  const [prevWarningLength, setPrevWarningLength] = useState(0);
  const [isWarning, setIsWarning] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [playedWarnTone, setPlayedWarnTone] = useState(false);

  // Audio Files and constructors
  const startAudio = React.useMemo(() => new Howl({
    src: ["./audio/mixkit-attention-bell-ding-586.wav"],
  }), []);
  const warnAudio = React.useMemo(() => new Howl({
    src: ["./audio/mixkit-airport-announcement-ding-1569.wav"],
  }), []);
  const stopAudio = React.useMemo(() => new Howl({
    src: ["./audio/mixkit-melodic-game-over-956.wav"],
  }), []);
  
  /**
   * Convert the seconds into a readable minute:second format.
   * @param timer {number} Seconds that the timer is set for.
   */
  const getTimerString = (timer: number) => {
    // setPrevTimerLength(timer);
    // timer is seconds that are remaining
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer - hours * 3600) / 60);
    const seconds = timer - hours * 3600 - minutes * 60;
    const timeString =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
    return timeString;
  };

  const handleSettingTimer = (timer: number) => {
    setTimerLength(timer);
    if (timer <= warningLength) {
      console.log("setting warning");
    }
    setPrevTimerLength(timer);
  };

  const handleSettingWarning = (warning: number) => {
    setWarningLength(warning);
    setPrevWarningLength(warning);
  };

  const handleTimerReset = () => {
    setIsTimerRunning(false);
    setTimerLength(prevTimerLength);
  };
  
  const handleStartingTimer = React.useCallback((isStart: boolean) => {
    if (isStart) {
      setIsTimerRunning(true);
      setPlayedWarnTone(false);
      startAudio.play();
    } else {
      setIsTimerRunning(false);
      setPlayedWarnTone(false);
      stopAudio.play();
    }
  }, [startAudio, stopAudio]);

  // handle the timer decrementing
  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        // Check to see if we have reached the end of the timer
        if (timerLength == 0) {
          handleStartingTimer(false);
          // TODO: if there is an intermission or break time and we want this to be continuous we would not want to clear the interval but just update timer values.
          clearInterval(interval);
        }
        // Check to handle playing warning tone
        if (warningLength && timerLength <= warningLength + 1) {
          setIsWarning(true);
          if (!playedWarnTone) {
            warnAudio.play();
            setPlayedWarnTone(true);
          }
        } else {
          setIsWarning(false);
        }
        setTimerLength((timerLength) => timerLength - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerRunning, timerLength, warningLength, playedWarnTone, handleStartingTimer, warnAudio]);

  // Table Logic TODO:
  // interface iTable {
  //   name: string;
  //   participants: string[];
  //   zone?: string;
  // }

  // const [tableList, setTableList] = useState<iTable[]>([]);

  // useEffect(() => {
  //   const initialTables = Array.from({ length: 20 }, (_, i) => ({
  //     name: `Table ${i + 1}`,
  //     participants: [],
  //     zone: undefined,
  //   }));
  //   setTableList(initialTables);
  // }, []); // Empty dependency array since this should only run once

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main>
          <div className="timer-container">
            <h1>Bracket Forge</h1>
            {/* Timer Display component TODO: Move to own component */}
            <div
              className="timer--display"
              style={{
                backgroundColor: isTimerRunning
                  ? isWarning
                    ? "yellow"
                    : "green"
                  : "red",
              }}
            >
              {getTimerString(timerLength)}
            </div>

            {/* This is the control for if the game or tournament is not have an admin running */}
            {!hasAdmin && (
              <>
                <h2>Timer Control</h2>
                <div className="timer_controls--container">
                  {/* TODO: Convert to component */}
                  Timer Length:{" "}
                  <input
                    type="number"
                    name="timerLength"
                    onChange={(v) =>
                      handleSettingTimer(parseInt(v.target.value))
                    }
                  />
                  Warning Time:{" "}
                  <input
                    type="number"
                    name="warningTime"
                    onChange={(v) =>
                      handleSettingWarning(parseInt(v.target.value))
                    }
                  />
                  {/* TODO: Add dropdown to handle if it is seconds, minutes, or hours */}
                  {/* TODO: Convert to component */}
                  <div className="timer_controls-buttons--container">
                    <button
                      className="btn-primary btn-success"
                      onClick={() => handleStartingTimer(true)}
                    >
                      Start Timer
                    </button>
                    <button
                      className="btn-primary btn-danger"
                      onClick={() => setIsTimerRunning(false)}
                    >
                      Stop Timer
                    </button>
                    <button
                      className="btn-primary btn-success"
                      onClick={() => handleTimerReset()}
                    >
                      Reset Timer
                    </button>
                  </div>
                </div>
              </>
            )}
            {/* <h2>Tables:</h2>
            {tableList.map((table, i) => (
              <div key={`table_container-${i}`}>{table.name}</div>
            )
            )} */}
          </div>
        </main>
      </body>
    </html>
  );
}
