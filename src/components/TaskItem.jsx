import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import "./Taskitem.css";

const Taskitem = () => {
  // FOR PR CHANGES //
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  const handleDeleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleSaveEditTask = () => {
    setTasks(
      tasks.map((task) => (task.id === editTask.id ? { ...editTask } : task))
    );
    setEditTask(null);
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
