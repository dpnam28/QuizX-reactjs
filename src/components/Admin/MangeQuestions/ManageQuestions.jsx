import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { AiOutlinePicture } from "react-icons/ai";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import _ from "lodash";
import {
  getAllQuizForAdmin,
  postCreateQuestionForQuiz,
  postAnswerForQuestion,
} from "../../../services/apiServices";
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);
  const [openLightBox, setOpenLightBox] = useState(false);
  const [lightBoxImg, setLightBoxImg] = useState("");
  const [listQuiz, setListQuiz] = useState([]);
  const [quizSelected, setQuizSelected] = useState([]);

  useEffect(() => {
    fetchAllQuiz();
  }, []);

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
  const handleAddOrRemoveQuestion = (type, id) => {
    if (!id) return;
    switch (type) {
      case "ADD":
        let tmp = {
          id: uuidv4(),
          description: "",
          imageFile: "",
          imageName: "",
          answers: [
            {
              id: uuidv4(),
              description: "",
              isCorrect: false,
            },
          ],
        };
        setQuestions([...questions, tmp]);
        break;
      case "REMOVE":
        let cloneQuestions = _.cloneDeep(questions);
        cloneQuestions = cloneQuestions.filter((item) => {
          return item.id !== id;
        });
        setQuestions(cloneQuestions);
        break;
      default:
        break;
    }
  };
  const handleAddOrRemoveAnswer = (type, quesId, ansid) => {
    let cloneQuestions = _.cloneDeep(questions);
    let index = cloneQuestions.findIndex((item) => item.id === quesId);
    if (index === -1) {
      console.log("not found index");
      return;
    }
    switch (type) {
      case "ADD":
        let tmp = {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        };
        cloneQuestions[index].answers.push(tmp);
        setQuestions(cloneQuestions);
        break;
      case "REMOVE":
        cloneQuestions[index].answers = cloneQuestions[index].answers.filter(
          (item) => item.id !== ansid
        );
        setQuestions(cloneQuestions);
        break;
      default:
        break;
    }
  };
  const handleChangeInput = (type, quesId, ansId, value) => {
    let cloneQuestions = _.cloneDeep(questions);
    let index = cloneQuestions.findIndex((item) => item.id === quesId);
    if (index === -1) {
      console.log("not found index");
      return;
    }
    switch (type) {
      case "QUESTION":
        cloneQuestions[index].description = value;
        setQuestions(cloneQuestions);
        break;
      case "CHECK":
        cloneQuestions[index].answers = cloneQuestions[index].answers.map(
          (item) => {
            if (item.id === ansId) {
              item.isCorrect = value;
            }
            return item;
          }
        );
        setQuestions(cloneQuestions);
        break;
      case "ANSWER":
        cloneQuestions[index].answers = cloneQuestions[index].answers.map(
          (item) => {
            if (item.id === ansId) {
              item.description = value;
            }
            return item;
          }
        );
        setQuestions(cloneQuestions);
        break;

      default:
        break;
    }
  };
  const handleChangeFileImg = (quesId, img) => {
    let cloneQuestions = _.cloneDeep(questions);
    let index = cloneQuestions.findIndex((item) => item.id === quesId);
    if (index === -1) {
      console.log("not found index");
      return;
    }
    cloneQuestions[index].imageFile = img;
    cloneQuestions[index].imageName = img.name;
    setQuestions(cloneQuestions);
  };
  const handleSelectQuiz = (id) => {
    let tmp = listQuiz.find((item) => item.value === id);
    setQuizSelected(tmp);
  };
  const handleSaveQuestion = async () => {
    if (!quizSelected.value) {
      toast.warn("Missing quiz value", { closeOnClick: true });
      return;
    }
    await Promise.all(
      questions.map(async (ques) => {
        const tmp = await postCreateQuestionForQuiz(
          +quizSelected.value,
          ques.description,
          ques.imageFile
        );
        await Promise.all(
          ques.answers.map(async (ans) => {
            await postAnswerForQuestion(
              ans.description,
              ans.isCorrect,
              tmp.DT.id
            );
          })
        );
      })
    );
  };
  return (
    <>
      <div className="text-center sm:text-4xl text-2xl text-black font-black my-10">
        Questions management
      </div>

      <div className="container mx-auto w-[80%] max-w-200 mb-15">
        {/* Quiz section */}
        <Form.Label>Choose quiz</Form.Label>
        <Form.Select
          aria-label="Floating label select example"
          value={quizSelected.value}
          onChange={(e) => handleSelectQuiz(+e.target.value)}
        >
          <option value={null}>Choose quiz...</option>
          {!_.isEmpty(listQuiz) &&
            listQuiz.map((item) => (
              <option value={item?.value ?? null} key={item.value}>
                {item?.label ?? ""}
              </option>
            ))}
        </Form.Select>

        {/* Question section */}
        {!_.isEmpty(questions) &&
          questions.map((ques, index) => (
            <div className="" key={ques.id}>
              <Row className="my-3 items-center">
                <Form.Label>Question {index + 1}</Form.Label>
                <Form.Group as={Col} md="6">
                  <Form.Control
                    type="text"
                    value={ques.description}
                    onChange={(e) => {
                      handleChangeInput(
                        "QUESTION",
                        ques.id,
                        null,
                        e.target.value
                      );
                    }}
                  />
                </Form.Group>
                <Form.Group className="mt-3 relative flex" as={Col} md="6">
                  <span>
                    <AiOutlinePicture
                      className="text-blue-500 text-[27px] mr-2 cursor-pointer"
                      onClick={() => {
                        setOpenLightBox(true);
                        setLightBoxImg(
                          ques.imageFile
                            ? URL.createObjectURL(ques.imageFile)
                            : ""
                        );
                      }}
                    />
                  </span>
                  <Form.Label
                    className="flex cursor-pointer mr-10"
                    htmlFor={ques.id}
                  >
                    <span className="max-w-30">
                      {ques.imageName ? ques.imageName : "0 file is uploaded"}
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    hidden
                    id={ques.id}
                    onChange={(e) =>
                      handleChangeFileImg(ques.id, e.target?.files[0] ?? "")
                    }
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => handleAddOrRemoveQuestion("ADD", ques.id)}
                  >
                    <CiSquarePlus className="text-green-500 text-[27px] ml-2" />
                  </span>
                  {questions.length > 1 && (
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        handleAddOrRemoveQuestion("REMOVE", ques.id)
                      }
                    >
                      <CiSquareMinus className="text-red-500 text-[27px] ml-2" />
                    </span>
                  )}
                </Form.Group>
              </Row>

              {/* anwser section */}
              <Row className="my-5">
                {!_.isEmpty(ques.answers) &&
                  ques.answers.map((ans, index) => (
                    <InputGroup className="mb-3" key={ans.id}>
                      <InputGroup.Checkbox
                        aria-label="Checkbox for following text input"
                        checked={ans.isCorrect}
                        onChange={(e) =>
                          handleChangeInput(
                            "CHECK",
                            ques.id,
                            ans.id,
                            e.target.checked
                          )
                        }
                      />
                      <FloatingLabel label={"Answer " + (index + 1)}>
                        <Form.Control
                          type="text"
                          value={ans.description}
                          onChange={(e) => {
                            handleChangeInput(
                              "ANSWER",
                              ques.id,
                              ans.id,
                              e.target.value
                            );
                          }}
                        />
                      </FloatingLabel>
                      <CiSquarePlus
                        onClick={() =>
                          handleAddOrRemoveAnswer("ADD", ques.id, ans.id)
                        }
                        className="text-green-500 text-[27px] mx-3 mt-4 cursor-pointer"
                      />
                      {ques.answers.length > 1 && (
                        <CiSquareMinus
                          onClick={() =>
                            handleAddOrRemoveAnswer("REMOVE", ques.id, ans.id)
                          }
                          className="text-red-500 text-[27px] mt-4 cursor-pointer"
                        />
                      )}
                    </InputGroup>
                  ))}
              </Row>
            </div>
          ))}

        <Button
          variant="dark"
          onClick={handleSaveQuestion}
          className="w-40 pb-2"
        >
          Save
        </Button>
      </div>
      {openLightBox && (
        <Lightbox
          image={lightBoxImg ? lightBoxImg : "image"}
          title={"image"}
          onClose={() => {
            setOpenLightBox(false);
          }}
        ></Lightbox>
      )}
    </>
  );
};
export default ManageQuestions;
