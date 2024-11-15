"use client";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import { Card } from "@/components/Card";
import { CornerDownLeft } from "@/components/CornerDownLeft";
import { API_PATH } from "@/constants";
import { CanvasDrawing } from "@/components/CanvasDrawing";
import { DownloadImg } from "@/components/Download";
import { Loading } from "@/components/Loading";

const QuizGame = () => {
  const [value, setValue] = useState<string>();
  const [question, setQuestion] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const post = async (params: any) => {
    console.log("params", params);
    return await fetch(`${API_PATH.AI}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(params),
    });
  };

  const submit = async () => {
    try {
      if (isSubmit) return;
      setIsSubmit(true);
      const result = await post({ data: value });
      setValue("");
    } catch (e) {
      throw e;
    } finally {
      setIsSubmit(false);
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
  };

  const getQuestion = async () => {
    const result = await fetch(`${API_PATH.AI}`, {
      method: "GET",
    });
    const data = await result.json();
    setQuestion((prev) => prev + data.data);
  };
  useEffect(() => {
    if (!question) {
      getQuestion();
    }
  }, [question]);

  useEffect(() => {
    // Event handler
    const keydownEventHandler = (e: KeyboardEvent) => {
      const keyCode = e.code;
      if (keyCode === "Enter") {
        if (value) submit();
      }
    };
    window.addEventListener("keydown", keydownEventHandler);
    return () => {
      window.removeEventListener("keydown", keydownEventHandler);
    };
  }, [value]);

  const validate = () => {};

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="container mx-auto">
        {/* Change flex-row to flex-col on small screens */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 min-h-[600px]">
          {/* Quiz Display Section */}
          <Card className="flex-1 p-4 sm:p-6">
            <div className="h-full flex flex-col">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Quiz</h2>
              <div className="flex-1">
                <p className="text-gray-600">{question}</p>
              </div>
            </div>
          </Card>
          {/* Answer Section */}
          <Card className="flex-1 p-4 sm:p-6 relative">
            <CanvasDrawing
              isVisible={isVisible}
              onClose={() => setIsVisible(false)}
            />
            <div className="h-full flex flex-col">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Answer</h2>
              <div className="flex-1">
                <p className="text-gray-600"></p>
              </div>

              {/* Floating Input Area */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg shadow-md">
                  <div className="relative">
                    <input
                      type="text"
                      value={value || ""}
                      onChange={onChange}
                      // onClick={() => submit()}
                      placeholder="Type your answer here..."
                      className="w-full p-2 pr-24 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                      <button
                        className="text-gray-500 hover:text-blue-600 transition-colors duration-200 p-1"
                        aria-label="Send answer"
                        onClick={() => submit()}
                        disabled={isSubmit}
                      >
                        {isSubmit ? (
                          <Loading />
                        ) : (
                          <CornerDownLeft className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => setIsVisible((prev) => !prev)}
                        className="text-gray-500 hover:text-blue-600 transition-colors duration-200 p-1"
                        aria-label="Draw"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Pencil = ({ className = "w-5 h-5", color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="2" x2="22" y2="6"></line>
    <path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path>
  </svg>
);

export default QuizGame;
