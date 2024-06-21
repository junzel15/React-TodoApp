import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import "./Taskitem.css";

const TaskItem = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const [taskBeingEdited, setTaskBeingEdited] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskName.trim() !== "" && newTaskDescription.trim() !== "") {
      const newTask = {
        name: newTaskName,
        description: newTaskDescription,
      };
      setTasks([...tasks, newTask]);
      setNewTaskName("");
      setNewTaskDescription("");
    }
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
  };

  const startEditingTask = (task) => {
    setTaskBeingEdited(task);
  };

  const saveEditedTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === taskBeingEdited.id ? { ...taskBeingEdited } : task
      )
    );
    setTaskBeingEdited(null);
  };

  return (
    <div className="task-container">
      <h1>To-Do App</h1>
      <input
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="Task Name"
        className="task-input"
      />
      <input
        type="text"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        placeholder="Task Description"
        className="task-input"
      />
      <button onClick={addTask} className="task-button">
        <AiOutlineSave /> Add
      </button>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div>
              <strong>Task Name:</strong> {task.name}
            </div>
            <div>
              <strong>Task Description:</strong> {task.description}
            </div>
            <div>
              <button
                onClick={() => startEditingTask(task)}
                className="task-button edit-button"
              >
                <AiOutlineEdit /> Edit
              </button>
              <button
                onClick={() => deleteTask(task)}
                className="task-button delete-button"
              >
                <AiOutlineDelete /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {taskBeingEdited && (
        <div className="edit-container">
          <input
            type="text"
            value={taskBeingEdited.name}
            onChange={(e) =>
              setTaskBeingEdited({ ...taskBeingEdited, name: e.target.value })
            }
            placeholder="Edit Task Name"
            className="task-input"
          />
          <input
            type="text"
            value={taskBeingEdited.description}
            onChange={(e) =>
              setTaskBeingEdited({
                ...taskBeingEdited,
                description: e.target.value,
              })
            }
            placeholder="Edit Task Description"
            className="task-input"
          />
          <button onClick={saveEditedTask} className="task-button save-button">
            <AiOutlineSave /> Save
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
