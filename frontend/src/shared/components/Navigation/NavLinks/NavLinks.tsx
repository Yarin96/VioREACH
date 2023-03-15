import "./NavLinks.css";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

const NavLinks = () => {
  const token = useRouteLoaderData("root");

  return (
    <ul className="nav_links">
      <>
        <li>
          <NavLink to="/">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/about">ABOUT</NavLink>
        </li>
        {token && (
          <>
            <li>
              <NavLink to="/detection">DETECT VIOLENCE</NavLink>
            </li>
            <li>
              <Form action="/logout" method="post">
                <button>LOGOUT</button>
              </Form>
            </li>
          </>
        )}
        {!token && (
          <li>
            <NavLink to="/auth?mode=login">LOGIN</NavLink>
          </li>
        )}
      </>
    </ul>
  );
};

export default NavLinks;
