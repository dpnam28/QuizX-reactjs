import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiServices";
import _ from "lodash";

function ModalUpdate(props) {
  const { show, setShow, fetchListUser, updatingUser, setUpdatingUser } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("************");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (!_.isEmpty(updatingUser)) {
      setEmail(updatingUser.email);
      setUsername(updatingUser.username);
      setImage("");
      setPreviewImg(
        updatingUser.image ? `data:image/jpeg;base64,${updatingUser.image}` : ""
      );
    } else {
      setEmail("");
      setUsername("");
      setImage("");
      setPreviewImg("");
      setRole("");
    }
  }, [updatingUser]);

  const handleSubmit = async () => {
    if (!username) {
      toast.warn("Missing username", {
        closeOnClick: true,
      });
      return;
    }

    let res = await putUpdateUser(updatingUser.id, username, role, image);

    if (res?.EC === 0) {
      handleClose();
      fetchListUser();
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
  };

  const handleClose = () => {
    setShow(false);
    setUpdatingUser({});
  };
  const handleShow = () => setShow(true);
  const handleChangeImage = (event) => {
    if (event.target?.files?.[0]) {
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Email"
                  value={email}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  disabled
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  required
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="position-relative mt-3">
                <Form.Label
                  htmlFor="file"
                  className="cursor-pointer border border-black rounded-lg pb-1 px-2 border-dashed"
                >
                  <span className="text-xl font-black">+</span> Choose Image
                </Form.Label>
                <Form.Control
                  type="file"
                  required
                  name="file"
                  id="file"
                  onChange={(e) => handleChangeImage(e)}
                  hidden
                />
              </Form.Group>
              {previewImg && (
                <div
                  className={`w-[70%] border border-dotted h-50 m-auto bg-contain bg-no-repeat bg-center`}
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
    </>
  );
}

export default ModalUpdate;
