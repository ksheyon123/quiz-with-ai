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
  "Recursion",
  "Tree",
  "Linked List",
  "Stack",
  "Queue",
];

export const requestSample = async () => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a quiz bot." },
        {
          role: "system",
          content: `You are a quiz bot. You are going to give a Computer Sceience Quiz. And here is the sort of type of Computer Sceience ${csAlgorithmList.join(
            ","
          )}`,
        },
        {
          role: "system",
          content:
            "Pick the one of the type of Computer Sceience and give a easiet question.",
        },
        { role: "user", content: "첫 번째 퀴즈 질문을 주세요." },
      ],
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

export const requestAnswer = async (answer: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `정답은 ${answer}입니다.` }],
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
