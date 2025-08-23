import App from "./App.jsx";
import { Route, Routes } from "react-router";
import User from "./components/User/User.jsx";
import { HomePage } from "./components/HomePage.jsx";
import DashBoard from "./components/Admin/DashBoard.jsx";
import ManageUsers from "./components/Admin/ManageUsers.jsx";
import Login from "./components/Auth/LogIn.jsx";
import Help from "./components/Auth/Help.jsx";
import SignUp from "./components/Auth/Signup.jsx";
import { ToastContainer, Bounce } from "react-toastify";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="user" element={<User />} />
          <Route path="admin">
            <Route index element={<DashBoard />}></Route>
            <Route path="manage-users" element={<ManageUsers />}></Route>
          </Route>
        </Route>

        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="help" element={<Help />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <ToastContainer />
    </>
  );
};

export default Layout;
