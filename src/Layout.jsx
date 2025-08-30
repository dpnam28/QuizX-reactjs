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
import DetailQuiz from "./components/User/DetailQuiz/DetailQuiz.jsx";
import NotFound from "./components/NotFound.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import AddQuestionForQuiz from "./components/Admin/AddQuestionsForQuiz/AddQuestionForQuiz.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import { Suspense } from "react";
const Layout = () => {
  return (
    <Suspense fallback="">
      <Routes>
        <Route path="" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route path="admin">
            <Route
              index
              element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="manage-users"
              element={
                <PrivateRoute>
                  <ManageUsers />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="manage-quiz"
              element={
                <PrivateRoute>
                  <ManageQuiz />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="create-question"
              element={
                <PrivateRoute>
                  <AddQuestionForQuiz />
                </PrivateRoute>
              }
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
    </Suspense>
  );
};

export default Layout;
