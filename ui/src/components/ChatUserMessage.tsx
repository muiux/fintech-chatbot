import React from "react";
import { Box, Avatar, Paper, Typography } from "@mui/material";
import { stringAvatar } from "../utils/functions";

interface UserMessageProps {
  message: string;
  user: string | null;
}

const userMessageStyles = {
  paper: {
    padding: "12px",
    maxWidth: "70%",
    borderRadius: "16px",
    backgroundColor: "#f5f5f5",
    color: "#000000",
  },
};

const UserMessage: React.FC<UserMessageProps> = ({ message, user }) => {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="flex-start"
        mb={2}
        flexDirection={"row-reverse"}
        gap={2}
      >
        <Avatar {...stringAvatar(user ?? "Unknown User")} />
        <Paper sx={userMessageStyles.paper} elevation={1}>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {message}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserMessage;
