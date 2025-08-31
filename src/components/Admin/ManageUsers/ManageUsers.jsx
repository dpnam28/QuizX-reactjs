import {
  getAllUsers,
  getListUserWithPagination,
} from "../../../services/apiServices";
import { useEffect, useState } from "react";
import ModalCreate from "./Modal/ModalCreate";
import AllUserTable from "./Table/AllUserTable";
import ModalUpdate from "./Modal/ModalUpdate";
import ModalView from "./Modal/ModalView";
import ModalDelete from "./Modal/ModalDelete";
import { useTranslation } from "react-i18next";

const ManageUsers = (props) => {
  const LIMIT_PER_PAGE = 5;
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [showModalAddUser, setShowModalAddUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [listAllUsers, setListAllUsers] = useState([]);
  const [listAllUsersWithPagination, setListAllUsersWithPagination] = useState(
    []
  );
  const [userSelected, setUserSelected] = useState({});

  useEffect(() => {
    fetchListUser();
  }, []);

  useEffect(() => {
    fetchListUserWithPagination(1);
  }, []);

  let handleUpdateBtn = (user) => {
    setShowModalUpdateUser(true);
    setUserSelected(user);
  };

  const handlShowUser = (user) => {
    setShowModalViewUser(true);
    setUserSelected(user);
  };
  const handlDeleteUser = (user) => {
    setShowModalDeleteUser(true);
    setUserSelected(user);
  };
  let fetchListUser = async () => {
    let res = await getAllUsers();
    if (res?.EC === 0) setListAllUsers(res?.DT ?? []);
  };

  let fetchListUserWithPagination = async (page, limit = LIMIT_PER_PAGE) => {
    let res = await getListUserWithPagination(page, limit);
    setListAllUsersWithPagination(res?.DT ?? {});
  };

  return (
    <div className="container flex flex-col">
      <div className="text-center md:text-5xl text-4xl text-black font-black my-10">
        {t("admin.user-management.title")}
      </div>
      <div className="m-auto">
        <ModalCreate
          setShow={setShowModalAddUser}
          show={showModalAddUser}
          fetchListUser={fetchListUserWithPagination}
          currentPage={currentPage}
        />
        <ModalUpdate
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchListUser={fetchListUserWithPagination}
          updatingUser={userSelected}
          setUpdatingUser={setUserSelected}
          currentPage={currentPage}
        />
        <ModalView
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
        />
        <ModalDelete
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          fetchListUser={fetchListUserWithPagination}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      <AllUserTable
        listAllUsers={listAllUsers}
        setListAllUsers={setListAllUsers}
        setShowUpdate={handleUpdateBtn}
        setShowView={handlShowUser}
        setShowDelete={handlDeleteUser}
        listAllUsersWithPagination={listAllUsersWithPagination}
        setListAllUsersWithPagination={setListAllUsersWithPagination}
        fetchListUserWithPagination={fetchListUserWithPagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ManageUsers;
