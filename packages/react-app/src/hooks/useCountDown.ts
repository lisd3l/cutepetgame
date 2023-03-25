import { useEffect, useState } from "react";

const numPad = (str: number) => `0${str}`.slice(-2);

export default function useCountDown(left?: number) {
  const [timeLeft, setTimeLeft] = useState("");
  let intervalId: NodeJS.Timeout;
  useEffect(() => {
    if (intervalId) clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    intervalId = setInterval(() => {
      let diff: number;
      if (left) {
        diff = left;
      } else {
        const now = new Date();
        const endOfDay = +new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        diff = endOfDay - +now;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${numPad(hours)} : ${numPad(minutes)} : ${numPad(seconds)}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [left]);

  return timeLeft;
}
