import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useAuthContext } from "../contexts/authContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            href="/"
            sx={{ mr: 2 }}
          >
            <AdbIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textTransform: "uppercase" }}
          >
            chat
          </Typography>
          <Box>
            {!isAuthenticated ? (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                href="/login"
                sx={{ borderRadius: "16px" }}
              >
                <Typography
                  variant="button"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  Log in
                </Typography>
              </IconButton>
            ) : (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ borderRadius: "16px" }}
              >
                <AccountCircle />
              </IconButton>
            )}
            {isAuthenticated && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  disabled
                  sx={{
                    "&.Mui-disabled": { opacity: 1 },
                  }}
                >
                  {user}
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
