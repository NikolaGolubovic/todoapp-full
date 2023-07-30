import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");

  async function signIn(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      });
      const data = await response.data;
      console.log(data);
      localStorage.setItem("todo-token", JSON.stringify(data.token));
      localStorage.setItem("todo-username", JSON.stringify(data.username));
      localStorage.setItem("todo-refresh", JSON.stringify(data.refreshToken));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          throw new Error("Invalid credentials");
        } else {
          throw new Error(error.response?.data);
        }
      } else {
        console.log(error);
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
