import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  CircularProgress,
  styled,
  Typography,
} from "@mui/material";
import { IoSend } from "react-icons/io5";
import { useAuthContext } from "../contexts/authContext";
import { useChatHistory, useSendQuery } from "../hooks/useChat";
import UserMessage from "../components/ChatUserMessage";
import BotMessage from "../components/ChatBotMessage";
import { ChatQA } from "../types/types";
import InfiniteScroll from "react-infinite-scroll-component";

const ChatContainer = styled(Paper)(({ theme }) => ({
  maxWidth: "800px",
  width: "100%",
  margin: "96px auto 32px",
  height: "calc(100vh - 128px)",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    margin: "56px auto 0px",
    height: "calc(100vh - 56px)",
    borderRadius: theme.spacing(0),
  },
}));

const MessageArea = styled(Box)({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
  padding: "20px",
  "&::-webkit-scrollbar": { width: "6px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "3px",
  },
  display: "flex",
  flexDirection: "column-reverse",
});

const InputContainer = styled(Box)({
  padding: "20px",
  borderTop: "1px solid #e0e0e0",
  display: "flex",
  gap: "10px",
});

const ChatInterface: React.FC = () => {
  const { user } = useAuthContext();
  const { data, isLoading, fetchNextPage, hasNextPage } = useChatHistory();
  const { mutate: sendQuery } = useSendQuery();

  const [chats, setChats] = useState<ChatQA[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollIntoView = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (data) setChats(data?.pages.flat() || []);
  }, [data]);

  useEffect(() => {
    scrollIntoView();
  }, []);

  const handleSend = useCallback(() => {
    if (!newMessage.trim()) return;

    const newChat: ChatQA = { query: newMessage, response: "" };
    setChats((prev) => [newChat, ...prev]);
    setNewMessage("");
    scrollIntoView();

    sendQuery(newMessage, {
      onSuccess: (data) => {
        setChats((prev) => prev.map((chat, idx) => (idx === 0 ? data : chat)));
        scrollIntoView();
      },
    });
  }, [newMessage, sendQuery]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer elevation={3}>
      <MessageArea id="messageArea">
        <Box ref={messageEndRef} />
        <InfiniteScroll
          dataLength={chats.length}
          next={fetchNextPage}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          hasMore={hasNextPage}
          inverse
          loader={<h4>Loading older messages...</h4>}
          scrollableTarget="messageArea"
        >
          {isLoading ? (
            <Box textAlign="center" sx={{ marginTop: "310px" }}>
              <CircularProgress size="3rem" />
            </Box>
          ) : chats.length ? (
            chats.reverse().map((chat, index) => (
              <Box key={index}>
                <UserMessage message={chat.query} user={user} />
                <BotMessage
                  response={chat.response}
                  createdAt={chat.created_at}
                />
              </Box>
            ))
          ) : (
            <Box textTransform={"capitalize"}>
              <Typography variant="h6" color="primary">
                start chatting with our fintech chatbot ...
              </Typography>
            </Box>
          )}
        </InfiniteScroll>
      </MessageArea>
      <InputContainer>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Type your message..."
          variant="outlined"
          size="small"
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!newMessage.trim()}
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": { backgroundColor: "#1565c0" },
            "&.Mui-disabled": { backgroundColor: "#e0e0e0" },
          }}
        >
          <IoSend />
        </IconButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatInterface;
