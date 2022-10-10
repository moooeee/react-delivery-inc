import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

function Layout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={function () {
                setIsDrawerOpen(!isDrawerOpen);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mail Delivery Service
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        ModalProps={{
          onBackdropClick: function () {
            setIsDrawerOpen(false);
          },
        }}
      >
        <List style={{ width: "300px" }}>
          <ListItem button component={Link} to="/packages-list">
            <ListItemText primary={"Packages"} />
          </ListItem>
          <ListItem button component={Link} to="/customers-list">
            <ListItemText primary={"Customers"} />
          </ListItem>
          <ListItem button component={Link} to="/invoices">
            <ListItemText primary={"Invoices"} />
          </ListItem>
        </List>
      </Drawer>
      {children}
    </>
  );
}

export default Layout;
