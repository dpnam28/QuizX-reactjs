import { Outlet } from "react-router-dom";

const Admin = (props) => {
  return (
    <div className="text-center text-5xl text-black font-black">
      Admin page
      <Outlet />
    </div>
  );
};

export default Admin;
