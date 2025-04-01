import api from "./api";
import { ChatQA } from "../types/types";

const getChatHistory = async (page = 1, pageSize = 5): Promise<ChatQA[]> => {
  try {
    const response = await api.get<ChatQA[]>(
      `/chat/history?page=${page}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Fetch chat history error:", error);
    throw error;
  }
};

const sendQuery = async (query: string): Promise<ChatQA> => {
  try {
    const response = await api.post<ChatQA>("/chat", { query });
    return response.data;
  } catch (error) {
    console.error("Send query error:", error);
    throw error;
  }
};

export { getChatHistory, sendQuery };
