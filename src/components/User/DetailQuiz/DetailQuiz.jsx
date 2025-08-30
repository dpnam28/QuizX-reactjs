import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionsByQuizId } from "../../../services/apiServices";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { postSubmitAnswer } from "../../../services/apiServices";
import ModalResult from "../Modal/ModalResult";
import Timmer from "./Timmer";
const DetailQuiz = () => {
  const param = useParams();
  const navigate = useNavigate();
  const quizId = param.id;

  const [listQuestions, setListQuestions] = useState([]);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [showModalResult, setShowModalResult] = useState(false);
  const [dataForModalResult, setDataForModalResult] = useState([]);
  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    let res = await getQuestionsByQuizId(quizId);
    if (res?.EC === 0) {
      let data = res?.DT ?? "";
      data = _.chain(data)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index == 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSlected = false;
            answers.push(item.answers);
          });
          return {
            questionId: key,
            answers,
            questionDescription,
            image,
          };
        })
        .value();
      setListQuestions(data);
    }
  };

  const prevBtn = () => {
    if (indexQuestion <= 0) {
      return;
    }
    setIndexQuestion(indexQuestion - 1);
  };
  const nextBtn = () => {
    if (indexQuestion >= listQuestions.length - 1) {
      return;
    }
    setIndexQuestion(indexQuestion + 1);
  };
  const finishBtn = async () => {
    if (listQuestions && listQuestions.length > 0) {
      let data = {
        quizId: +quizId,
        answers: [],
      };

      data.answers = listQuestions.map((item) => {
        let tmp = [];
        item.answers?.forEach((ans) => {
          if (ans.isSlected) {
            tmp.push(ans.id);
          }
        });
        return {
          questionId: +item.questionId,
          userAnswerId: tmp,
        };
      });

      let res = await postSubmitAnswer(data);
      if (res?.EC === 0) {
        setShowModalResult(true);
        setDataForModalResult(res.DT);
      }
    } else {
      return;
    }
  };

  const handleCheckBtn = (answerId, questionId) => {
    let cloneListQuestions = _.cloneDeep(listQuestions);
    let question = cloneListQuestions.find(
      (ques) => +ques.questionId === +questionId
    );
    if (question) {
      question.answers = question.answers.map((ans) => {
        if (+ans.id === +answerId) {
          ans.isSlected = !ans.isSlected;
        }
        return ans;
      });
      setListQuestions(cloneListQuestions);
    } else {
      return;
    }
  };
  return (
    <>
      {/* go back */}
      <div className="mt-2">
        <div
          className="float-left ml-2 text-md absolute top-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-xl font-black">&lt;&lt;</span>
          <span className="sm:inline hidden">Back to homepage</span>
        </div>
      </div>

      <div className="container text-center lg:w-[90%] mx-auto mt-10 flex gap-3">
        {/* left content */}
        {listQuestions.length > 0 && listQuestions[indexQuestion] && (
          <div className="w-[70%] flex flex-col">
            <h1 className="">Question {indexQuestion + 1}</h1>

            {/* question section */}
            <div className="flex flex-col mt-5">
              {listQuestions[indexQuestion]?.image && (
                <img
                  src={`data:image/jpeg;base64,${listQuestions[indexQuestion].image}`}
                  alt=""
                  width={"500px"}
                  height={"300px"}
                  className="object-contain m-auto"
                />
              )}

              <div className="mt-5">
                <div className="text-xl">
                  {listQuestions[indexQuestion]?.questionDescription ?? ""}
                </div>
                {/* answers */}
                <div className="flex flex-col lg:ml-20 text-left">
                  {listQuestions[indexQuestion]?.answers?.length > 0 &&
                    listQuestions[indexQuestion]?.answers.map((item) => (
                      <div key={item.id}>
                        <input
                          type="checkbox"
                          // name="answer"
                          checked={item?.isSlected ?? false}
                          onChange={() =>
                            handleCheckBtn(
                              item.id,
                              +listQuestions[indexQuestion].questionId
                            )
                          }
                        />
                        <span className="text-lg ml-3">
                          {item?.description ?? ""}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* button */}
              <div className="flex gap-5 justify-center mt-5">
                <button
                  className="bg-gray-500 px-5 py-2  disabled:bg-gray-200 text-white text-md font-semibold rounded-md"
                  onClick={() => prevBtn()}
                  disabled={indexQuestion <= 0 ? true : false}
                >
                  Prev
                </button>
                <button
                  className="bg-blue-500 px-5 py-2 disabled:bg-blue-200 text-white text-md font-semibold rounded-md"
                  onClick={() => nextBtn()}
                  disabled={
                    indexQuestion >= listQuestions.length - 1 ? true : false
                  }
                >
                  Next
                </button>
                <button
                  className="bg-amber-500 px-5 py-2 disabled:bg-amber-200 text-white text-md font-semibold rounded-md"
                  onClick={() => finishBtn()}
                  // disabled={
                  //   indexQuestion >= listQuestions.length - 1 ? false : true
                  // }
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* right content */}
        <div
          className="border border-gray-300 rounded-xl w-[30%] h-130
        "
        >
          <Timmer listQuestions={listQuestions} finishQuiz={finishBtn} />
        </div>
      </div>

      <ModalResult
        show={showModalResult}
        setShow={setShowModalResult}
        dataResult={dataForModalResult}
      />
    </>
  );
};

export default DetailQuiz;
