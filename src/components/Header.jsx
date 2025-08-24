import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { HomeSidebar } from "./HomeSideBar";
import { useSelector } from "react-redux";
import { useState } from "react";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  const [openHomeSideBar, setOpenHomeSideBar] = useState(true);
  const [openDropDown, setOpenDropDown] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("login");
  };
  return (
    <>
      <Navbar expand="sm" className="sticky top-0 bg-white px-[7%]">
        {openHomeSideBar && <HomeSidebar />}
        <Link
          to="/"
          className="nav-link text-3xl font-bold pl-6 text-transparent bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text"
        >
          QuizX
        </Link>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="m-0"
          onClick={() => {
            setOpenHomeSideBar(!openHomeSideBar);
          }}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="me-auto"></Nav>
          {!isAuthenticated ? (
            <Nav>
              <button
                className="hover:text-blue-400 font-bold px-4 text-base"
                onClick={() => handleLogin()}
              >
                Log in
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                className="bg-gray-900 text-white font-bold rounded-xl text-base px-3 py-1.5 hover:bg-gray-600 pt-1"
              >
                Sign up
              </button>
            </Nav>
          ) : (
            <>
              <div className="relative cursor-pointer text-center group">
                <div
                  onClick={() => setOpenDropDown(!openDropDown)}
                  className={
                    !openHomeSideBar
                      ? `border rounded-2xl w-[30%] m-auto text-white bg-black font-semibold text-md p-1`
                      : ""
                  }
                >
                  Setting
                  <IoMdArrowDropdown
                    className={`absolute -right-5 top-2 ${
                      openDropDown ? "rotate-180" : ""
                    } transition-all duration-500 sm:inline hidden`}
                  />
                </div>

                {openDropDown && (
                  <div
                    className={`bg-white absolute border rounded-md flex-col mt-3 flex ${
                      !openHomeSideBar ? "right-[32.5%]" : "-left-16"
                    }`}
                  >
                    <Link
                      to="login"
                      className="px-8 py-2 text-black no-underline hover:bg-gray-200"
                    >
                      Log out
                    </Link>
                    <div className="border border-gray-200"></div>
                    <a
                      href=""
                      className="px-8 py-2 text-black no-underline hover:bg-gray-200"
                    >
                      Information
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
