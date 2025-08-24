import ListQuiz from "./ListQuiz.jsx";

const User = (props) => {
  return (
    <div className="container">
      <div className="text-center text-5xl text-black font-black">
        User page
      </div>
      <div className="mx-[10%] mt-5">
        <ListQuiz />
      </div>
    </div>
  );
};

export default User;
