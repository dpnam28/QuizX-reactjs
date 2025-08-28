import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import ModalDeleteQuiz from "./Modal/ModalDeleteQuiz";
import ModalUpdateQuiz from "./Modal/ModalUpdateQuiz";
import _ from "lodash";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TableQuiz = ({ listQuiz, setListQuiz, fetchAllQuiz }) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [idQuizSelected, setIdQuizSelected] = useState(null);
  const [quizSelected, setquizSelected] = useState([]);

  // useEffect(() => {
  //   fetchAllQuiz();
  // }, []);
  const handleOpenModalDelete = (id) => {
    if (id) {
      setShowModalDelete(true);
      setIdQuizSelected(id);
    } else {
      toast.warn("Error form client");
    }
  };
  const handleOpenModalUpdate = (quiz) => {
    if (quiz) {
      setShowModalUpdate(true);
      setquizSelected(quiz);
    } else {
      toast.warn("Error form client");
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz's name</th>
            <th>Description</th>
            <th>Difficulty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!_.isEmpty(listQuiz) &&
            listQuiz.map((item) => (
              <tr key={item?.id ?? uuidv4()}>
                <td>{item?.id ?? ""}</td>
                <td>{item?.name ?? ""}</td>
                <td>{item?.description ?? ""}</td>
                <td>{item?.difficulty ?? ""}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="font-semibold m-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModalUpdate(item);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="font-semibold px-2.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModalDelete(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <ModalDeleteQuiz
        show={showModalDelete}
        handleClose={() => setShowModalDelete(false)}
        idQuiz={idQuizSelected}
        fetchAllQuiz={fetchAllQuiz}
      />

      <ModalUpdateQuiz
        show={showModalUpdate}
        handleClose={() => setShowModalUpdate(false)}
        quizSelected={quizSelected}
        fetchAllQuiz={fetchAllQuiz}
      />
    </>
  );
};

export default TableQuiz;
