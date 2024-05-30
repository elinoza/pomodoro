import { useEffect, useState } from "react";

import Button from "../components/Button";

const Pomodoro = () => {
  const [intervalId, setIntervalId] = useState(0);
  const [parameter, setParameter] = useState(25);
  const [remainingTime, setRemainingTime] = useState(25 * 60);

  //   const timerFunction = () => {
  //     console.log(intervalId);
  //     setRemainingTime((remainingTime) => remainingTime - 1);
  //     console.log(remainingTime);
  //     if (remainingTime === 0) {
  //       clearInterval(intervalId);
  //     }
  //   };
  //   const msTominute = () => {
  //     let ms = remainingTime;
  //     let second = (ms / 1000) % 60;
  //     let minute = Math.floor(ms / 1000 / 60).toFixed(0);

  //     return `${minute}:${second}`;
  //   };

  useEffect(() => {
    remainingTime;
  }, [remainingTime]);

  const handleStart = () => {
    let newIntervalId;
    newIntervalId = setInterval(() => {
      setRemainingTime((remainingTime) => remainingTime - 1);
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const handleSkip = () => {
    parameter === 25 ? setParameter(5) : setParameter(25);
  };

  return (
    <div className=" flex-col   items-center ">
      <div className="text-[5rem]  ">
        {" "}
        {`${new Date(remainingTime * 1000).getMinutes()}:${new Date(
          remainingTime * 1000
        ).getSeconds()}`}
      </div>
      <div className="flex justify-between">
        {" "}
        <Button onClick={handleStart}> Start</Button>
        <Button onClick={handleSkip}>SKIP</Button>
      </div>
    </div>
  );
};
export default Pomodoro;
