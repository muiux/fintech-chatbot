import api from "./api";
import { ChatMessageCreate, ChatQA } from "../types/types";

const getChatHistory = async (
  sessionId: string,
  page = 1,
  pageSize = 5
): Promise<ChatQA[]> => {
  try {
    const response = await api.get<ChatQA[]>(
      `/chat/history/${sessionId}?page=${page}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Fetch chat history error:", error);
    throw error;
  }
};

const sendQuery = async (chatData: ChatMessageCreate): Promise<ChatQA> => {
  try {
    const response = await api.post<ChatQA>("/chat", chatData);
    return response.data;
  } catch (error) {
    console.error("Send query error:", error);
    throw error;
  }
};

export { getChatHistory, sendQuery };
