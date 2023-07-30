import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { axiosApiInstance } from "../interceptor/tokenInterceptor";
import axios, { AxiosError } from "axios";
import CreateModal from "./CreateModal";
import { cloneDeep, isEqual } from "lodash-es";
import { FaBeer } from "react-icons/fa";
import SwitchComponent from "./SwitchComponent";

const Todos = () => {
  const [todos, setTodos] = useState<{ todo: string; completed: boolean; type: "easy" | "hard" }[] | undefined>();
  const [originalTodos, setOriginalTodos] = useState<{ todo: string; completed: boolean; type: "easy" | "hard" }[] | undefined>();
  const [indexesOfChangedTodos, setIndexesOfChagnedTodos] = useState<number[]>([]);
  const [username, setUsername] = useState("");
  const [portalOpened, setPortalOpened] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    let token = localStorage.getItem("todo-token");
    let username = localStorage.getItem("todo-username");
    if (username) {
      username = JSON.parse(username);
      if (username !== null) {
        setUsername(username);
      }
    }
    if (token && token !== null) {
      token = JSON.parse(token);
    }
    try {
      const response = await axiosApiInstance.get(`api/todos/user/?username=${username}&page=${1}&limit=${3}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const todos = await response.data.data;
      setTodos(todos);
      setOriginalTodos(todos);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          console.log("Unauthorized");
        } else {
          throw new Error(error.response?.data);
        }
      } else {
        console.log(error);
      }
    }
  }

  const togglePortal = () => {
    setPortalOpened((prevPortalOpened) => !prevPortalOpened);
  };

  const editTodo = () => {
    console.log("Edit Todo");
  };

  const editTodoLine = (index: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTodos = cloneDeep(todos);
    if (index !== undefined && index !== -1 && newTodos !== undefined) {
      newTodos[index].todo = e.target.value;
      setTodos(newTodos);
    }
    if (originalTodos && newTodos && !isEqual(originalTodos[index], newTodos[index])) {
      setIndexesOfChagnedTodos([...indexesOfChangedTodos, index]);
    } else {
      setIndexesOfChagnedTodos(indexesOfChangedTodos.filter((i) => i !== index));
    }
  };

  const changeCompleted = (index: number) => {
    const newTodos = cloneDeep(todos);
    if (index !== undefined && index !== -1 && newTodos !== undefined) {
      newTodos[index].completed = !newTodos[index].completed;
      setTodos(newTodos);
    }
    if (originalTodos && newTodos && !isEqual(originalTodos[index], newTodos[index])) {
      setIndexesOfChagnedTodos([...indexesOfChangedTodos, index]);
    } else {
      setIndexesOfChagnedTodos(indexesOfChangedTodos.filter((i) => i !== index));
    }
  };

  const changeType = (index: number) => {
    const newTodos = cloneDeep(todos);
    if (index !== undefined && index !== -1 && newTodos !== undefined) {
      newTodos[index].type = newTodos[index].type === "easy" ? "hard" : "easy";
      setTodos(newTodos);
    }
    if (originalTodos && newTodos && !isEqual(originalTodos[index], newTodos[index])) {
      setIndexesOfChagnedTodos([...indexesOfChangedTodos, index]);
    } else {
      setIndexesOfChagnedTodos(indexesOfChangedTodos.filter((i) => i !== index));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3>
        Todo List by <span className="uppercase">{username}</span>
      </h3>
      <FaBeer />
      {todos?.map((todo, index) => (
        <form className="flex flex-col items-start justify-center mb-3 w-300 border-b-2 border-gray-700 py-5" key={index}>
          <textarea
            className="w-full border-none resize-none"
            onChange={(e) => editTodoLine(index, e)}
            value={todo.todo}
          ></textarea>
          <div className="flex flex-row items-center justify-center">
            <SwitchComponent changeFunc={changeCompleted} index={index} />
            <p className="ml-2">{todo.completed ? "completed" : "non completed"}</p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <SwitchComponent changeFunc={changeType} index={index} />
            <p className="ml-2">{todo.type === "easy" ? "Easy to do" : "Hard to do"}</p>
          </div>
          {indexesOfChangedTodos.includes(index) && (
            <button
              className="inline-block align-baseline py-1 px-2 rounded-md border-0 cursor-pointer text-base font-medium text-white bg-blue-500 transition duration-300 ease-in-out"
              onSubmit={editTodo}
              type="submit"
            >
              Edit
            </button>
          )}
        </form>
      ))}
      <button onClick={togglePortal}>Add Todo</button>
      {createPortal(
        <CreateModal
          togglePortal={togglePortal}
          portalOpened={portalOpened}
          setPortalOpened={setPortalOpened}
          todos={todos}
          setTodos={setTodos}
          modalRef={modalRef}
        />,
        document.getElementById("modal") as HTMLElement
      )}
    </div>
  );
};

export default Todos;