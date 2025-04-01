import { useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { getChatHistory, sendQuery } from "../services/chat.service";

export const useChatHistory = () => {
  return useInfiniteQuery({
    queryKey: ["chatHistory"],
    queryFn: ({ pageParam = 1 }) => getChatHistory(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
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
