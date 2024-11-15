import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: `${process.env.AI_API_KEY}`,
});

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
  { role: "user", content: "첫 번째 퀴즈 문제를 주세요." },
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
  const completion = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
};
