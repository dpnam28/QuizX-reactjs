import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router";
import User from "./components/User/User.jsx";
import { HomePage } from "./components/HomePage.jsx";
import DashBoard from "./components/Admin/DashBoard.jsx";
import ManageUsers from "./components/Admin/ManageUsers.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="user" element={<User />} />
        <Route path="admin">
          <Route index element={<DashBoard />}></Route>
          <Route path="manage-users" element={<ManageUsers />}></Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
