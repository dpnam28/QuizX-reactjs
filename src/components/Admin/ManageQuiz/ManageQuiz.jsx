import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Button } from "react-bootstrap";
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

  const handleChangeImage = (event) => {
    if (event.target?.files?.[0]) {
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };
  return (
    <>
      <div className="text-center sm:text-5xl text-2xl mt-5 text-black font-black">
        Manage Quiz
      </div>
      <div className="container mx-auto mt-10">
        <div className="mx-auto w-[80%] max-w-200">
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

            <FloatingLabel controlId="floatingTextarea2" label="Description">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                value={desctiption}
                onChange={(e) => setDesctiption(e.target.value)}
              />
            </FloatingLabel>

            {/* choose level */}
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
            <Button variant="dark" className="w-40 pb-2 mt-3">
              Create
            </Button>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default ManageQuiz;
