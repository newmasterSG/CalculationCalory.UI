import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from 'react-router-dom';

interface SidebarProps{
    isOpen: boolean;
    toggleDrawer: (newOpen: boolean) => () => void;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, toggleDrawer}) => {

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {['UserProfile', 'Goal', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={`/${text.replace(' ', '').toLowerCase()}`}>
                  <ListItemIcon>
                   
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );


    return(
        <div>
            <Button onClick={toggleDrawer(true)}>Open drawer</Button>
            <Drawer open={isOpen} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    )
}

export default Sidebar;
