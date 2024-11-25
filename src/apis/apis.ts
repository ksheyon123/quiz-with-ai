import { API_PATH } from "@/constants/index";

export const sendMessage = async (params: any) => {
  const response = await fetch(API_PATH.SEND_MESSAGE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ params }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  const { data } = await response.json();
  return data;
};
