export const DownloadImg = ({ canvas }: { canvas: any }) => {
  // 그림 다운로드 함수
  const downloadImage = () => {
    console.log(canvas);
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "canvas-drawing.png";
    link.click();
  };

  return (
    <div>
      <button onClick={downloadImage} style={{ marginTop: "10px" }}>
        Download Image
      </button>
    </div>
  );
};
