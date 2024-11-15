import { useRef, useState, useEffect } from "react";
import { DownloadImg } from "./Download";

export const CanvasDrawing = ({
  onClose,
  isVisible,
}: {
  onClose: Function;
  isVisible: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const canvas = canvasRef.current!;
    contextRef.current = canvas.getContext("2d")!;
    const context = contextRef.current;

    // Canvas 크기 설정
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 기본 스타일 설정
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      const context = contextRef.current!;
      const canvas = canvasRef.current!;

      // 이벤트 핸들러 정의
      const startDrawing = (e: any) => {
        context.beginPath();
        context.moveTo(
          e.clientX - canvas.offsetLeft,
          e.clientY - canvas.offsetTop
        );
        setIsDrawing(true);
      };

      const draw = (e: any) => {
        if (!isDrawing) return;
        context.lineTo(
          e.clientX - canvas.offsetLeft,
          e.clientY - canvas.offsetTop
        );
        context.stroke();
      };

      const endDrawing = () => {
        setIsDrawing(false);
      };

      // 이벤트 리스너 등록
      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", endDrawing);
      canvas.addEventListener("mouseout", endDrawing);

      // 클린업 함수
      return () => {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", endDrawing);
        canvas.removeEventListener("mouseout", endDrawing);
      };
    }
  }, [isDrawing, isMounted]);

  const handleClear = () => {
    const canvas = canvasRef.current!;
    const context = contextRef.current!;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className={"relative " + (isVisible ? "" : "hidden")}>
      <div className="absolute top-4 right-4 space-x-2">
        <button
          onClick={() => handleClear()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
        <button
          onClick={() => onClose()}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
      <canvas ref={canvasRef} className="border border-gray-300" />
      {isMounted && <DownloadImg canvas={canvasRef.current} />}
    </div>
  );
};
