import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { deleteUserById } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
function ModalDelete(props) {
  const {
    show,
    setShow,
    userSelected,
    setUserSelected,
    fetchListUser,
    setCurrentPage,
    currentPage,
  } = props;
  const { t } = useTranslation();
  const [username, setUserName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (!_.isEmpty(userSelected)) {
      setUserName(userSelected?.username ?? "");
      setId(userSelected?.id ?? "");
    } else {
      setUserName("");
      setId("");
    }
  }, [userSelected]);

  const handleClose = () => {
    setShow(false);
    setUserSelected({});
  };

  const handleDeleteUser = async (id) => {
    try {
      let res = await deleteUserById(id);
      if (res.EC === 0) {
        setShow(false);
        toast.success(res?.EM ?? "Deleted successfully", {
          closeOnClick: true,
        });
        fetchListUser(currentPage);
      } else {
        toast.error(res?.EM ?? "Error from server", {
          closeOnClick: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error from server", {
        closeOnClick: true,
      });
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("admin.user-management.delete")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("admin.user-management.confirm-delete")} <b>{username}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("admin.user-management.close")}
          </Button>
          <Button variant="danger" onClick={() => handleDeleteUser(id)}>
            {t("admin.user-management.delete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
