import { useTranslation } from "react-i18next";

const ChangeLanguage = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div
      className="font-bold cursor-pointer"
      onClick={(e) => {
        e.target.innerHTML === "EN"
          ? changeLanguage("vi")
          : changeLanguage("en");
        e.target.innerHTML = e.target.innerHTML === "EN" ? "VI" : "EN";
      }}
    >
      VN
    </div>
  );
};

export default ChangeLanguage;
