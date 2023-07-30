import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Todos from "./components/Todos";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import { ToastContainer, toast } from "react-toastify";

function App() {
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
      <Navigation />
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
