import React from 'react';
import MainCalendar from "../../calander/component/MainCalendar";
import {ProSidebar} from "react-pro-sidebar";
import './Main.css';

function Main() {
    return (
        <>
            {/*<ProSidebar>*/}
                <MainCalendar/>
            {/*</ProSidebar>*/}
        </>
    );
}
export default Main;
