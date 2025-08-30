import Video from "../assets/video/video1.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

export const HomePage = (props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return (
    <>
      <div className="container flex mt-10 w-[70%] md:w-[80%] md:pl-0 pl-10">
        <div className="md:w-[50%] md:pl-5 flex flex-col justify-center align-middle sm:mr-10">
          <p className="uppercase text-purple-600 text-sm font-semibold">
            {t("homepage.title1")}
          </p>
          <div className="sm:text-4xl sm:font-normal md:w-[80%] md:text-5xl md:leading-14 text-xl font-semibold">
            {t("homepage.title2")}
          </div>
          <div className="mt-3 text-lg leading-6 md:font-normal md:text-xl md:leading-8">
            {t("homepage.text")}
          </div>
          {isAuthenticated ? (
            <button
              onClick={() => navigate("user")}
              className="mt-5 bg-gray-900 w-40 text-white px-6 py-3 rounded-2xl font-bold text-sm"
            >
              {t("homepage.do-quiz-now")}
            </button>
          ) : (
            <button
              onClick={() => navigate("signup")}
              className="mt-5 bg-gray-900 w-40 text-white px-6 py-3 rounded-2xl font-bold text-sm"
            >
              {t("homepage.sign-up")}
            </button>
          )}
        </div>
        <video
          loop
          autoPlay
          muted
          className="size-50 m-auto lg:size-100 sm:size-70 hidden sm:block"
        >
          <source src={Video} type="video/mp4" />
        </video>
      </div>
    </>
  );
};
