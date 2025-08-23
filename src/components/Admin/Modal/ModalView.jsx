import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import _ from "lodash";

function ModalView(props) {
  const { show, setShow, userSelected, setUserSelected } = props;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (!_.isEmpty(userSelected)) {
      setEmail(userSelected?.email ?? "");
      setUsername(userSelected?.username ?? "");
      setRole(userSelected?.role ?? "");
      setPreviewImg(
        userSelected.image ? `data:image/jpeg;base64,${userSelected.image}` : ""
      );
    } else {
      setEmail("");
      setUsername("");
      setPreviewImg("");
      setRole("");
    }
  }, [userSelected]);

  const handleClose = () => {
    setShow(false);
    setUserSelected({});
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>User information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Email"
                  value={email}
                  disabled
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Role</Form.Label>
                <Form.Select required value={role} disabled>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </Form.Select>
              </Form.Group>
              {previewImg && (
                <div
                  className={`w-[70%] border border-dotted h-50 m-auto bg-contain bg-no-repeat bg-center mt-5`}
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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalView;
