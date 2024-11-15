import { NextResponse } from "next/server";
import {
  requestAnswer,
  requestQuestion,
  requestEmbedding,
} from "@/modules/openai";

let cacheData: any[] = [];

const csAlgorithmList = [
  "Sorting",
  "Searching",
  "Graph",
  "Dynamic Programming",
  "Backtracking",
  "Divide and Conquer",
  "Greedy Algorithm",
  "String Manipulation",
  "Mathematics",
  "Hashing",
  "Bit Manipulation",
  "Simulation",
  "Data Structures",
  "Optimization",
  "Game Theory",
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
    content: `다음은 알고리즘 유형입니다. ${csAlgorithmList.join(
      ","
    )}. 목록에서 한가지 알고리즘 유형을 선택하세요.`,
  },
  { role: "system", content: "퀴즈 문제를 주세요." },
];

export async function GET() {
  cacheData = [...cacheData, ...basicMsgs];
  console.log("cacheData", cacheData);
  const result = await requestQuestion(basicMsgs);
  if (result) {
    const data = result.choices[0].message.content;
    return NextResponse.json({ code: 200, message: "Question", data });
  }
  return NextResponse.json({ code: 500, message: "Error" });
}

export async function POST(request: Request) {
  const requestData = await request.json();
  const { data } = requestData;
  const answerMsg = [
    {
      role: "user",
      content: `정답은 ${data}입니다. 맞았나요? 맞으면 맞았습니다. 틀리면 틀렸습니다.`,
    },
  ];
  cacheData = [...cacheData, ...answerMsg];
  console.log("cacheData", cacheData);
  const result = await requestAnswer(answerMsg);
  if (result) {
    const data = result.choices[0].message.content;
    console.log("data", data);

    return NextResponse.json({ code: 200, message: "Answer", data });
  }
  return NextResponse.json({ code: 500, message: "Error" });
}
