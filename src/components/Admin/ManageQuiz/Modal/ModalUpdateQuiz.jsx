import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import _ from "lodash";
import { useEffect } from "react";
import { putUpdateQuiz } from "../../../../services/apiServices";

import { useState } from "react";

const levelOptions = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ModalUpdateQuiz = ({ show, handleClose, quizSelected, fetchAllQuiz }) => {
  const [quizName, setQuizName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (!_.isEmpty(quizSelected)) {
      setQuizName(quizSelected?.name ?? "");
      setDescription(quizSelected?.description ?? "");
      setDifficulty(quizSelected?.difficulty ?? "EASY");
      setImage(quizSelected?.image ?? "");
      setPreviewImg(
        quizSelected.image ? `data:image/jpeg;base64,${quizSelected.image}` : ""
      );
    } else {
      setQuizName("");
      setDescription("");
      setDifficulty("EASY");
      setImage("");
      setPreviewImg("");
    }
  }, [quizSelected]);

  const handleChangeImage = (event) => {
    if (event.target?.files?.[0]) {
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (quizSelected.id && quizName && description && difficulty && image) {
      let res = await putUpdateQuiz(
        quizSelected.id,
        description,
        difficulty,
        quizName,
        image
      );

      if (res?.EC === 0) {
        handleClose();
        fetchAllQuiz;
        toast.success(res.EM, {
          closeOnClick: true,
        });
      } else if (res.message) {
        toast.error(res.message, {
          closeOnClick: true,
        });
      } else {
        toast.warn(`${res?.EM ?? "Error message form server"}`, {
          closeOnClick: true,
        });
      }
    } else {
      toast.warn("Missing parameters", {
        closeOnClick: true,
      });
      return;
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Update quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Quiz's name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Quiz's name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Difficulty</Form.Label>
              <Form.Select
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}
              >
                {levelOptions.length > 0 &&
                  levelOptions.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.label}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="position-relative mt-3">
              <Form.Label htmlFor="file">Choose Image</Form.Label>
              <Form.Control
                type="file"
                required
                name="file"
                id="file"
                onClick={(e) => handleChangeImage(e)}
                // hidden
              />
            </Form.Group>
            {previewImg && (
              <div
                className={`w-[70%] border border-dotted h-50 mt-5 m-auto bg-contain bg-no-repeat bg-center`}
                style={{ background: `url(${previewImg})` }}
              ></div>
            )}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateQuiz;
