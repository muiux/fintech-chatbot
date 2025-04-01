import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";
import { RegisterUserData } from "../types/types";
import { Box, Link, Typography } from "@mui/material";
import ChatTextField from "../components/ChatTextField";
import ChatButton from "../components/ChatButton";
import {
  confirmPasswordValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
} from "../utils/validator";
import { useNavigate } from "react-router";

interface RegisterProps extends RegisterUserData {
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { user, register, isSmallScreen } = useAuthContext();
  const [formData, setFormData] = useState<RegisterProps>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/chat");
  }, [navigate, user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid =
    !nameValidator(formData.username) &&
    !emailValidator(formData.email) &&
    !passwordValidator(formData.password) &&
    !confirmPasswordValidator(formData.password, formData.confirmPassword) &&
    formData.username &&
    formData.email &&
    formData.password &&
    formData.confirmPassword;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid)
      register(formData.username, formData.email, formData.password);
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
        Create an account
      </Typography>
      <ChatTextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        validate={nameValidator}
      />
      <ChatTextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        validate={emailValidator}
      />
      <ChatTextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        validate={passwordValidator}
      />
      <ChatTextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        validateConfirm={confirmPasswordValidator}
        compareValue={formData.password}
      />
      <ChatButton type="submit" disabled={!isFormValid}>
        Continue
      </ChatButton>
      <Typography variant="body1" gutterBottom align="center">
        Already have an account? <Link href="/login">Log in</Link>
      </Typography>
    </Box>
  );
};

export default Register;
