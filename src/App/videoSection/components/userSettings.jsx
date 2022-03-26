import React from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const UserSettings = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const SignOutUser = () => {
    signOut(auth).then(alert("Log Out Done"));
  };

  return (
    <div className="userInfo__container">
      {user && (
        <Link to="/uploadvideo">
          <Button
            variant="outlined"
            size="medium"
            className="userinfo__uploadBtn"
          >
            upload
          </Button>
        </Link>
      )}
      {user ? (
        ""
      ) : (
        <Link to="/login">
          <Button
            variant="contained"
            size="medium"
            className="userinfo__loginbtn"
          >
            log in
          </Button>
        </Link>
      )}

      <React.Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <BsThreeDotsVertical
                sx={{ width: 32, height: 32 }}
                className="openUserSettings"
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar /> {user?.displayName}
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <FaHeart fontSize="medium" style={{ marginLeft: "2.7px" }} />
            </ListItemIcon>
            My Like Videos
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" style={{ marginLeft: "2.7px" }} />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={SignOutUser}>
            <ListItemIcon>
              <Logout fontSize="small" style={{ marginLeft: "5.7px" }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    </div>
  );
};

export default UserSettings;
