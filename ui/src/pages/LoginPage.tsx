import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Link, Typography } from "@mui/material";
import { useAuthContext } from "../contexts/authContext";
import { LoginCredentials } from "../types/types";
import ChatTextField from "../components/ChatTextField";
import ChatButton from "../components/ChatButton";
import { nameValidator, passwordValidator } from "../utils/validator";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  const { login, isSmallScreen } = useAuthContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid =
    !nameValidator(formData.username) &&
    !passwordValidator(formData.password) &&
    formData.username &&
    formData.password;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) login(formData.username, formData.password);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: isSmallScreen ? "100%" : "500px",
        margin: "auto",
        padding: isSmallScreen ? 2 : 0,
      }}
    >
      <Typography
        variant={isSmallScreen ? "h4" : "h3"}
        gutterBottom
        align="center"
        textTransform={"capitalize"}
      >
        welcome back
      </Typography>
      <ChatTextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        validate={nameValidator}
      />
      <ChatTextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        validate={passwordValidator}
      />
      <ChatButton type="submit" disabled={!isFormValid}>
        Continue
      </ChatButton>
      <Typography variant="body1" gutterBottom align="center">
        Don't have an account? <Link href="/register">Sign up</Link>
      </Typography>
    </Box>
  );
};

export default Login;
