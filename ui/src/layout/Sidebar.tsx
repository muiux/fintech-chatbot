import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { useChatSession } from "../hooks/useChatSession";
import { useLocation, useNavigate } from "react-router";

const drawerWidth = 240;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isMediumScreen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, isMediumScreen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: sessions, isLoading, refetch } = useChatSession();

  useEffect(() => {
    if (location.pathname.startsWith("/chat")) {
      refetch();
    }
  }, [location, refetch]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant={isMediumScreen ? "temporary" : "persistent"}
      onClose={isMediumScreen ? onClose : undefined}
      anchor="left"
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
        }}
      >
        <IconButton onClick={() => navigate("/chat")}>
          <AddCommentOutlinedIcon />
        </IconButton>
        <IconButton onClick={onClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {isLoading ? (
          <Box textAlign="center" sx={{ marginTop: "310px" }}>
            <CircularProgress size="3rem" />
          </Box>
        ) : (
          sessions?.map((session) => (
            <ListItem key={session.id} disablePadding>
              <ListItemButton onClick={() => navigate(`/chat/${session.id}`)}>
                <ListItemText
                  primary={session.title}
                  slotProps={{
                    primary: {
                      noWrap: true,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
