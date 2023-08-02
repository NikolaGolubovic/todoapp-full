import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Todos from "./components/Todos";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";
import Homepage from "./components/Homepage";

function App() {
  const [userOn, setUserOn] = useState<boolean>();
  return (
    <Router>
      <ToastContainer autoClose={1500} />
      <Navigation userOn={userOn} setUserOn={setUserOn} />
      <Routes>
        <Route path="/" element={<Homepage setUserOn={setUserOn} />} />
        <Route path="/todos" element={<Todos setUserOn={setUserOn} />} />
        <Route path="/login" element={<SignIn setUserOn={setUserOn} />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
