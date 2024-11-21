import { updateChatHistory } from "@/modules/fs";
import { cosineSimilarity, listFineTuneModels, requestEmbedding, requestQuestion } from "@/modules/openai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const fineTuneModels = await listFineTuneModels();
    console.log(fineTuneModels.data[0].fine_tuned_model);
    const embeddings1 = await requestEmbedding("정렬 알고리즘을 사용한 난이도 1 문제를 출제해줘");
    const embeddings2 = await requestEmbedding("정렬 알고리즘을 사용한 난이도 2 문제를 출제해줘");

    if (embeddings1 && embeddings2) {
      const similarity = cosineSimilarity(
        embeddings1.data[0].embedding,
        embeddings2.data[0].embedding
      );
      console.log("similarity", similarity);
      return NextResponse.json({ code: 200, message: "Response data", data : similarity });
    }
    return NextResponse.json({ code: 500, message: "Error" });
  } catch (e) {
    return NextResponse.json({ code: 500, message: e });
  }
}
