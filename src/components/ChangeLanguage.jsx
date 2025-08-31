import { useTranslation } from "react-i18next";
import { commitChangeLanguage } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const ChangeLanguage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.user.language);

  const changeLanguage = (lng) => {
    dispatch(commitChangeLanguage(lng));
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    changeLanguage(language);
  }, []);

  return (
    <div
      className="font-bold cursor-pointer uppercase"
      onClick={() => {
        language === "en" ? changeLanguage("vi") : changeLanguage("en");
      }}
    >
      {language}
    </div>
  );
};

export default ChangeLanguage;
