const API = "api";
const VERSION = "v1";
const PATH = {
  AI: "ai",
  QUESTIONS: "questions",
  KUNGKUNGDDA: {
    SEND_MESSAGE: "kungkungdda/send_message",
  },
};

const API_PATH = {
  AI: `/${API}/${VERSION}/${PATH.AI}`,
  QUESTIONS: `/${API}/${VERSION}/${PATH.QUESTIONS}`,
  SEND_MESSAGE: `/${API}/${VERSION}/${PATH.KUNGKUNGDDA.SEND_MESSAGE}`,
};

export { API_PATH };
