import axios, { AxiosError } from "axios";
import React, { FC, useState } from "react";
type PropsSignUp = {
  notify: (msg: string, type: string) => void;
};

const SignUp: FC<PropsSignUp> = ({ notify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  async function signUp(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    try {
      const response = await axios.post("api/auth/register", {
        username,
        password,
        email,
      });
      const data = await response.data;
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          notify("You don't have persmission for that", "error");
        } else {
          notify(error.message, "error");
        }
      }
    }
  }
  return (
    <div className="login-page">
      <form className="login-form">
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="email address" onChange={(e) => setEmail(e.target.value)} />
        <a onClick={(e) => signUp(e)} className="btn-sign">
          create
        </a>
        <p className="message">
          Already registered? <a href="#">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
