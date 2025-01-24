import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "./Redux/TodoSlice";

const TodoApp = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // Store Data in Local Storage :
  // Load todos from localStorage on initial render:
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (storedTodos.length > 0) {
      storedTodos.forEach((todo) => {
        dispatch({
          type: "todo/loadFromStorage",
          payload: todo,
        });
      });
    }
  }, [dispatch]);

  // Save todos to localStorage whenever it changes (when new todo is added or updated or deleted):
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (text.trim()) {
      if (editId) {
        dispatch(deleteTodo(editId));
        dispatch(addTodo(`${text} (Updated)`));
        setEditId(null); // clear the edited state
      } else {
        dispatch(addTodo(text));
      }
      setText(""); // clear the input field
    }
  };

  const handleEditTodo = (todo) => {
    setText(todo.text);
    setEditId(todo.id);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <h1 className="font-extrabold text-green-500 text-4xl mb-5">
          Redux Todo App
        </h1>
        <div className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white shadow-md rounded-lg p-5 mb-7">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter Your Todo List"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAddTodo}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        <ul className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white shadow-md rounded-lg p-5 mb-7 space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between space-x-3 p-3 shadow-md ${
                todo.completed ? "bg-green-100" : "bg-gray-50"
              }`}
            >
             <div className={`flex items-center gap-20 cursor-pointer px-3 ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                  <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => dispatch(toggleTodo(todo.id))}
                      />
                      <span
                        className={`flex-grow ${todo.completed ? "line-through" : ""}`}
                      >
                        {todo.text}
                      </span>
                      <span>{new Date(todo.id).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleEditTodo(todo)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => dispatch(deleteTodo(todo.id))}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                  </div>
             </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoApp;
