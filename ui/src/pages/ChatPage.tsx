import React, { useState, useRef, useEffect, useCallback } from "react";
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
import { ChatMessageCreate, ChatQA } from "../types/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router";

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
  const { session_id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { data, isLoading, fetchNextPage, hasNextPage } = useChatHistory(
    session_id ?? ""
  );
  const { mutate: sendQuery, isPending } = useSendQuery();

  const [chats, setChats] = useState<ChatQA[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);

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

    const newChat: ChatQA = { query: newMessage, session_id, response: "" };
    setChats((prev) => [newChat, ...prev]);
    scrollIntoView();

    const chatData: ChatMessageCreate = { query: newMessage };
    if (session_id) chatData.session_id = session_id;

    sendQuery(chatData, {
      onSuccess: (data) => {
        if (session_id) {
          setChats((prev) =>
            prev.map((chat, idx) => (idx === 0 ? data : chat))
          );
          scrollIntoView();
        } else {
          navigate(`/chat/${data.session_id}`);
        }
      },
    });
  }, [newMessage, session_id, sendQuery, navigate]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Shift") {
      setIsShiftPressed(true);
    }
    if (event.key === "Enter" && !isShiftPressed) {
      event.preventDefault();
      submitMessage();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === "Shift") {
      setIsShiftPressed(false);
    }
  };

  const submitMessage = () => {
    if (newMessage.trim() !== "") {
      handleSend();
      setNewMessage("");
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
          loader
          scrollableTarget="messageArea"
        >
          {!session_id ? (
            isPending ? (
              <Box textAlign="center" sx={{ marginTop: "310px" }}>
                <CircularProgress size="3rem" />
              </Box>
            ) : (
              <Box textTransform={"capitalize"}>
                <Typography variant="h6" color="primary">
                  start chatting with our fintech chatbot ...
                </Typography>
              </Box>
            )
          ) : isLoading ? (
            <Box textAlign="center" sx={{ marginTop: "310px" }}>
              <CircularProgress size="3rem" />
            </Box>
          ) : (
            chats.map((chat) => {
              return (
                <Box key={`chat_${chat.id}`}>
                  <UserMessage message={chat.query} user={user} />
                  <BotMessage
                    response={chat.response}
                    createdAt={chat.created_at}
                  />
                </Box>
              );
            })
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
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
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
