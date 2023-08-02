import { useNavigate } from "react-router-dom";
import { refreshTokenLS, tokenLS, usernameLS } from "../constants/tokenNames";
import { axiosApiInstance } from "../interceptor/tokenInterceptor";
import { setToken } from "../utils/tokenEncription";
import axios, { AxiosError } from "axios";
import { FC } from "react";

type PropsTodos = {
  setUserOn: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const Homepage: FC<PropsTodos> = ({ setUserOn }) => {
  const navigate = useNavigate();
  async function signIn() {
    try {
      const response = await axiosApiInstance.post("/api/auth/login", {
        username: "nikola",
        password: "misterija",
      });
      const data = await response.data;
      setToken(data.token, tokenLS);
      localStorage.setItem(usernameLS, JSON.stringify(data.username));
      setToken(data.refreshToken, refreshTokenLS);
      setUserOn(true);
      navigate("/todos");
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
        console.error(error);
      }
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Todo App</h1>
      <p className="text-lg text-center mb-8">
        This is a simple todo app that helps you keep track of your tasks and stay organized. <br /> Click on Get Started button
        to sign in as a user and start using the app.
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => signIn()}>
        Get Started
      </button>
    </div>
  );
};

export default Homepage;
