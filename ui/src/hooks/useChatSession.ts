import { useQuery } from "@tanstack/react-query";
import { getSessions } from "../services/session.service";
import { ChatSession } from "../types/types";

export const useChatSession = () => {
  return useQuery<ChatSession[]>({
    queryKey: ["chatSessions"],
    queryFn: getSessions,
    staleTime: 1000 * 60,
  });
};
