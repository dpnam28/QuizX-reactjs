import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import { LuSquareMenu } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
export const HomeSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="flex flex-col h-screen min-h-100 absolute z-50">
      <main className="p-[10px]">
        <div>
          <button
            className="sb-button sm:translate-x-3 sm:translate-y-1 sm:text-3xl text-xl translate-x-1 translate-y-2 text-blue-400"
            onClick={() => setCollapsed(!collapsed)}
          >
            <LuSquareMenu />
          </button>
        </div>
      </main>
      <Sidebar
        collapsed={collapsed}
        onBackdropClick={() => setCollapsed(false)}
        backgroundColor="#fff"
      >
        <Menu>
          <MenuItem icon={<FaHome />}>
            <NavLink to="/" className="nav-link font-medium text-lg">
              Home
            </NavLink>
          </MenuItem>
          <MenuItem icon={<FaUser />}>
            <NavLink to="/user" className="nav-link font-medium text-lg">
              User
            </NavLink>
          </MenuItem>
          <MenuItem icon={<MdAdminPanelSettings />}>
            <NavLink to="/admin" className="nav-link font-medium text-lg">
              Admin
            </NavLink>
          </MenuItem>
          <SubMenu
            label="Maps"
            icon={<FaHome />}
            className="nav-link font-medium text-lg"
          >
            <MenuItem className="font-medium text-sm"> Google maps</MenuItem>
            <MenuItem className="font-medium text-sm">
              Open street maps
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};
