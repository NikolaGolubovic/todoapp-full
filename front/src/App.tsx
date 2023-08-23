import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Todos from "./components/Todos";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [userOn, setUserOn] = useState<boolean>();

  function notify(msg: string, type: string): void {
    if (type === "success") {
      const notifyFunc = () => toast["success"](msg, { position: toast.POSITION.TOP_CENTER });
      notifyFunc();
    }
    if (type === "error") {
      const notifyFunc = () => toast["error"](msg, { position: toast.POSITION.TOP_CENTER });
      notifyFunc();
    }
  }

  return (
    <Router>
      <ToastContainer autoClose={1500} />
      <Navigation userOn={userOn} setUserOn={setUserOn} />
      <Routes>
        <Route path="/" element={<Homepage setUserOn={setUserOn} />} />
        <Route path="/todos" element={<Todos setUserOn={setUserOn} notify={notify} />} />
        <Route path="/login" element={<SignIn setUserOn={setUserOn} />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
