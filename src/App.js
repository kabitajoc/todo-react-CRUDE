import React, { useEffect, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Form from "./components/Form";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  };

  const addTodo = async (title, completed) => {
    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        completed: completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(`Added successfully`);

        setTodos((todos) => [data, ...todos]);
      })
      .catch((error) => console.log(error));
  };

  const editTodo = async (id, title, completed) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        completed: completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
            todo.title = title;
            todo.completed = completed;
          }

          return todo;
        });
        console.log(`Edited successfully ${id}`);

        setTodos((todos) => updatedTodos);
      })
      .catch((error) => console.log(error));
  };

  const deleteTodo = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          console.log(`Deleted successfully ${id}`);
          setTodos(
            todos.filter((todo) => {
              return todo.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div id="myDIV" className="header">
        <h2 style={{ margin: "5px" }}>My To Do List</h2>
        {
          <Form
            id={id}
            title={title}
            completed={completed}
            setId={setId}
            setTitle={setTitle}
            setCompleted={setCompleted}
            addTodo={addTodo}
            editTodo={editTodo}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        }
      </div>

      <ul id="myUL">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            setId={setId}
            setTitle={setTitle}
            setCompleted={setCompleted}
            deleteTodo={deleteTodo}
            setIsEdit={setIsEdit}
          />
        ))}
      </ul>
    </>
  );
}
