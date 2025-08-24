import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import { LuSquareMenu } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";

export const HomeSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="flex flex-col h-screen min-h-100 -z-10 absolute top-0 -left-0">
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
          <MenuItem
            icon={<FaHome />}
            component={<NavLink to="" />}
            className="nav-link font-medium text-lg"
          >
            Home
          </MenuItem>
          {isAuthenticated && (
            <MenuItem
              icon={<FaUser />}
              component={<NavLink to="user" />}
              className="nav-link font-medium text-lg"
            >
              User
            </MenuItem>
          )}
          <SubMenu
            label="Admin"
            icon={<MdAdminPanelSettings />}
            className="nav-link font-medium text-lg"
          >
            <MenuItem
              className="font-medium text-sm"
              component={<Link to="admin" />}
            >
              DashBoard
            </MenuItem>
            <MenuItem
              className="font-medium text-sm"
              component={<Link to="admin/manage-users" />}
            >
              Manage Users
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};
