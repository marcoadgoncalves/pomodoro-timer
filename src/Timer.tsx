import { useState } from "react";
import "./App.css";
import { useTimer } from "react-timer-hook";
import useSound from "use-sound";

import ring from "./assets/clock-alarm-8761.mp3";

function createExpiryTime(minutes: number) {
  const expiryTimestamp = new Date();
  const seconds = minutes * 60;
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + seconds);

  return expiryTimestamp;
}

type Props = {
  timeLeft: number;
  description: "Pomodoro" | "Short rest" | "Long rest";
};

export function Timer({ timeLeft, description }: Props) {
  const [timerCount, setTimerCount] = useState(0);
  const [play] = useSound(ring);

  const expiryTimestamp = createExpiryTime(timeLeft);

  const { seconds, minutes, isRunning, start, pause, restart } = useTimer({
    expiryTimestamp: expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      play();
      restart(createExpiryTime(timeLeft), false);
      setTimerCount(timerCount + 1);
    },
  });

  return (
    <div className="timer">
      <time className="clock">
        {minutes.toLocaleString("pt-PT", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        :
        {seconds.toLocaleString("pt-PT", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </time>
      <div className="card">
        {isRunning ? (
          <button onClick={pause}>PAUSE</button>
        ) : (
          <button onClick={start}>START</button>
        )}
        <p>
          {description} count is #{timerCount}
        </p>
      </div>
    </div>
  );
}
