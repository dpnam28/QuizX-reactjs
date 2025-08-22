import ModalCreate from "./Modal/ModalCreate";
import AllUserTable from "./Table/AllUserTable";
import { getAllUsers } from "../../services/apiServices";
import { useEffect, useState } from "react";
import ModalUpdate from "./Modal/ModalUpdate";
const ManageUsers = (props) => {
  const [showModalAddUser, setShowModalAddUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [listAllUsers, setListAllUsers] = useState([]);
  const [updatingUser, setUpdatingUser] = useState({});

  useEffect(() => {
    fetchListUser();
  }, []);

  let handleUpdateBtn = (user) => {
    setShowModalUpdateUser(true);
    setUpdatingUser(user);
  };
  let fetchListUser = async () => {
    let res = await getAllUsers();
    if (res?.EC === 0) setListAllUsers(res?.DT ?? []);
  };

  return (
    <div className="container flex flex-col">
      <div className="m-auto">
        <ModalCreate
          setShow={setShowModalAddUser}
          show={showModalAddUser}
          fetchListUser={fetchListUser}
        />
        <ModalUpdate
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchListUser={fetchListUser}
          updatingUser={updatingUser}
          setUpdatingUser={setUpdatingUser}
        />
      </div>
      <AllUserTable
        listAllUsers={listAllUsers}
        setListAllUsers={setListAllUsers}
        setShowUpdate={handleUpdateBtn}
      />
    </div>
  );
};

export default ManageUsers;
