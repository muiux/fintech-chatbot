import React from "react";
import { Box, Avatar, Paper, Typography, Skeleton } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { blue } from "@mui/material/colors";
import Markdown from "react-markdown";
import { format } from "date-fns";

interface BotMessageProps {
  response: string;
  createdAt?: Date;
}

const botMessageStyles = {
  paper: {
    padding: "12px",
    maxWidth: "70%",
    borderRadius: "16px",
    backgroundColor: "#1976d2",
    color: "#ffffff",
  },
  timestamp: {
    display: "block",
    marginTop: 1,
    opacity: 0.7,
  },
};

const BotMessage: React.FC<BotMessageProps> = ({ response, createdAt }) => {
  const formattedTime = createdAt
    ? format(new Date(createdAt), "h:mm a")
    : "N/A";

  return (
    <Box display="flex" alignItems="flex-start" mb={2} gap={2}>
      <Avatar sx={{ bgcolor: blue[500] }}>
        <AdbIcon />
      </Avatar>
      {response ? (
        <Paper sx={botMessageStyles.paper} elevation={1}>
          <Typography variant="body1" component="span">
            <Markdown>{response}</Markdown>
          </Typography>
          <Typography variant="caption" sx={botMessageStyles.timestamp}>
            {formattedTime}
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ width: "100%", maxWidth: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      )}
    </Box>
  );
};

export default BotMessage;
