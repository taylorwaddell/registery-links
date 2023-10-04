"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const targetJsDate = new Date(`${targetDate}T00:00:00`);
    const now = new Date();
    const difference = targetJsDate.getTime() - now.getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.ceil(difference / (1000 * 60 * 60 * 24)), // Used Math.ceil here
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <p>
      {timeLeft.days > 0 ? `${timeLeft.days} days` : `${timeLeft.hours} hours`}
    </p>
  );
};

export default Countdown;
