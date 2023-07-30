import { NavLink } from "react-router-dom";

const Navigation = () => {
  const activeStyle = {
    textDecoration: "underline",
  };
  return (
    <nav>
      <ul className="flex justify-end px-30 list-none">
        <li className="ml-10">
          <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Home
          </NavLink>
        </li>
        <li className="ml-10">
          <NavLink to="login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Login
          </NavLink>
        </li>
        <li className="ml-10 mr-10">
          <NavLink to="register" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
