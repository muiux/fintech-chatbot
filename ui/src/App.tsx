import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./contexts/authProvider";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Chat from "./pages/ChatPage";
import Layout from "./layout/Layout";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/HomePage";
import { Box } from "@mui/material";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Box display={"flex"} flexDirection={"column"} minHeight={"100vh"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/chat"
                element={<PrivateRoute element={<Chat />} />}
              />
            </Routes>
          </Box>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
