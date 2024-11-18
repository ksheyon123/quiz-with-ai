import { readChatHistory, updateChatHistory } from "@/modules/fs";
import { cosineSimilarity, requestEmbedding } from "@/modules/openai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const chatHistory = readChatHistory();
    const toRemoveIndices = new Set<number>();

    // 각 문장을 다른 모든 문장과 비교
    for (let i = 0; i < chatHistory.length - 1; i++) {
      if (toRemoveIndices.has(i)) continue;

      const embeddings1 = await requestEmbedding(chatHistory[i]);
      if (!embeddings1) throw new Error("Failed to get embeddings");
      const { embedding: embeddings1Data } = embeddings1.data[0];

      // i번째 문장을 i+1부터 끝까지의 문장들과 비교
      for (let j = i + 1; j < chatHistory.length; j++) {
        if (toRemoveIndices.has(j)) continue;

        const embeddings2 = await requestEmbedding(chatHistory[j]);
        if (!embeddings2) throw new Error("Failed to get embeddings");
        const { embedding: embeddings2Data } = embeddings2.data[0];

        const similarity = cosineSimilarity(embeddings1Data, embeddings2Data);

        // 유사도가 0.8 이상이면 나중 인덱스(j)를 제거 대상으로 표시
        if (similarity > 0.95) {
          toRemoveIndices.add(j);
        }
      }
    }

    // 제거할 인덱스들을 역순으로 정렬하여 큰 인덱스부터 제거
    const sortedIndicesToRemove = Array.from(toRemoveIndices).sort(
      (a, b) => b - a
    );

    // 중복 문장들 제거
    let updatedHistory = [...chatHistory];
    for (const index of sortedIndicesToRemove) {
      updatedHistory.splice(index, 1);
    }

    // 업데이트된 채팅 기록 저장
    await updateChatHistory(updatedHistory);

    return NextResponse.json({
      code: 200,
      data: {
        removedCount: sortedIndicesToRemove.length,
        remainingCount: updatedHistory.length,
      },
    });
  } catch (e) {
    return NextResponse.json({ code: 500, message: e });
  }
}
