"use client";

import "./styles/globals.css";

import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import Timer from "./components/Timer/Timer";

const EMPTY_TIMER = "--:--:--";

export default function RootLayout({}: Readonly<{
  children: React.ReactNode;
}>) {
  const [timerLength, setTimerLength] = useState<number | string>(
    0 || EMPTY_TIMER
  );
  const [prevTimerLength, setPrevTimerLength] = useState<number | string>(
    0 || EMPTY_TIMER
  );
  const [warningLength, setWarningLength] = useState(0);
  const [isWarning, setIsWarning] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [playedWarnTone, setPlayedWarnTone] = useState(false);

  // Audio Files and constructors
  const startAudio = React.useMemo(
    () =>
      new Howl({
        src: ["./audio/mixkit-attention-bell-ding-586.wav"],
      }),
    []
  );
  const warnAudio = React.useMemo(
    () =>
      new Howl({
        src: ["./audio/mixkit-airport-announcement-ding-1569.wav"],
      }),
    []
  );
  const stopAudio = React.useMemo(
    () =>
      new Howl({
        src: ["./audio/mixkit-melodic-game-over-956.wav"],
      }),
    []
  );

  const handleSettingTimer = (timer: number) => {
    setTimerLength(timer);
    setPrevTimerLength(timer);
  };

  const handleSettingWarning = (warning: number) => {
    setWarningLength(warning);
  };

  const handleTimerReset = () => {
    setIsTimerRunning(false);
    setTimerLength(prevTimerLength);
  };

  const handleStartingTimer = React.useCallback(
    (isStart: boolean) => {
      if (isStart) {
        setIsTimerRunning(true);
        setPlayedWarnTone(false);
        startAudio.play();
      } else {
        setIsTimerRunning(false);
        setPlayedWarnTone(false);
        stopAudio.play();
        if (typeof prevTimerLength === "number") {
          setTimerLength(prevTimerLength + 1);
        } else {
          setTimerLength(EMPTY_TIMER);
        }
      }
    },
    [startAudio, stopAudio, prevTimerLength]
  );

  // handle the timer decrementing
  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        if (typeof timerLength === "number") {
          // Check to see if we have reached the end of the timer
          if (timerLength <= 1) {
            handleStartingTimer(false);
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
          setTimerLength((timerLength) =>
            typeof timerLength === "number" ? timerLength - 1 : timerLength
          );
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [
    isTimerRunning,
    timerLength,
    warningLength,
    playedWarnTone,
    handleStartingTimer,
    warnAudio,
  ]);

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
    <>
      <html>
        <body>
          <main>
            <div className="timer-container">
              <h1>Bracket Forge</h1>
              {/* Timer Display component TODO: Move to own component */}
              <Timer
                isTimerRunning={isTimerRunning}
                isWarning={isWarning}
                timerLength={timerLength}
              />

              {/* This is the control for if the game or tournament is not have an admin running */}
              <div>
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
              </div>
              {/* <h2>Tables:</h2>
              {tableList.map((table, i) => (
                <div key={`table_container-${i}`}>{table.name}</div>
              )
              )} */}
            </div>
          </main>
        </body>
      </html>
    </>
  );
}
