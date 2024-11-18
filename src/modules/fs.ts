import fs from "fs";

export const updateChatHistory = (newChat: any, initFileName?: string) => {
  try {
    const fileName = initFileName || "chat-history.json";
    let chatHistory = [];

    // 기존 파일 존재 여부 확인 및 읽기
    if (fs.existsSync(fileName)) {
      const fileData = fs.readFileSync(fileName, "utf-8");
      chatHistory = JSON.parse(fileData);
    }

    // 새로운 채팅 데이터 추가
    chatHistory.push(newChat);

    // 업데이트된 데이터를 파일에 저장
    fs.writeFileSync(fileName, JSON.stringify(chatHistory, null, 2), "utf-8");

    console.log("채팅 기록이 성공적으로 업데이트되었습니다.");
    return true;
  } catch (error) {
    console.error("파일 업데이트 중 에러 발생:", error);
    return false;
  }
};

export const readChatHistory = (fileName: string = "chat-history.json") => {
  try {
    // 파일 존재 여부 확인
    if (!fs.existsSync(fileName)) {
      console.log("채팅 기록 파일이 존재하지 않습니다.");
      return [];
    }

    // 파일 읽기 및 파싱
    const fileData = fs.readFileSync(fileName, "utf-8");
    const chatHistory = JSON.parse(fileData);

    return chatHistory;
  } catch (error) {
    console.error("채팅 기록 읽기 중 에러 발생:", error);
    return [];
  }
};
