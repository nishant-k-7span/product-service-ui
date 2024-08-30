import * as React from "react";
import styles from "./sidebar.module.css";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { styled, Typography } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import KeyboardTabOutlinedIcon from "@mui/icons-material/KeyboardTabOutlined";
import { useNavigate } from "react-router-dom";

const drawerWidth = 226;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
    paddingLeft: "0",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));



function Sidebar(props) {
  const { open, toggleDrawer } = props;
  const navigate = useNavigate();
  const [activeId, setActiveId] = React.useState("Dashboard");

  const onClick = () => {
    navigate('/', {
      replace: true
    })
  }  
  
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <div className={styles.sidebar__logo} >
          {open ? (
            <img
              style={{ width: '171px'}}
              src="/src/assets/image/sidebar-logo1.svg"
              alt="logo"
            />
          ) : (
            <img style={{ width: '171px'}}
            src="/src/assets/image/responsive-logo1.svg" alt="logo" />
          )}
        </div>
        {open ? <Divider /> : ""}
        <div className={styles.sidebar__wrapper}>
          <List>
            <ListItem key={"dashboard"} disablePadding sx={{ mt: 2 }}>
              <ListItemButton
                aria-label="open drawer"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "start" : "left",
                  "&:hover": {
                    borderRadius: "8px",
                    background: "#E4E4E7",
                  },
                  paddingLeft: "20px",
                }}
                onClick={() => setActiveId("dashboard")}
              >
                <img src="/src/assets/image/dashboard.svg" />

                <Typography
                  className={styles.sidebar__text}
                  sx={{
                    opacity: open ? 1 : 0,
                    fontFamily: "Figtree",
                    pl: 2,
                  }}
                >
                  Dashboard
                </Typography>
              </ListItemButton>
            </ListItem>

            <ListItem key={"exam"} disablePadding sx={{ mt: 2 }}>
              <ListItemButton
                aria-label="open drawer"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "start",
                  paddingLeft: "20px",
                  "&:hover": {
                    background: "#4936EF33",
                    borderRadius: "8px",
                  },
                }}
                onClick={onClick}
                selected={true}
              >
                <ArticleOutlinedIcon style={{ fill: "#71717A" }} />

                <Typography
                  className={styles.sidebar__text}
                  sx={{
                    opacity: open ? 1 : 0,
                    pl: 3,
                    fontFamily: "Figtree",
                  }}
                >
                  Products
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem key={"question"} disablePadding sx={{ mt: 2 }}>
              <ListItemButton
                aria-label="open drawer"
                sx={{
                  minHeight: 48,
                  paddingLeft: "20px",
                  justifyContent: open ? "initial" : "start",
                  "&:hover": {
                    background: "#E4E4E7",
                    borderRadius: "8px",
                  },
                }}
              >
                <QuizOutlinedIcon style={{ fill: "#71717A" }} />

                <Typography
                  className={styles.sidebar__text}
                  sx={{
                    opacity: open ? 1 : 0,
                    pl: 3,
                    fontFamily: "Figtree",
                  }}
                >
                  Users
                </Typography>
              </ListItemButton>
            </ListItem>

            <ListItem key={"result"} disablePadding sx={{ mt: 2 }}>
              <ListItemButton
                aria-label="open drawer"
                sx={{
                  minHeight: 48,
                  paddingLeft: "20px",
                  justifyContent: open ? "initial" : "start",
                  "&:hover": {
                    background: "#E4E4E7",
                    borderRadius: "8px",
                  },
                }}
              >
                <img
                  src="/src/assets/image/sidebar-result.svg
                "
                  style={{ fill: "#71717A" }}
                />

                <Typography
                  className={styles.sidebar__text}
                  sx={{
                    opacity: open ? 1 : 0,
                    pl: 3,
                    fontFamily: "Figtree",
                  }}
                >
                  Invoice
                </Typography>
              </ListItemButton>
            </ListItem>
            
            
            <ListItem key={"result"} disablePadding sx={{ mt: 2 }}>
              <ListItemButton
                aria-label="open drawer"
                sx={{
                  minHeight: 48,
                  paddingLeft: "20px",
                  justifyContent: open ? "initial" : "start",
                  "&:hover": {
                    background: "#E4E4E7",
                    borderRadius: "8px",
                  },
                }}
              >
                <img
                  src="/src/assets/image/sidebar-result.svg
                "
                  style={{ fill: "#71717A" }}
                />

                <Typography
                  className={styles.sidebar__text}
                  sx={{
                    opacity: open ? 1 : 0,
                    pl: 3,
                    fontFamily: "Figtree",
                  }}
                >
                  Setting
                </Typography>
              </ListItemButton>
            </ListItem>

          </List>

          <List sx={{ width: "100%" }}>
            <ListItem key={"account"} disablePadding sx={{ mt: 2 }}>
              <ListItemButton
                aria-label="open drawer"
                sx={{
                  minHeight: 48,
                  paddingLeft: "20px",
                  justifyContent: open ? "initial" : "start",
                  "&:hover": {
                    borderRadius: "8px",
                    background: "#E4E4E7",
                  },
                }}
              >
                <AccountCircleOutlinedIcon style={{ fill: "#71717A" }} />

                <Typography
                  className={styles.sidebar__text}
                  sx={{
                    opacity: open ? 1 : 0,
                    pl: 3,
                    fontFamily: "Figtree",
                  }}
                >
                  Account
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem key={"Collapse"} disablePadding>
              <ListItemButton
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  minHeight: 48,
                  paddingLeft: "20px",
                  justifyContent: open ? "initial" : "start",
                  "&:hover": {
                    borderRadius: "8px",
                    background: "#E4E4E7",
                  },
                }}
              >
                {open ? (
                  <img
                    src="/src/assets/image/collapse.svg"
                    style={{ fill: "#71717A" }}
                  />
                ) : (
                  <KeyboardTabOutlinedIcon style={{ fill: "#71717A" }} />
                )}
                <Typography
                  className={styles.sidebar__text}
                  sx={{
                    opacity: open ? 1 : 0,
                    fontFamily: "Figtree",
                    pl: 3,
                  }}
                >
                  Collapse
                </Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
