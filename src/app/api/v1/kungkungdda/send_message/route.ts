import { NextResponse } from "next/server";
import {
  requestAnswer,
  requestQuestion,
  requestEmbedding,
} from "@/modules/openai";

export async function GET() {
  return NextResponse.json({ code: 200, message: "Question" });
}

export async function POST(request: Request) {
  const { params } = await request.json();
  const basicMsgs = [
    {
      role: "system",
      content: "당신은 쿵쿵따 게임을 합니다.",
    },
    {
      role: "system",
      content:
        "쿵쿵따 게임은 세 글자 단어를 이어가는 게임입니다. 제시받은 단어의 마지막 글자로 시작하는 세 글자 단어를 제시하세요.",
    },
    {
      role: "system",
      content: "쿵쿵따 게임은 반드시 세 글자 단어만 사용가능 합니다.",
    },
    { role: "system", content: `전달 받은 단어는 ${params}입니다.` },
  ];
  const result = await requestAnswer(basicMsgs);
  if (result) {
    const data = result.choices[0].message.content;
    console.log("data", data);

    return NextResponse.json({ code: 200, message: "Answer", data });
  }
  return NextResponse.json({ code: 500, message: "Error" });
}
