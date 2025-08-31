import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { toast } from "react-toastify";
import { data } from "react-router-dom";
function ModalResult({ show, setShow, dataResult }) {
  const [countCorrect, setCountCorrect] = useState(0);
  const [countTotal, setCountTotal] = useState(0);

  useEffect(() => {
    setCountCorrect(dataResult.countCorrect);
    setCountTotal(dataResult.countTotal);
  }, [dataResult]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            Total question: <b>{countTotal}</b>
          </div>
          <div className="">
            Total correct answers: <b>{countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;
