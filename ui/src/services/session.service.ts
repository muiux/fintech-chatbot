import api from "./api";
import { ChatSession } from "../types/types";

const getSessions = async (): Promise<ChatSession[]> => {
  try {
    const response = await api.get<ChatSession[]>("/sessions");
    return response.data;
  } catch (error) {
    console.error("Fetch chat session error:", error);
    throw error;
  }
};

export { getSessions };
