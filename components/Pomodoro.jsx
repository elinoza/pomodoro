import { useEffect, useState } from "react";
import clsx from "clsx";

import Button from "../components/Button";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { AiFillPlusCircle } from "react-icons/ai";

const Pomodoro = () => {
  const [intervalId, setIntervalId] = useState(null);
  const [parameter, setParameter] = useState(25);
  const [remainingTime, setRemainingTime] = useState(null);
  const [isPaused, setisPaused] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("bg-[#E5543C]");

  const clearIntervalId = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };
  const handleParameter = () => {
    clearIntervalId();
    if (parameter === 25) {
      setParameter(5);
      setBackgroundColor("bg-[#039F5A]");
    } else {
      setParameter(25);
      setBackgroundColor("bg-[#E5543C]");
    }
  };

  const format = (remainingTime) => {
    return new Date(remainingTime).toLocaleTimeString("en").slice(2, 7);
  };

  const togglePause = () => {
    if (!isPaused) {
      setisPaused(true);
      clearIntervalId();
      // setPausedTime(remainingTime)
    } else {
      setisPaused(false);
      handleInterval();
      //   //setPausedTime(null)
    }
  };

  const handleInterval = () => {
    let newIntervalId;
    newIntervalId = setInterval(() => {
      setRemainingTime((remainingTime) => remainingTime - 1000);
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const handleStart = () => {
    if (intervalId) {
      clearIntervalId();
    }
    handleInterval();
  };

  const handleStop = () => {
    clearIntervalId();
    setisPaused(false);
    setRemainingTime(parameter * 60 * 1000);
  };

  useEffect(() => {
    setRemainingTime(parameter * 60 * 1000);
  }, [parameter]);

  useEffect(() => {
    if (remainingTime === 0) {
      setRemainingTime(null);
      clearIntervalId();
    }
  }, [remainingTime, intervalId]);

  return (
    <div className={clsx(backgroundColor, "rounded-md w-full h-full relative")}>
      <div>
        {" "}
        <span className="text-[5rem]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {format(remainingTime)}
        </span>
      </div>

      <div className="flex absolute bottom-7 w-full justify-around ">
        {" "}
        {!intervalId && !isPaused && (
          <Button className="w-[200px] border " onClick={handleStart}>
            {" "}
            START
          </Button>
        )}
        {!isPaused && intervalId && (
          <Button className="w-[200px] border " onClick={togglePause}>
            {" "}
            PAUSE
          </Button>
        )}
        {isPaused && !intervalId && (
          <Button className="w-[200px] border " onClick={togglePause}>
            {" "}
            RESUME
          </Button>
        )}
        {parameter === 25 ? (
          <Button className="w-[200px] border " onClick={handleStop}>
            STOP
          </Button>
        ) : (
          <Button className="w-[200px] border " onClick={handleParameter}>
            SKIP
          </Button>
        )}
      </div>
      <div className="group inline-flex absolute right-[10px] top-[10px]">
        {parameter === 25 ? "POMODORO" : "TAKE A SHORT BREAK"}
        {!intervalId && !isPaused && parameter === 25 ? (
          <Button
            onClick={handleParameter}
            className="  h-[25px] w-[25px] focus:outline-none"
          >
            <span>
              <TbPlayerTrackNextFilled />
            </span>
          </Button>
        ) : (
          <Button
            onClick={() =>
              setRemainingTime((remainingTime) => remainingTime + 1000 * 60)
            }
            className="  h-[25px] w-[25px] focus:outline-none"
          >
            <span>
              <AiFillPlusCircle />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};
export default Pomodoro;
