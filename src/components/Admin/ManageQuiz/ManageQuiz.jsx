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
import ModifyQuestionsAndAnswer from "./ModifyQuesionsAndAnswer";
import { useTranslation } from "react-i18next";

const ManageQuiz = () => {
  const { t } = useTranslation();
  const levelOptions = [
    { value: "EASY", label: t("admin.quiz-management.easy") },
    { value: "MEDIUM", label: t("admin.quiz-management.medium") },
    { value: "HARD", label: t("admin.quiz-management.hard") },
  ];
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
        {t("admin.quiz-management.title")}
      </div>
      <div className="container mx-auto mt-10">
        <Accordion>
          {/* Add Quiz */}
          <Accordion.Item
            eventKey="0"
            className="mx-auto w-[80%] max-w-270 relative"
          >
            <Accordion.Header>
              <span className="capitalize">
                {t("admin.quiz-management.add-new-quiz")}
              </span>
            </Accordion.Header>
            <Accordion.Body>
              <div>
                {/* Create form */}
                <fieldset className="border rounded-lg p-5">
                  <legend className="float-none w-auto px-3 text-xl">
                    {t("admin.quiz-management.add-new-quiz")}
                  </legend>
                  <FloatingLabel
                    controlId="floatingInput"
                    label={t("admin.quiz-management.quiz-name")}
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
                    label={t("admin.quiz-management.description")}
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
                    label={t("admin.quiz-management.choose-difficulty")}
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
                      <span className="text-xl font-black">+</span>{" "}
                      {t("admin.quiz-management.choose-image")}
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
                    {t("admin.quiz-management.create")}
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

          {/* Modify Ques and Ans */}
          <Accordion.Item
            eventKey="2"
            className="mx-auto w-[80%] max-w-270 relative"
          >
            <Accordion.Header>
              <span className="capitalize">
                {t("admin.quiz-management.modify-qa")}
              </span>
            </Accordion.Header>
            <Accordion.Body>
              <ModifyQuestionsAndAnswer />
            </Accordion.Body>
          </Accordion.Item>

          {/* Assign quiz for user */}
          <Accordion.Item
            eventKey="1"
            className="mx-auto w-[80%] max-w-270 relative"
          >
            <Accordion.Header>
              <span className="capitalize">
                {t("admin.quiz-management.assign-quiz-for-user")}
              </span>
            </Accordion.Header>
            <Accordion.Body>
              <AssignQuizForUser
                listQuiz={listQuiz}
                setListQuiz={setListQuiz}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default ManageQuiz;
