import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import { getAllQuizForAdmin, getAllUsers } from "../../../services/apiServices";
import { useState, useEffect } from "react";
import _ from "lodash";
import { postAssignQuizToUser } from "../../../services/apiServices";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const AssignQuizForUser = ({ listQuiz, setListQuiz }) => {
  const [listAllUsers, setListAllUsers] = useState([]);
  const [quizSelected, setQuizSelected] = useState("");
  const [userSelected, setUserSelected] = useState("");
  const [listQuizForAssign, setListQuizForAssign] = useState([]);

  useEffect(() => {
    fetchListUser();
  }, []);

  useEffect(() => {
    modifyListQuiz();
  }, [listQuiz]);

  let fetchListUser = async () => {
    let res = await getAllUsers();
    if (res?.EC === 0) {
      let tmp = res.DT.map((item) => ({
        value: item.id,
        label: `${item.username} - ${item.email}`,
      }));
      setListAllUsers(tmp);
    }
  };
  const modifyListQuiz = () => {
    let tmp = listQuiz.map((item) => ({
      value: item.id,
      label: `${item.id} - ${item.description}`,
    }));
    setListQuizForAssign(tmp);
  };

  const handleAssign = async () => {
    if (!quizSelected || !userSelected) {
      toast.warn("Missing parameter", { closeOnClick: true });
      return;
    }
    let res = await postAssignQuizToUser(quizSelected, userSelected);
    if (res?.EC === 0) {
      toast.success(res?.EM ?? "Succeeded", { closeOnClick: true });
      setQuizSelected("");
      setUserSelected("");
    }
  };
  return (
    <>
      <Row>
        {/* Choose quiz section */}
        <Form.Group as={Col} md="6">
          <Form.Label>Choose quiz</Form.Label>
          <Form.Select
            value={quizSelected}
            onChange={(e) => setQuizSelected(+e.target.value)}
          >
            <option value={""} disabled hidden>
              Choose quiz...
            </option>
            {!_.isEmpty(listQuizForAssign) &&
              listQuizForAssign.map((item) => (
                <option value={item.value} key={item?.value ?? uuidv4()}>
                  {item.label}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        {/* Choose user section */}
        <Form.Group as={Col} md="6">
          <Form.Label>Choose user</Form.Label>
          <Form.Select
            value={userSelected}
            onChange={(e) => setUserSelected(+e.target.value)}
          >
            <option value={""} disabled hidden>
              Choose user...
            </option>
            {!_.isEmpty(listAllUsers) &&
              listAllUsers.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      </Row>
      <Button
        variant="dark"
        className="w-20 mt-3 mx-auto"
        onClick={() => handleAssign()}
      >
        Assign
      </Button>
    </>
  );
};
export default AssignQuizForUser;
