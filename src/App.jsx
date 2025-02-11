import React, { useState } from "react";
import "./App.css";
import sun from "../src/images/icon-sun.svg";
import moon from "../src/images/icon-moon.svg";
import check from "../src/images/icon-check.svg";
import cross from "../src/images/icon-cross.svg";
import favi from "../src/images/circle-line.png";
import light from "../src/images/bg-desktop-light.jpg";
import dark from "../src/images/bg-desktop-dark.jpg";

// import sun from "../src/images/icon-sun.svg";
// import check from "../src/images/icon-check.svg";
// import cross from "../src/images/icon-cross.svg";
// import favi from "../src/images/circle-line.png";
function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [newTodo, setNewTodo] = useState("");
  const [theme, setTheme] = useState("light");

  const handleAddTodo = (events) => {
    events.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div
      className="bus-container"
      style={{
        backgroundImage: `url(${theme === "light" ? light : dark})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "co",
        width: "100%",
        height: "50vh",
      }}
    >
      <div className={`app-container ${theme}`}>
        <div className="header">
          <div className="head">
            <h1 className="title">TODO</h1>
            {/* <div className="moon">
              <img src={sun} alt="" />
            </div> */}

            <div className="theme-toggle" onClick={toggleTheme}>
              <img src={theme === "light" ? moon : sun} />
            </div>
          </div>
          <div className="todo-input-container">
            <form action="" onSubmit={handleAddTodo}>
              <input
                type="text"
                placeholder="Create a new todo..."
                value={newTodo}
                onChange={(events) => setNewTodo(events.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="inputia-container">
        <div className="intputia">
          <ul className="todo-list">
            {filteredTodos.map((todo, index) => (
              <li
                key={index}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <div className="do">
                  <span onClick={() => handleToggleComplete(index)}>
                    {todo.completed ? (
                      <img src={check} alt="" className="ceck" />
                    ) : (
                      <img src={favi} alt="" className="favi" />
                    )}
                  </span>
                  <span
                    className="todo-text"
                    onClick={() => handleToggleComplete(index)}
                  >
                    {todo.text}
                  </span>
                </div>
                <img
                  src={cross}
                  alt=""
                  className="delete-button"
                  onClick={() => handleDeleteTodo(index)}
                />
              </li>
            ))}
          </ul>
          <div className="last">
            <div className="todo-filters">
              <span className="left">{filteredTodos.length} items left</span>
              <div className="mobile">
                <button
                  className={filter === "all" ? "active" : ""}
                  onClick={() => handleFilterChange("all")}
                >
                  All
                </button>
                <button
                  className={filter === "active" ? "active" : ""}
                  onClick={() => handleFilterChange("active")}
                >
                  Active
                </button>
                <button
                  className={filter === "completed" ? "active" : ""}
                  onClick={() => handleFilterChange("completed")}
                >
                  Completed
                </button>
              </div>
            </div>
            <div className="todo-footer">
              <button
                onClick={() =>
                  setTodos(todos.filter((todo) => !todo.completed))
                }
              >
                Clear Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
