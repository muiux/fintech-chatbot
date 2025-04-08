import { useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { getChatHistory, sendQuery } from "../services/chat.service";

export const useChatHistory = (sessionId: string) => {
  return useInfiniteQuery({
    queryKey: ["chatHistory", sessionId],
    queryFn: ({ pageParam = 1 }) => getChatHistory(sessionId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    enabled: !!sessionId,
  });
};

export const useSendQuery = () => {
  return useMutation({
    mutationFn: sendQuery,
    onSuccess: (data) => {
      console.log("Query sent successfully:", data);
    },
    onError: (error) => {
      console.error("Error sending query:", error);
      throw error;
    },
  });
};
