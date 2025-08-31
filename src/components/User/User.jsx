import ListQuiz from "./ListQuiz.jsx";
import { useTranslation } from "react-i18next";

const User = (props) => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="text-center text-5xl text-black font-black mt-8">
        {t("user.title")}
      </div>
      <div className="mx-[10%] my-15">
        <ListQuiz />
      </div>
    </div>
  );
};

export default User;
