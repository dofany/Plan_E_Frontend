import {Menu, MenuItem, Sidebar, SubMenu, useProSidebar} from "react-pro-sidebar";

import React from 'react';
import {GiHamburgerMenu} from "react-icons/gi";
// import {FaBeer, GiHamburgerMenu} from "react-icons/all";


export default function Layout({ children }) {
  const { collapseSidebar, toggleSidebar } = useProSidebar();

  return (
    <div style={{ display: "flex", height: "100%", minHeight: '400px' }}>
      <Sidebar breakPoint="always">
        <Menu renderExpandIcon={({ open }) => <span>{open ? '-' : '+'}</span>}>
          <SubMenu label="Charts">
            {/*<MenuItem icon={<FaBeer />}> Pie charts</MenuItem>*/}
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
          </SubMenu>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ display: 'flex', padding: 10 }}>
        <div>
          <a id="show-sidebar" className="btn btn-sm btn-dark" href="#" onClick={() => {toggleSidebar()}}>
            <GiHamburgerMenu></GiHamburgerMenu>
          </a>

          {/*<button className="sb-button" onClick={() => {toggleSidebar()}} >*/}
          {/*  Toggle*/}
          {/*</button>*/}
        </div>
      </main>
    </div>
  );
}

// function toggleSide() {
//   toggleButton.current.classList.remove('sb-button');
//   //$(".page-wrapper").removeClass("toggled");
//   this.toggleSidebar();
// }



