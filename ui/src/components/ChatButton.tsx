import React from "react";
import { Button } from "@mui/material";
import { useAuthContext } from "../contexts/authContext";

interface ChatButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  onClick?: () => void;
  children: React.ReactNode;
  sx?: object;
  disabled?: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({
  type = "button",
  variant = "contained",
  color = "primary",
  onClick,
  children,
  sx = {},
  disabled = false,
}) => {
  const { isSmallScreen } = useAuthContext();

  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      size={isSmallScreen ? "medium" : "large"}
      onClick={onClick}
      sx={{ borderRadius: "32px", ...sx }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default ChatButton;
