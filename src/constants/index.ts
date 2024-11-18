const API = "api";
const VERSION = "v1";
const PATH = {
  AI: "ai",
  QUESTIONS: "questions",
};

const API_PATH = {
  AI: `/${API}/${VERSION}/${PATH.AI}`,
  QUESTIONS: `/${API}/${VERSION}/${PATH.QUESTIONS}`,
};

export { API_PATH };
