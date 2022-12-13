import React from 'react';
import MainCalendar from "../calander/MainCalendar";
import {ProSidebarProvider} from "react-pro-sidebar";

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
