import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postLogIn } from "../../services/apiServices";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSeePassword = (e) => {
    e.stopPropagation();
    setIsShowPassword(!isShowPassword);
  };

  const handleLoginBtn = async () => {
    if (validateEmail(email)) {
      if (password) {
        let res = await postLogIn(email, password);
        if (res?.EC === 0) {
          toast.success(res?.EM ?? "Succeeded", {
            closeOnClick: true,
          });
          navigate("/");
        } else {
          toast.warn(res?.EM ?? "Error form server", {
            closeOnClick: true,
          });
        }
      } else {
        toast.warn("Missing password", {
          closeOnClick: true,
        });
      }
    } else {
      toast.warn("Invalid email", {
        closeOnClick: true,
      });
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center">
        {/* upper content */}
        <div className="mt-2">
          <div
            className="float-left ml-2 text-md absolute top-1 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-xl font-black">&lt;&lt;</span>{" "}
            <span className="sm:inline hidden">Back to homepage</span>
          </div>
          <div className="float-right mr-3 text-md">
            <span className="sm:inline hidden">Don't have an account yet?</span>
            <span
              className="border border-gray-900 p-1 px-2 mx-2 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
            <a href="" className="text-black" onClick={() => navigate("/help")}>
              Need help?
            </a>
          </div>
        </div>
        {/* form */}
        <div className="container mx-auto flex flex-col justify-between items-center">
          {/* heading */}
          <div className="mx-auto text-center">
            <Link
              to="/"
              className="mt-12 sm:mb-8 mb-5 nav-link text-5xl font-bold text-transparent bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text"
            >
              QuizX
            </Link>
            <p className="text-xl">Hello, who's this?</p>
          </div>

          <div className="w-[60%] max-w-[360px] mt-4">
            <form action="" className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-lg my-2">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-[100%] border rounded-sm p-3 text-md"
                  placeholder="username@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col relative">
                <label htmlFor="password" className="text-lg my-2">
                  Password
                </label>
                <input
                  type={isShowPassword ? "text" : "password"}
                  id="password"
                  className="w-[100%] border rounded-sm p-3 text-md"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isShowPassword ? (
                  <LuEyeClosed
                    className="absolute right-4 bottom-1/7 cursor-pointer text-xl"
                    onClick={(e) => {
                      handleSeePassword(e);
                    }}
                  />
                ) : (
                  <LuEye
                    className="absolute right-4 bottom-1/7 cursor-pointer text-xl"
                    onClick={(e) => {
                      handleSeePassword(e);
                    }}
                  />
                )}
              </div>
              <div>
                <a href="" className="text-gray-500">
                  Forgot password?
                </a>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => handleLoginBtn()}
                  className="bg-black text-white text-center text-xl font-bold w-[100%] rounded-md py-2"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
