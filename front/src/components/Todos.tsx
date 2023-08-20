import React, { useEffect, useState, useRef, FC } from "react";
import { createPortal } from "react-dom";
import { axiosApiInstance } from "../interceptor/tokenInterceptor";
import axios, { AxiosError } from "axios";
import CreateModal from "./CreateModal";
import { cloneDeep, isEqual } from "lodash-es";
import SwitchComponent from "./SwitchComponent";
import { getToken } from "../utils/tokenEncription";
import { tokenLS, usernameLS } from "../constants/tokenNames";
import ReactPaginate from "react-paginate";

type PropsTodos = {
  setUserOn: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};
type TodoType = { id: number; todo: string; completed: boolean; type: "easy" | "hard" };

const Todos: FC<PropsTodos> = ({ setUserOn }) => {
  const [todos, setTodos] = useState<TodoType[] | undefined>();
  const [originalTodos, setOriginalTodos] = useState<
    { id: number; todo: string; completed: boolean; type: "easy" | "hard" }[] | undefined
  >();
  const [indexesOfChangedTodos, setIndexesOfChagnedTodos] = useState<number[]>([]);
  const [username, setUsername] = useState("");
  const [portalOpened, setPortalOpened] = useState(false);
  const [page, setPage] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 3;

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    let username = localStorage.getItem(usernameLS);
    if (username) {
      username = JSON.parse(username);
      if (username !== null) {
        setUserOn(true);
      }
    }
  }, [setUserOn]);

  async function fetchTodos() {
    const token = getToken(tokenLS);
    let username = localStorage.getItem(usernameLS);
    if (username) {
      username = JSON.parse(username);
      if (username !== null) {
        setUsername(username);
      }
    }
    try {
      const response = await axiosApiInstance.get(`api/todos/user/?username=${username}&page=${1}&limit=${3}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const todos = await response.data.data;
      console.log("todos", todos);
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

  function handlePageClick(data: { selected: number }) {
    setPage(data.selected);
  }

  const editTodo = async (editedTodo: TodoType, e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id, ...todo } = editedTodo;
    const token = getToken(tokenLS);
    try {
      const response = await axiosApiInstance.put(`api/todos/${id}`, todo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("Todo edited");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteTodo(id: number) {
    const token = getToken(tokenLS);
    try {
      const response = await axiosApiInstance.delete(`api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        setTodos(todos?.filter((todo) => todo.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h3>
        Todo List by <span className="uppercase">{username}</span>
      </h3>
      {todos?.map((todo, index) => (
        <form className="flex flex-col items-start justify-center mb-3 w-2/5  border-b-2 border-gray-700 py-8" key={todo.id}>
          <textarea
            className="w-full border resize-none py-2 px-1 focus:border-blue-500"
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
          <div className="flex flex-row items-center justify-end self-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteTodo(todo.id);
              }}
              className="bg-red-500 hover:bg-red-700 text-white px-1 py-0.5 rounded-md text-base leading-normal"
            >
              Delete
            </button>
          </div>
          {indexesOfChangedTodos.includes(index) && (
            <button
              className="inline-block align-baseline py-1 px-2 rounded-md border-0 cursor-pointer text-base font-medium text-white bg-blue-500 transition duration-300 ease-in-out"
              onClick={(e) => editTodo({ id: todo.id, todo: todo.todo, completed: todo.completed, type: todo.type }, e)}
            >
              Edit
            </button>
          )}
        </form>
      ))}
      {
        <button onClick={togglePortal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-10 rounded-md">
          Create Todo
        </button>
      }
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
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(todos?.length || 0 / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName={"pagination"}
        activeClassName={"active"}
        forcePage={page}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default Todos;
