import api from "./api";

export const askAI = async (message) => {
  const res = await api.post("/ai/chat", {
    message
  });
  return res.data;
};
