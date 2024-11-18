import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: `${process.env.AI_API_KEY}`,
});

const csAlgorithmList = [
  "Sorting",
  // "Searching",
  // "Graph",
  // "Dynamic Programming",
  // "Backtracking",
  // "Divide and Conquer",
  // "Greedy Algorithm",
  // "String Manipulation",
  // "Mathematics",
  // "Hashing",
  // "Bit Manipulation",
  // "Simulation",
  // "Data Structures",
  // "Optimization",
  // "Game Theory",
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
  {
    role: "system",
    content: "중복되는 문제는 제외하는데 Classification이 다른 경우 중복으로 처리하지 않습니다.",
  },
  { role: "user", content: "첫 번째 퀴즈 문제를 주세요. Level: 1 문제" },
];

export const requestQuestion = async (msgs: any[] = basicMsgs) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: msgs,
    });
    return completion;
  } catch (error: any) {
    if (error.response?.status === 429) {
      console.error("Rate limit exceeded. Consider upgrading your quota.");
      // Optional: Implement retry logic here if desired
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};

export const requestAnswer = async (answer: any[]) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: answer,
    });
    return completion;
  } catch (error: any) {
    if (error.response?.status === 429) {
      console.error("Rate limit exceeded. Consider upgrading your quota.");
      // Optional: Implement retry logic here if desired
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};

export const requestEmbedding = async (text: string) => {
  try {
    const completion = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    return completion;
  } catch (error: any) {
    console.error("An unexpected error occurred:", error);
  }
};

export const cosineSimilarity = (vector1: number[], vector2: number[]) => {
  if (vector1.length !== vector2.length) {
    throw new Error("Vectors must be of the same length");
  }

  // Compute the dot product and magnitudes of the vectors
  const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
  const magnitude1 = Math.sqrt(
    vector1.reduce((sum, val) => sum + val * val, 0)
  );
  const magnitude2 = Math.sqrt(
    vector2.reduce((sum, val) => sum + val * val, 0)
  );

  // Avoid division by zero
  if (magnitude1 === 0 || magnitude2 === 0) {
    throw new Error("One of the vectors has zero magnitude");
  }

  // Compute cosine similarity
  return dotProduct / (magnitude1 * magnitude2);
};
