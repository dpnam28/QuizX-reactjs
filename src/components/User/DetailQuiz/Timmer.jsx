import _ from "lodash";
import { useEffect, useState } from "react";

const Timmer = ({ listQuestions, finishQuiz, setIndexQuestion }) => {
  const [time, setTime] = useState(10);
  // useEffect(() => {
  //   if (time === 0) {
  //     finishQuiz();
  //     return;
  //   }
  //   let timeInterval = setInterval(() => {
  //     setTime(time - 1);
  //   }, 1000);
  //   return () => clearInterval(timeInterval);
  // }, [time]);

  Number.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
  };

  const checkSlectedAnswer = (item) => {
    if (item?.answers) {
      let isCheck = item.answers.some((ans) => ans.isSlected);
      if (isCheck) {
        return "bg-gray-400/50";
      } else return "";
    }
  };

  return (
    <div className="flex flex-col">
      {/* Timmer */}
      <div className="py-5 border-b-1 border-dashed mx-4">
        {time.toHHMMSS()}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 place-items-center mt-5 mx-3">
        {!_.isEmpty(listQuestions) &&
          listQuestions.map((item, index) => {
            return (
              <div
                onClick={(e) => {
                  setIndexQuestion(index);
                  e.target.classList.toggle(
                    "border-red-500",
                    !checkSlectedAnswer(item)
                  );
                  e.target.classList.toggle(
                    "bg-red-500/50",
                    !checkSlectedAnswer(item)
                  );
                }}
                key={item?.quesionId ?? index}
                className={`${checkSlectedAnswer(
                  item
                )} border rounded-full size-10 flex justify-center items-center hover:scale-105 duration-300 transition-all cursor-pointer hover:border-gray-500`}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Timmer;
