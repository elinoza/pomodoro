import { useEffect, useState } from "react";
import clsx from "clsx";
import { IoLogoGithub } from "react-icons/io";

import Button from "./Button";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { AiFillPlusCircle } from "react-icons/ai";

const Pomodoro = () => {
  const [intervalId, setIntervalId] = useState<
    number | NodeJS.Timeout | undefined
  >(undefined);
  const [parameter, setParameter] = useState<25 | 5>(25);
  const [remainingTime, setRemainingTime] = useState<number | undefined>(
    undefined
  );
  const [isPaused, setisPaused] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<
    "bg-[#E5543C]" | "bg-[#039F5A]"
  >("bg-[#E5543C]");

  const clearIntervalId = () => {
    clearInterval(intervalId);
    setIntervalId(undefined);
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

  const format = (remainingTime: number) => {
    return new Date(remainingTime).toLocaleTimeString("en").slice(2, 7);
  };

  const togglePause = () => {
    if (!isPaused) {
      setisPaused(true);
      clearIntervalId();
    } else {
      setisPaused(false);
      handleInterval();
    }
  };

  const handleInterval = () => {
    if (remainingTime !== undefined) {
      const newIntervalId = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime !== undefined && prevTime > 0) {
            return prevTime - 1000;
          } else {
            clearIntervalId();
            return undefined;
          }
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  const handleStart = () => {
    if (intervalId !== undefined) {
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
      setRemainingTime(undefined);
      clearIntervalId();
    }
  }, [remainingTime, intervalId]);

  return (
    <div className={clsx(backgroundColor, "rounded-md w-full h-full relative")}>
      <div>
        {" "}
        <span className="text-[5rem]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {remainingTime && format(remainingTime)}
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
      <div className="group inline-flex justify-between w-full absolute  top-[10px] px-2 ">
        <div className="text-xl">
          {" "}
          <span>
            <a href="https://github.com/elinoza/pomodoro" target="_blank">
              <IoLogoGithub />
            </a>
          </span>
        </div>
        <div>
          {" "}
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
                setRemainingTime((remainingTime) => {
                  if (remainingTime !== undefined) {
                    return remainingTime + 1000 * 60;
                  }
                })
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
    </div>
  );
};
export default Pomodoro;
