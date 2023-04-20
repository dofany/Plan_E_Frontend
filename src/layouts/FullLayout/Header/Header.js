import React, {useState} from "react";
//import { Link } from 'react-router-dom';
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import AddToPhotosOutlinedIcon from "@material-ui/icons/AddToPhotosOutlined";

import PersonAdd from "@material-ui/icons/PersonAdd";
import Settings from "@material-ui/icons/Settings";
import Logout from "@material-ui/icons/Logout";
import axios from "axios";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
} from "@material-ui/core";

import userimg from "../../../assets/images/users/user.jpg";
import { AuthLoginErr } from "../../../components/Common";
import { Modal } from "react-bootstrap";
import ModalPop from "../../../components/modal/ModalPop";
import PersonalProfile from "../../../components/profile/UserProfile"

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [userPop, setUserPop] = useState(false);

  const modalForm = {
    title: '',
    message: '',
    open: false,
    callback: null
  };
  
  const [modalFormState, setModalFormState] = useState(modalForm);

  const stateInit = () => {
    setModalFormState(modalForm);
    setUserPop(false);
  }

  const modalOpen = (title, message, callback) =>{
    setModalFormState({
        title: title,
        message: message,
        open: true,
        callback: callback
    });

  }

  // 로그아웃 이벤트 처리
  const logoutClick = () => {
    handleClose4();
    modalOpen("로그아웃", "로그인 창으로 돌아갑니다.",(data) => {
        // 창을 닫을때("OK")
        if(data) {
            // 모든 state, form 초기화
            stateInit();
            axios.get("/api/auth/sessionLogout").then(res => {
              if(res.data === "Y") {
                  document.location.href = '/';
              } 
            }).catch(res => {
                AuthLoginErr(res);
            });
        }
        // 창을 닫을때("취소")
        else {
            // 모달 비활성
            setModalFormState(modalForm);
            return;
        }
    });
  }

  const popEvent = (i) => {
    if(i) {
      setUserPop(false);
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 4
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  // 5
  const [anchorEl5, setAnchorEl5] = React.useState(null);

  const handleClick5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };

  const handleClose5 = () => {
    setAnchorEl5(null);
  };

  return (
    <>
    <ModalPop open = {modalFormState.open}
                      setPopup = {setModalFormState}
                      message = {modalFormState.message}
                      title = {modalFormState.title}
                      callback = {modalFormState.callback}/>

    <Modal show={userPop} style={{ zIndex: 9999 }}>
        <PersonalProfile popEvent = {popEvent}></PersonalProfile>
    </Modal>
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>
        <IconButton
          aria-label="menu"
          color="inherit"
          aria-controls="dd-menu"
          aria-haspopup="true"
          onClick={handleClick5}
        >
          <AddToPhotosOutlinedIcon />
        </IconButton>
        <Menu
          id="dd-menu"
          anchorEl={anchorEl5}
          keepMounted
          open={Boolean(anchorEl5)}
          onClose={handleClose5}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={handleClose5}>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              New account
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose5}>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              New Page
            </Box>
          </MenuItem>
          <MenuItem onClick={handleClose5}>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              New Component
            </Box>
          </MenuItem>
        </Menu>
        <Box flexGrow={1} />

        {/* ------------------------------------------- */}
        {/* Notifications Dropdown */}
        {/* ------------------------------------------- */}
        <IconButton
          aria-label="menu"
          color="inherit"
          aria-controls="notification-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <NotificationsNoneOutlinedIcon width="20" height="20" />
        </IconButton>
        <Menu
          id="notification-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "200px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={handleClose}>Action</MenuItem>
          <MenuItem onClick={handleClose}>Action Else</MenuItem>
          <MenuItem onClick={handleClose}>Another Action</MenuItem>
        </Menu>
        {/* ------------------------------------------- */}
        {/* End Notifications Dropdown */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={userimg}
              alt={userimg}
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={() => { setUserPop(true); handleClose4();}}>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              프로필 카드
            </Box>
          </MenuItem>
          <Divider />
          {/* <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem> */}
          <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            설정
          </MenuItem>
          <MenuItem onClick={logoutClick}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            로그아웃
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
    </>
  );
};

export default Header;
