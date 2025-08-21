import { useState } from "react";
import ModalCreate from "./Modal/ModalCreate";

const ManageUsers = (props) => {
  const [showModalAddUser, setShowModalAddUser] = useState(false);
  return (
    <div className="container text-center">
      <ModalCreate setShow={setShowModalAddUser} show={showModalAddUser} />
    </div>
  );
};

export default ManageUsers;
