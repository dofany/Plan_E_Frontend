import React, {useState} from "react";
//import { Link } from 'react-router-dom';
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import AddToPhotosOutlinedIcon from "@material-ui/icons/AddToPhotosOutlined";

import Settings from "@material-ui/icons/Settings";
import Logout from "@material-ui/icons/Logout";
import axios from "axios";

import {
  Add,
  Edit,
  CalendarTodayOutlined
} from "@material-ui/icons/";

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
import { AuthLoginErr, CommonPostAxios } from "../../../components/Common";
import { Modal } from "react-bootstrap";
import ModalPop from "../../../components/modal/ModalPop";
import PersonalProfile from "../../../components/profile/UserProfile"
import CalendarAdd from "../../../components/calendar/CalendarAdd";
import CalendarEdit from "../../../components/calendar/CalendarEdit";
import ToastPop from "../../../components/Toast/ToastPop";

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
      setCalendarAdd(false);
      setCalendarEditModal(false);
      setCheckList(new Set());
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
    calendarSearch();
  };

  const handleClose5 = () => {
    setAnchorEl5(null);
  };

  // 캘린더 생성, 수정 버튼 클릭 상태값
  const [calendarAdd, setCalendarAdd] = useState(false);
  const [calendarList, setCalendarList] = useState([]);
  const [calendarEdit, setCalendarEdit] = useState(false);
  const [calendarEditModal, setCalendarEditModal] = useState(false);
  const [checkList, setCheckList] = useState(new Set());
  const [calendarName, setCalendarName] = useState('');
  const [calendarContent, setCalendarContent] = useState('');
  const [checkboxStates, setCheckboxStates] = useState(Array(calendarList.length).fill(false));

  const param = { userId : ""};

  // 캘린더 목록을 뿌려주기 위한 axios
  const calendarSearch = () => {
    CommonPostAxios("/calendar/findAll", param, callbackList);
    
  }

  const callbackList = (data) => {
    setCalendarList(data);
    console.log(calendarList);
  }

  const handleCheckboxChange = (event, index) => {
    const id = event.target.id;
    const isChecked = event.target.checked;
    
    // 체크박스 체크 여부 업데이트
    if(isChecked) {
      checkList.add(id);
      setCheckList(checkList);
    } else if(!isChecked && checkList.has(id)){
      checkList.delete(id);
      setCheckList(checkList);
    } 

    // 첫번째 체크박스만 disabled
    setCheckboxStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });

    console.log(checkList);
  };

  // 2개 이상 체크 여부
  const calendarEditOpen = () => {
    if(checkList.size >= 2) {
      ToastPop({
        toastOpenYn: true,
        type: 'warning',
        message: "두 개 이상 체크할 수 없습니다.",
        options: {
            sec: 3000
        }
      });
      return;

    } else if(checkList.size < 1) {
      ToastPop({
        toastOpenYn: true,
        type: 'warning',
        message: "체크박스가 체크되어있지 않습니다.",
        options: {
            sec: 3000
        }
      });
      return;
      
    } else {  

      setCalendarEditModal(true);
      const mySet = new Set(checkList);
      const myArray = Array.from(mySet);

      const caranderIdValue = myArray[0];
      console.log(caranderIdValue); 

      for(var i = 0; i < calendarList.length; i++) {
        if(calendarList[i].calendarId === caranderIdValue) {
          setCalendarName(calendarList[i].calendarName);
          setCalendarContent(calendarList[i].calendarContent);
        }
      }
      handleClose5();
    }
  }

  return (
    <>
    <Modal show={calendarAdd}>
      <CalendarAdd popEvent={popEvent}></CalendarAdd>
    </Modal>
    <Modal show={calendarEditModal}>
      <CalendarEdit popEvent={popEvent} edit={checkList} calName={calendarName} calContent={calendarContent}></CalendarEdit>
    </Modal>
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
          <MenuItem onClick={() => { setCalendarAdd(true); handleClose5();}}>
            <Avatar
                sx={{
                  width: "35px",
                  height: "35px",
                  backgroundColor: "#1A97F5",
                }}
              >
              <Add/>
            </Avatar>
            <Box
              sx={{
                ml: 2,
              }}
            >
              캘린더 생성
            </Box>
          </MenuItem>
          <MenuItem onClick={() => { !calendarEdit ?  setCalendarEdit(true) : setCalendarEdit(false); setCheckList(new Set()); console.log(calendarEdit);}}>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
                backgroundColor: "#1A97F5",
              }}
            >
            <Edit/>
            </Avatar>
            <Box
              sx={{
                ml: 2,
              }}
            >
              캘린더 수정
            </Box>
          </MenuItem>
          <Divider />
          {calendarList.map((item,index) => (
          <MenuItem key={item.calendarId}>
              {!calendarEdit ?
              <Avatar
                sx={{
                  width: "35px",
                  height: "35px",
                  backgroundColor: "#1A97F5"
                }}
              >
              <CalendarTodayOutlined/>
              </Avatar> : 
              <input 
                id={item.calendarId}
                name={`checkbox_${index}`}
                type="checkbox" 
                style={{
                width: '35px',
                height: '30px',
                verticalAlign: 'middle',
                backgroundColor: 'black'
                }}
                onChange={(e,index) => handleCheckboxChange(e,index)}
                disabled={index === 0}
                checked={checkboxStates[index]}
              />
            }
            <Box
              sx={{
                ml: 2,
              }}
            >
            {item.calendarName}
            </Box>
          </MenuItem>
          ))}
          <Divider />
          {calendarEdit && 
            <MenuItem>
                <Box
                sx={{
                  ml: 2,
                }}
                style={{color:'red', textAlign:'center', marginLeft:'90px'}}
                onClick={calendarEditOpen}
                >
                수정
              </Box>
            </MenuItem>}
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
