import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useState } from "react";
import { LuSquareMenu } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const HomeSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-screen min-h-100 absolute top-0 -left-0">
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
        className={`border-none sm:block ${collapsed ? "block" : "hidden"}`}
      >
        <Menu>
          <MenuItem
            icon={<FaHome />}
            component={<NavLink to="" />}
            className="nav-link font-medium text-lg"
          >
            {t("sidebar.home")}
          </MenuItem>
          {isAuthenticated && (
            <MenuItem
              icon={<FaUser />}
              component={<NavLink to="user" />}
              className="nav-link font-medium text-lg"
            >
              {t("sidebar.user")}
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
              {t("sidebar.dashboard")}
            </MenuItem>
            <MenuItem
              className="font-medium text-sm"
              component={<Link to="admin/manage-users" />}
            >
              {t("sidebar.user-management")}
            </MenuItem>
            <MenuItem
              className="font-medium text-sm"
              component={<Link to="admin/manage-quiz" />}
            >
              {t("sidebar.quiz-management")}
            </MenuItem>
            <MenuItem
              className="font-medium text-sm"
              component={<Link to="admin/create-question" />}
            >
              {t("sidebar.create-questions")}
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};
