import React, { useEffect, useRef, useState } from "react";
import { axiosApiInstance } from "../interceptor/tokenInterceptor";
import { useClickAway } from "react-use";

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

const Modal: React.FC<ModalProps> = ({ togglePortal, portalOpened, setPortalOpened, todos, setTodos, modalRef }) => {
  const [todo, setTodo] = useState("");
  const [completed, setCompleted] = useState(false);
  const [type, setType] = useState<"easy" | "hard">("easy");

  useClickAway(modalRef, () => {
    console.log("clicked outside");
    if (portalOpened) {
      togglePortal();
    }
  });

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //       // console.log(modalRef.current.classList, modalRef.current);
  //       togglePortal();
  //     }
  //   };

  //   const handleDocumentClick = (event: MouseEvent) => {
  //     handleClickOutside(event);
  //   };

  //   if (portalOpened) {
  //     document.addEventListener("click", handleDocumentClick);
  //   }

  //   return () => {
  //     document.removeEventListener("click", handleDocumentClick);
  //   };
  // }, [modalRef, portalOpened, togglePortal]);

  async function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    let token = localStorage.getItem("todo-token");
    if (token) {
      token = JSON.parse(token);
    }
    try {
      const response = await axiosApiInstance.post(
        "api/todos",
        {
          todo,
          completed,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
            <p>{type}</p>
          </div>
          <button type="submit" onClick={(e) => submitHandler(e)}>
            Create
          </button>
        </form>
        <button className="close-button" onClick={togglePortal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
