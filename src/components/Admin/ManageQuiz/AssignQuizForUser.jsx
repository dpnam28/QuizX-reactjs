import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import { getAllQuizForAdmin, getAllUsers } from "../../../services/apiServices";
import { useState, useEffect } from "react";
import _ from "lodash";
const AssignQuizForUser = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [listAllUsers, setListAllUsers] = useState([]);
  const [quizSelected, setQuizSelected] = useState("");
  const [userSelected, setUserSelected] = useState("");

  useEffect(() => {
    fetchAllQuiz();
    fetchListUser();
  }, []);

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
  const fetchAllQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res?.EC === 0) {
      let tmp = res.DT.map((item) => ({
        value: item.id,
        label: `${item.id} - ${item.description}`,
      }));
      setListQuiz(tmp);
    }
  };
  return (
    <>
      <Row>
        <Form.Group as={Col} md="6">
          <Form.Label>Choose quiz</Form.Label>
          <Form.Select
            value={quizSelected}
            onChange={(e) => setQuizSelected(+e.target.value)}
          >
            <option value={""} disabled hidden>
              Choose quiz...
            </option>
            {!_.isEmpty(listQuiz) &&
              listQuiz.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
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
      <Button variant="dark" className="w-20 mt-3 mx-auto">
        Add
      </Button>
    </>
  );
};
export default AssignQuizForUser;
