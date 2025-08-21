import ModalCreate from "./Modal/ModalCreate";
import AllUserTable from "./Table/AllUserTable";
import { getAllUsers } from "../../services/apiServices";
import { useEffect, useState } from "react";
const ManageUsers = (props) => {
  const [showModalAddUser, setShowModalAddUser] = useState(false);
  const [listAllUsers, setListAllUsers] = useState([]);

  useEffect(() => {
    fetchListUser();
  }, []);

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
      </div>
      <AllUserTable
        listAllUsers={listAllUsers}
        setListAllUsers={setListAllUsers}
      />
    </div>
  );
};

export default ManageUsers;
