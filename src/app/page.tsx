"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [counter, setCounter] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isRequestPending = useRef(false);

  const makeApiRequest = async () => {
    console.log("makeApiRequest", isRequestPending.current);
    if (isRequestPending.current) return;

    try {
      isRequestPending.current = true;
      const response = await fetch("/api/v1/questions");

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      const data = await response.json();
      console.log("API 응답:", data);

      setCounter((prev) => prev + 1);

      console.log(isRunning);
      if (isRunning) {
        timeoutRef.current = setTimeout(makeApiRequest, 1000);
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
    } finally {
      isRequestPending.current = false;
    }
  };

  useEffect(() => {
    if (isRunning) {
      makeApiRequest();
    }
  }, [isRunning]);

  const handleToggle = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-4">
      <div className="text-2xl font-bold">요청 횟수: {counter}</div>
      <button
        onClick={handleToggle}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
}
