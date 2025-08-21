import { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Outlet />
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
}

export default App;
