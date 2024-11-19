import OpenAI from "openai";
console.log("PROJECT ID : ",process.env.AI_PROJECT_ID);
const openai = new OpenAI({
  apiKey: `${process.env.AI_API_KEY}`,
  project: `${process.env.AI_PROJECT_ID}`,
  organization: `${process.env.AI_ORGANIZATION_ID}`,
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
      model: "gpt-3.5-turbo-1106",
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
      model: "gpt-3.5-turbo-1106",
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

export const requestEmbedding = async (input: string, model: string = "text-embedding-ada-002") => {
  try {
    const completion = await openai.embeddings.create({
      model,
      input,
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

  let dotProduct = 0;
  let magnitude1Squared = 0;
  let magnitude2Squared = 0;

  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
    magnitude1Squared += vector1[i] ** 2;
    magnitude2Squared += vector2[i] ** 2;
  }

  if (magnitude1Squared === 0 || magnitude2Squared === 0) {
    throw new Error("One of the vectors has zero magnitude");
  }

  return dotProduct / (Math.sqrt(magnitude1Squared) * Math.sqrt(magnitude2Squared));
};

export const listFineTuneModels = async () => {
  const models = await openai.fineTuning.jobs.list();
  return models;
};