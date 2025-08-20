import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <Navbar expand="sm" className="sticky top-0 z-99 bg-white px-[5%]">
        <Link
          to="/"
          className="nav-link text-3xl font-bold px-5 text-transparent bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text"
        >
          QuizX
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="me-auto">
            <NavLink to="/user" className="nav-link font-medium text-lg">
              User
            </NavLink>
            <NavLink to="/admin" className="nav-link font-medium text-lg">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            <button className="hover:text-blue-400 font-bold px-4 text-base">
              Log in
            </button>
            <button className="bg-gray-900 text-white font-bold rounded-xl text-base px-3 py-1.5 hover:bg-gray-600">
              Sign up
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
