import { useEffect, useState } from "react";

const numPad = (str: number) => `0${str}`.slice(-2);

export default function useCountDown(left: number) {
  const [timeLeft, setTimeLeft] = useState("");
  let intervalId: NodeJS.Timeout;
  useEffect(() => {
    if (intervalId) clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    intervalId = setInterval(() => {
      let diff: number;
      if (left > 0) {
        diff = left;
        left--;
        const hours = Math.floor(diff / (60 * 60));
        const minutes = Math.floor((diff % (60 * 60)) / 60);
        const seconds = Math.floor(diff % 60);
        setTimeLeft(`${numPad(hours)} : ${numPad(minutes)} : ${numPad(seconds)}`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [left]);

  return timeLeft;
}
