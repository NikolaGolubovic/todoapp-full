import { NavLink } from "react-router-dom";
import { FC } from "react";

type Props = {
  userOn: boolean | undefined;
  setUserOn: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const Navigation: FC<Props> = ({ userOn, setUserOn }) => {
  function logout() {
    localStorage.clear();
    setUserOn(false);
  }
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
          <NavLink to="/todos" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Todos
          </NavLink>
        </li>
        {!userOn && (
          <li className="ml-10">
            <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Login
            </NavLink>
          </li>
        )}
        {!userOn && (
          <li className="ml-10 mr-10">
            <NavLink to="/register" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Register
            </NavLink>
          </li>
        )}
        {userOn && (
          <li className="ml-10">
            <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={logout}>
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
