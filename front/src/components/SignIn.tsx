import React, { useState, FC } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { setToken } from "../utils/tokenEncription";
import { tokenLS, refreshTokenLS, usernameLS } from "../constants/tokenNames";
import { useNavigate } from "react-router-dom";

type Props = {
  setUserOn: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  notify: (msg: string, type: string) => void;
};

const SignIn: FC<Props> = ({ setUserOn, notify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signIn(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      const data = await response.data;
      setToken(data.token, tokenLS);
      localStorage.setItem(usernameLS, JSON.stringify(data.username));
      setToken(data.refreshToken, refreshTokenLS);
      setUserOn(true);
      navigate("/");
      notify("Successfully logged in", "success");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          notify(error.response?.data.message, "error");
          throw new Error("Invalid credentials");
        } else {
          notify(error.response?.data.message, "error");
          throw new Error(error.response?.data);
        }
      }
    }
  }
  return (
    <div className="login-page flex flex-col items-center pt-10vh h-screen">
      <form className="login-form flex flex-col space-y-6 px-10">
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <Link
          to="/register"
          onClick={(e) => signIn(e)}
          className="btn-sign bg-pink-500 text-white border-none rounded-md cursor-pointer shadow-md text-decoration-none flex justify-center uppercase"
        >
          login
        </Link>
        <p className="message">
          Not registered? <a href="#">Create an account</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
