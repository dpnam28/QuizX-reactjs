import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { HomeSidebar } from "./HomeSideBar";

function Header() {
  return (
    <>
      <HomeSidebar />
      <Navbar expand="sm" className="sticky top-0 bg-white px-[7%]">
        <Link
          to="/"
          className="nav-link text-3xl font-bold pl-6 text-transparent bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text"
        >
          QuizX
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="m-0" />
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="me-auto"></Nav>
          <Nav>
            <button className="hover:text-blue-400 font-bold px-4 text-base">
              Log in
            </button>
            <button className="bg-gray-900 text-white font-bold rounded-xl text-base px-3 py-1.5 hover:bg-gray-600 pt-1">
              Sign up
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
