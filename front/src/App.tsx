import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
    let notifyFunc: (() => void) | null = null;
    if (type === "success") {
      notifyFunc = () => toast["success"](msg, { position: toast.POSITION.TOP_CENTER });
    }
    if (type === "error") {
      notifyFunc = () => toast["error"](msg, { position: toast.POSITION.TOP_CENTER });
    }
    if (notifyFunc !== null) {
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
        <Route path="/login" element={<SignIn setUserOn={setUserOn} notify={notify} />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
