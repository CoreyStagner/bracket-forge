import React from "react";

interface Props {
  isTimerRunning: boolean;
  isWarning: boolean;
  timerLength: number | string;
}

const Timer: React.FC<Props> = ({ timerLength, isTimerRunning, isWarning }) => {

  /**
   * Convert the seconds into a readable minute:second format.
   * @param timer {number} Seconds that the timer is set for.
   */
  const getTimerString = (timer: number | string) => {
    if (typeof timer === "string") {
      return timer;
    } else {
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
    }
  };

  return (
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
  );
};

export default Timer;
