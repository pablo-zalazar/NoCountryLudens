import { useState, useEffect } from "react";
import {
  convertMillisecondsToMinutesAndSeconds,
  progressPercentage
} from "../triviaUtils/gameFunctions/mathfunctionsOfTrivia.jsx";

export default function useChronometer({ fullTimer }) {
  const [time, setTime] = useState(0);
  const [cronometro, setCronometro] = useState(true);
  const [percentaje, setPersentaje] = useState(0);

  useEffect(() => {
    if (time >= fullTimer) {
      setCronometro(false);
    }
    let interval;
    if (cronometro) {
      interval = setInterval(() => {
        setTime(time => time + 10);
        setPersentaje(progressPercentage({ progressTime: time, totalTime: fullTimer }));
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [cronometro, time]);

  const { minutes, seconds } = convertMillisecondsToMinutesAndSeconds({ milliseconds: time });
  return { minutes, seconds, percentaje, setTime, time, setCronometro };
}
