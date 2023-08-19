import React, { useState } from "react";
import { axiosApiInstance } from "../interceptor/tokenInterceptor";
import { useClickAway } from "react-use";
import { FaWindowClose } from "react-icons/fa";
import { getToken } from "../utils/tokenEncription";
import { tokenLS, usernameLS } from "../constants/tokenNames";

interface ModalProps {
  togglePortal: () => void;
  portalOpened: boolean;
  setPortalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  todos: { todo: string; completed: boolean; type: "easy" | "hard" }[] | undefined;
  setTodos: React.Dispatch<
    React.SetStateAction<
      | {
          todo: string;
          completed: boolean;
          type: "easy" | "hard";
        }[]
      | undefined
    >
  >;
  modalRef: React.RefObject<HTMLDivElement>;
}

const Modal: React.FC<ModalProps> = ({ togglePortal, portalOpened, todos, setTodos, modalRef }) => {
  const [todo, setTodo] = useState("");
  const [completed, setCompleted] = useState(false);
  const [type, setType] = useState<"easy" | "hard">("easy");

  useClickAway(modalRef, () => {
    if (portalOpened) {
      togglePortal();
    }
  });

  async function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const token = getToken(tokenLS);
    try {
      const response = await axiosApiInstance.post(
        "/api/todos",
        {
          todo,
          completed,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            application: "application/json",
          },
        }
      );
      if (response.status === 201) {
        console.log("success", "response");
        if (todos === undefined) return console.log("todos is undefined");
        setTodos([...todos, { todo, completed, type }]);
      }
      return "success";
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className={`modal ${portalOpened ? "show" : "hide"}`} ref={modalRef}>
      <div className="modal-content">
        <h1>Create Todo</h1>
        <form className="todo-form todo-create">
          <textarea name="" id="" value={todo} onChange={(e) => setTodo(e.target.value)}></textarea>
          <div className="switch-container">
            <label className="switch">
              <input
                type="checkbox"
                onClick={() => {
                  setCompleted(!completed);
                }}
              />
              <span className="slider round"></span>
            </label>
            <p>{!completed ? "Not Completed" : "Finished"}</p>
          </div>
          <div className="switch-container">
            <label className="switch">
              <input
                type="checkbox"
                onClick={() => {
                  const switchType = type === "easy" ? "hard" : "easy";
                  setType(switchType);
                }}
              />
              <span className="slider round"></span>
            </label>
            <p className="type-text">{type}</p>
          </div>
          <button type="submit" className="modal-btn-create" onClick={(e) => submitHandler(e)}>
            Create
          </button>
        </form>
        <FaWindowClose className="close-button" onClick={togglePortal} />
      </div>
    </div>
  );
};

export default Modal;
