import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { deleteQuizById } from "../../../../services/apiServices";
import { toast } from "react-toastify";

const ModalDeleteQuiz = ({ show, handleClose, idQuiz, fetchAllQuiz }) => {
  const handleDeleteQuiz = async () => {
    if (idQuiz) {
      let res = await deleteQuizById(idQuiz);
      if (res?.EC === 0) {
        toast.success(res?.EM ?? "Succeeded", {
          closeOnClick: true,
        });
        fetchAllQuiz();
        handleClose(false);
      } else {
        toast.warn(res?.EM ?? "Error", {
          closeOnClick: true,
        });
      }
    }
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Delete quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this quiz</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDeleteQuiz}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteQuiz;
