import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleDrawer }) => {
  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "space-between",
        flexDirection: "column",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem key={"ClaculationPage"} disablePadding>
          <ListItemButton component={Link} to={`/`}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        {["UserProfile"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={Link}
              to={`/${text.replace(" ", "").toLowerCase()}`}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div style={{ position: "relative" }}>
      <Button
        sx={{ position: "absolute", top: "0", left: "0" }}
        onClick={toggleDrawer(true)}
      >
        <img
          src="assets/pictures/sidebar-picture-svgrepo-com.svg"
          style={{
            width: "50px",
            height: "50px",
            filter:
              "invert(78%) sepia(90%) saturate(2853%) hue-rotate(136deg) brightness(97%) contrast(101%)",
          }}
        />
      </Button>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Sidebar;
