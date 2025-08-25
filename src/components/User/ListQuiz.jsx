import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getQuizByUser } from "../../services/apiServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getQuiz();
  }, []);

  const getQuiz = async () => {
    let res = await getQuizByUser();
    if (res?.EC === 0) {
      setListQuiz(res?.DT ?? []);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center lg:gap-15 md:gap-8 gap-5">
      {listQuiz.length > 0 ? (
        listQuiz.map((quiz) => (
          <Card className="md:w-70 w-50 h-90 z-0 cursor-pointer" key={quiz.id}>
            <Card.Img
              variant="top"
              src={`data:image/jpeg;base64,${quiz.image}`}
              className="object-contain md:w-70 w-50 h-50"
            />
            <Card.Body>
              <Card.Title>{`Quiz ${quiz.id}`}</Card.Title>
              <Card.Text className="text-sm">
                {quiz?.description ?? ""}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  navigate(`/quiz/${quiz.id}`);
                }}
              >
                Start
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="absolute text-xl font-bold top-1/3">
          You don't have any quiz in database
        </div>
      )}
    </div>
  );
};

export default ListQuiz;
