import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import "./Taskitem.css";

const Taskitem = () => {
  // State for tasks, initializing from local storage if available
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // State for new task inputs
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  // State for editing tasks
  const [editTask, setEditTask] = useState(null); // Store the task being edited

  // useEffect to save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to handle adding a new task
  const handleAddTask = () => {
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

  // Function to handle deleting a task
  const handleDeleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
  };

  // Function to handle editing a task
  const handleEditTask = (task) => {
    setEditTask(task); // Set the task being edited
  };

  // Function to save edited task
  const handleSaveEditTask = () => {
    setTasks(
      tasks.map((task) => (task.id === editTask.id ? { ...editTask } : task))
    );
    setEditTask(null); // Clear the edit task state
  };

  // JSX structure for the component
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
      <button onClick={handleAddTask} className="task-button">
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
                onClick={() => handleEditTask(task)}
                className="task-button edit-button"
              >
                <AiOutlineEdit /> Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task)}
                className="task-button delete-button"
              >
                <AiOutlineDelete /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editTask && (
        <div className="edit-container">
          <input
            type="text"
            value={editTask.name}
            onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
            placeholder="Edit Task Name"
            className="task-input"
          />
          <input
            type="text"
            value={editTask.description}
            onChange={(e) =>
              setEditTask({ ...editTask, description: e.target.value })
            }
            placeholder="Edit Task Description"
            className="task-input"
          />
          <button
            onClick={handleSaveEditTask}
            className="task-button save-button"
          >
            <AiOutlineSave /> Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Taskitem;
