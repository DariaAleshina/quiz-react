import { useState, useEffect } from 'react';

export default function Timer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  useEffect(() => {
    console.log('timer set!');
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval set!');
      setRemainingTime(prevRemainingTime => prevRemainingTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
