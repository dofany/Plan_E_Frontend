
//import useState hook to create menu collapse state
import React, { useState } from "react";
import logo from '../../../assets/E_.png';



const Header = () => {


    return (
        <>
            {/*<header>*/}
            <div className="headerLayout">
                {/*<div className="header-container">*/}
                    {/*<div style={{width: '200px'}}>*/}
                    {/*</div>*/}
                    {/*<img src={icon} alt="로딩중" width="7%" />*/}
                    <img src={logo} className="logoImage"/>
                    <p>testestestst</p>
                {/*</div>*/}
            </div>
            {/*</header>*/}
        </>
    );
};

export default Header;
