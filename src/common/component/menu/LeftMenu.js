
//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./LeftMenu.css";
import {CgUserlane} from "react-icons/cg";
import PersonalProfile from "../../../user/component/profile/UserProfile";
import {Modal} from "react-bootstrap";


const LeftMenu = () => {

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true);

    const menuForm = {
        main: false,
        setting: false
    };
    const [menuActive, setMenuActive] = useState(menuForm);

    const [userPop, setUserPop] = useState(false);


    // setMenuActive({
    //     main: true
    // });


    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const logoutClick = () => {
        document.location.href = '/login'
    }

    const menuClick = (e) => {
        console.log('탐');
        console.log(e);
        setMenuActive(menuForm);
        setMenuActive({
           ...menuActive,
           [e.target.name]: true
        });
    }

    const userClick = () => {
        console.log('userClick');
    }

    const popEvent = (i) => {
        if(i) {
            setUserPop(false);
        }
    }
    return (
        <>
            <Modal show={userPop}>
                <PersonalProfile popEvent = {popEvent}></PersonalProfile>
            </Modal>
            <div id="header">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext" onClick={() => {
                            setUserPop(true);
                        }} style={{cursor : 'pointer'}}>
                            {/* small and big change using menucollapse state */}
                            <p>{menuCollapse ? <CgUserlane/> : "백상열"}</p>
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <FiArrowRightCircle/>
                            ) : (
                                <FiArrowLeftCircle/>
                            )}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem active={menuActive.main} icon={<FiHome />} onClick={ () => {
                                setMenuActive({
                                    ...menuActive,
                                    main: true,
                                    setting: false
                                });
                            } }>
                                Home
                            </MenuItem>
                            <MenuItem icon={<FaList />}>Category</MenuItem>
                            <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
                            <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
                            <MenuItem active={menuActive.setting} icon={<BiCog />} onClick={ () => {
                                setMenuActive({
                                    ...menuActive,
                                    main: false,
                                    setting: true
                                })
                            } }>Settings</MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />} onClick={ logoutClick }>Logout</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
};

export default LeftMenu;
