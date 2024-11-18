import { updateChatHistory } from "@/modules/fs";
import { requestQuestion } from "@/modules/openai";
import { NextResponse } from "next/server";

let cacheData: any[] = [];

const csAlgorithmList = [
  "Sorting",
  //   "Searching",
  //   "Graph",
  //   "Dynamic Programming",
  //   "Backtracking",
  //   "Divide and Conquer",
  //   "Greedy Algorithm",
  //   "String Manipulation",
  //   "Mathematics",
  //   "Hashing",
  //   "Bit Manipulation",
  //   "Simulation",
  //   "Data Structures",
  //   "Optimization",
  //   "Game Theory",
];

const basicMsgs = [
  {
    role: "system",
    content: "당신은 알고리즘 문제를 내는 퀴즈 봇입니다.",
  },
  {
    role: "system",
    content: "당신은 상대방에게 알고리즘과 관련된 문제를 출제합니다.",
  },
  {
    role: "system",
    content: `다음은 알고리즘 유형입니다. ${csAlgorithmList.join(",")}.`,
  },
  {
    role: "system",
    content:
      "알고리즘에 대한 질문을 생성합니다. 추가적인 해설이나 설명 없이 질문 내용만 제공합니다.",
  },
  { role: "system", content: "퀴즈 문제를 주세요." },
];

export async function GET() {
  try {
    cacheData = [...cacheData, ...basicMsgs];
    console.log("cacheData", cacheData);
    const result = await requestQuestion(basicMsgs);
    if (result) {
      console.log("data", result.choices[0].message);
      const data = result.choices[0].message.content;
      updateChatHistory(data);
      return NextResponse.json({ code: 200, message: "Question", data });
    }
    return NextResponse.json({ code: 500, message: "Error" });
  } catch (e) {
    return NextResponse.json({ code: 500, message: e });
  }
}
