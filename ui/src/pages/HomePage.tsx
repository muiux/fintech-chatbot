import { Box, Container, Typography, Button } from "@mui/material";
import React from "react";

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        mt={24}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to FinChat
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Your AI-Powered Fintech Assistant
        </Typography>
        <Typography variant="h6" color="textSecondary" maxWidth="600px" mb={4}>
          FinChat uses AI with RAG to deliver accurate fintech answers
          instantly, while saving your chat history for a seamless experience.
        </Typography>
        <Button variant="contained" color="primary" size="large" href="/chat">
          Start Chatting
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
