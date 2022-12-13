import React from 'react';
import MainCalendar from "../calander/MainCalendar";
import {ProSidebarProvider} from "react-pro-sidebar";
import './Main.css';

function Main() {
    return (
        <>
            <ProSidebarProvider>
                <MainCalendar/>
            </ProSidebarProvider>
        </>
    );
}
export default Main;
