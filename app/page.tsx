"use client";

import { useState, useEffect } from "react";
import Options from "./components/Options";

export default function Home() {
  const [diceValue, setDiceValue] = useState(6);
  const [isDiceRolling, setIsDiceRolling] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [maxNumber, setMaxNumber] = useState(6);
  const [showTask, setShowTask] = useState(true);
  const [tasks, setTasks] = useState(["task 1", "task 2", "task 3"]);
  const [taskValue, setTaskValue] = useState(0);
  const [isTaskRolling, setIsTaskRolling] = useState(false);

  const rollDice = () => {
    setIsDiceRolling(true);
    let rollCount = 0;
    const intervalId = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * maxNumber) + 1);
      rollCount++;
      if (rollCount > 10) {
        clearInterval(intervalId);
        setIsDiceRolling(false);
        if (showTask) {
          setIsTaskRolling(true);
          let rollCount = 0;
          const intervalId = setInterval(() => {
            setTaskValue(Math.floor(Math.random() * tasks.length));
            rollCount++;
            if (rollCount > 10) {
              clearInterval(intervalId);
              setIsTaskRolling(false);
            }
          }, 100);
        }
      }
    }, 100);
  };

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="px-4 py-2 bg-gray-300 text-sm text-black border border-gray-400 rounded-lg fixed left-0 top-0 z-20"
      >
        {showOptions ? "Hide Options" : "Show Options"}
      </button>
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm">
        {showOptions && (
          <Options
            {...{
              maxNumber,
              setMaxNumber,
              tasks,
              setTasks,
              setShowTask,
              showTask,
            }}
          />
        )}
      </div>

      <div className="relative flex place-items-center flex-col">
        <div className={`text-6xl mb-4 ${isDiceRolling ? "dice-rolling" : ""}`}>
          {diceValue}
        </div>
        {showTask && (
          <div
            className={`text-l mb-4 text-gray-600 ${
              isTaskRolling ? "dice-rolling" : ""
            }`}
          >
            {tasks[taskValue]}
          </div>
        )}
      </div>

      <div className="mb-32 grid text-center">
        <button
          onClick={rollDice}
          disabled={isDiceRolling || isTaskRolling}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Roll
        </button>
      </div>
    </main>
  );
}
