import { requestAnswer, requestSample } from "@/modules/openai";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await requestSample();
  if (result) {
    const data = result.choices[0].message.content;
    return NextResponse.json({ code: 200, message: "Question", data });
  }
  return NextResponse.json({ code: 500, message: "Error" });
}

export async function POST(request: Request) {
  const requestData = await request.json();
  const { data } = requestData;
  const result = await requestAnswer(data);
  if (result) {
    const data = result.choices[0].message.content;
    return NextResponse.json({ code: 200, message: "Answer", data });
  }
  return NextResponse.json({ code: 500, message: "Error" });
}
