import App from "./App.jsx";
import { Route, Routes } from "react-router";
import User from "./components/User/User.jsx";
import { HomePage } from "./components/HomePage.jsx";
import DashBoard from "./components/Admin/DashBoard.jsx";
import ManageUsers from "./components/Admin/ManageUsers/ManageUsers.jsx";
import ManageQuiz from "./components/Admin/ManageQuiz/ManageQuiz.jsx";
import Login from "./components/Auth/LogIn.jsx";
import Help from "./components/Auth/Help.jsx";
import SignUp from "./components/Auth/Signup.jsx";
import DetailQuiz from "./components/User/DetailQuiz.jsx";
import NotFound from "./components/NotFound.jsx";
import ManageQuestions from "./components/Admin/MangeQuestions/ManageQuestions.jsx";
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
            <Route path="manage-quiz" element={<ManageQuiz />}></Route>
            <Route
              path="manage-questions"
              element={<ManageQuestions />}
            ></Route>
          </Route>
        </Route>

        <Route path="quiz/:id" element={<DetailQuiz />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="help" element={<Help />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
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
