"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface IOptions {
  maxNumber: number;
  setMaxNumber: Dispatch<SetStateAction<number>>;
  setShowTask: Dispatch<SetStateAction<boolean>>;
  showTask: boolean;
  tasks: string[];
  setTasks: Dispatch<SetStateAction<string[]>>;
}

export default function Options({
  maxNumber,
  setMaxNumber,
  setShowTask,
  showTask,
  tasks,
  setTasks,
}: IOptions) {
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
      setNewTask("");
    }
  };

  const deleteChallenge = (index: number) => {
    const filtered = tasks.filter((_, i) => i !== index);
    setTasks(filtered);
    localStorage.setItem("tasks", JSON.stringify(filtered));
  };

  return (
    <div className="fixed left-0 top-0 flex w-full max-h-full justify-center items-center flex-col bg-gradient-to-b from-neutral-200 to-neutral-50 py-4 shadow-md">
      <div className="mt-4">
        <button
          onClick={() => setMaxNumber((prev) => Math.max(prev - 1, 1))}
          className="mr-2 px-4 py-2 bg-red-400 text-white rounded-lg"
        >
          -
        </button>
        <span>Max Number: {maxNumber}</span>
        <button
          onClick={() => setMaxNumber((prev) => prev + 1)}
          className="ml-2 px-4 py-2 bg-green-400 text-white rounded-lg"
        >
          +
        </button>
      </div>
      <button
        onClick={() => setShowTask(!showTask)}
        className="mt-4 px-4 py-2 bg-gray-300 text-black rounded-lg w-fit"
      >
        {showTask ? "Hide task" : "Show task"}
      </button>
      <div className="mt-4 overflow-auto">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center mt-2 justify-between">
            <span className="mr-2">{task}</span>
            <button
              onClick={() => deleteChallenge(index)}
              className="px-2 py-1 bg-red-400 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="mr-2 p-2 border-2 border-gray-300 rounded-lg"
          placeholder="Enter a new task"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-green-400 text-white rounded-lg"
        >
          Add task
        </button>
      </div>
    </div>
  );
}
