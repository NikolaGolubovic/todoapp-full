import React, { useState } from "react";
import { axiosApiInstance } from "../interceptor/tokenInterceptor";
import { useClickAway } from "react-use";
import { FaWindowClose } from "react-icons/fa";
import { getToken } from "../utils/tokenEncription";
import { tokenLS } from "../constants/tokenNames";

interface ModalProps {
  togglePortal: () => void;
  portalOpened: boolean;
  setPortalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  todos: { id: number; todo: string; completed: boolean; type: "easy" | "hard" }[] | undefined;
  setTodos: React.Dispatch<
    React.SetStateAction<
      | {
          id: number;
          todo: string;
          completed: boolean;
          type: "easy" | "hard";
        }[]
      | undefined
    >
  >;
  modalRef: React.RefObject<HTMLDivElement>;
  notify: (msg: string, type: string) => void;
  totalItems: number;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
}

const Modal: React.FC<ModalProps> = ({
  togglePortal,
  portalOpened,
  todos,
  setTodos,
  modalRef,
  notify,
  totalItems,
  setTotalItems,
}) => {
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
        const newTodo = { id: response.data.userId, todo, completed, type };
        if (todos === undefined) return notify("Something went wrong with todos, please try again", "error");
        if (todos.length < 3) {
          setTodos([...todos, newTodo]);
        } else {
          setTodos([newTodo]);
          setTotalItems(totalItems + 1);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message, "error");
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
