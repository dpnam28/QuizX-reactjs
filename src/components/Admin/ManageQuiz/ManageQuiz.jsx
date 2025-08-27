import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import {
  postCreateQuiz,
  getAllQuizForAdmin,
} from "../../../services/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import AssignQuizForUser from "./AssignQuizForUser";

const levelOptions = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [desctiption, setDesctiption] = useState("");
  const [level, setLevel] = useState("EASY");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchAllQuiz();
  }, []);

  const fetchAllQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res?.EC === 0) {
      setListQuiz(res?.DT ?? []);
    }
  };
  const handleChangeImage = (event) => {
    if (event.target?.files?.[0]) {
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };
  const handleCreateQuiz = async () => {
    if (quizName && desctiption && level && image) {
      let res = await postCreateQuiz(desctiption, quizName, level, image);
      if (res?.EC === 0) {
        setQuizName("");
        setDesctiption("");
        setLevel("EASY");
        setImage("");
        setPreviewImg("");
        fetchAllQuiz();
        toast.success(res?.EM ?? "Succeeded", {
          closeOnClick: true,
        });
      }
    } else {
      toast.warn("Parameters required", {
        closeOnClick: true,
      });
    }
  };
  return (
    <>
      <div className="text-center sm:text-5xl text-2xl mt-5 text-black font-black">
        Manage Quiz
      </div>
      <div className="container mx-auto mt-10">
        <Accordion>
          <Accordion.Item
            eventKey="0"
            className="mx-auto w-[80%] max-w-270 relative"
          >
            <Accordion.Header>Add new quiz</Accordion.Header>
            <Accordion.Body>
              <div>
                {/* Create form */}
                <fieldset className="border rounded-lg p-5">
                  <legend className="float-none w-auto px-3 text-xl">
                    Add new quiz
                  </legend>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Quiz name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Description"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      value={desctiption}
                      onChange={(e) => setDesctiption(e.target.value)}
                    />
                  </FloatingLabel>

                  {/* choose level */}
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Choose difficulty"
                  >
                    <Form.Select
                      aria-label="Default select example"
                      className="mt-3"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    >
                      {levelOptions.length > 0 &&
                        levelOptions.map((item) => (
                          <option value={item.value} key={item.value}>
                            {item.label}
                          </option>
                        ))}
                    </Form.Select>
                  </FloatingLabel>

                  {/* choose image */}
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
                      className={`w-[70%] border border-dotted h-40 m-auto bg-contain bg-no-repeat bg-center`}
                      style={{ background: `url(${previewImg})` }}
                    ></div>
                  )}

                  {/* button create quiz */}
                  <Button
                    variant="dark"
                    className="w-40 pb-2 mt-3"
                    onClick={() => handleCreateQuiz()}
                  >
                    Create
                  </Button>
                </fieldset>
              </div>
              {/* table quiz */}
              <div className="text-center mt-8">
                <TableQuiz
                  listQuiz={listQuiz}
                  setListQuiz={setListQuiz}
                  fetchAllQuiz={fetchAllQuiz}
                />
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item
            eventKey="1"
            className="mx-auto w-[80%] max-w-270 relative"
          >
            <Accordion.Header>Assign quiz for user</Accordion.Header>
            <Accordion.Body>
              <AssignQuizForUser />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default ManageQuiz;
