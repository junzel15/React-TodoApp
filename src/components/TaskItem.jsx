import React, { useState, useEffect } from "react"; // Import React and necessary hooks
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from "react-icons/ai"; // Import icons from react-icons
import "./Taskitem.css"; // Import CSS for Taskitem component

const TodoItem = () => {
  // State to manage tasks, initializes from localStorage if available
  const [taskList, setTaskList] = useState(() => {
    const storedTaskList = localStorage.getItem("taskList"); // Get stored tasks from localStorage
    return storedTaskList ? JSON.parse(storedTaskList) : []; // Parse stored tasks or return empty array
  });

  // State to manage new task's name
  const [taskName, setTaskName] = useState(""); // Initialize taskName state
  // State to manage new task's description
  const [taskDescription, setTaskDescription] = useState(""); // Initialize taskDescription state

  // State to manage task being edited
  const [currentTask, setCurrentTask] = useState(null); // Initialize currentTask state

  // Effect to update localStorage whenever taskList state changes
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList)); // Update localStorage with current tasks
  }, [taskList]); // Dependency array includes taskList

  // Function to add a new task
  const addNewTask = () => {
    if (taskName.trim() !== "" && taskDescription.trim() !== "") {
      // Check if inputs are not empty
      const newTask = {
        name: taskName, // Set name of new task
        description: taskDescription, // Set description of new task
      };
      setTaskList([...taskList, newTask]); // Add new task to taskList state
      setTaskName(""); // Reset taskName state
      setTaskDescription(""); // Reset taskDescription state
    }
  };

  // Function to delete a task
  const removeTask = (taskToRemove) => {
    setTaskList(taskList.filter((task) => task !== taskToRemove)); // Remove task from taskList state
  };

  // Function to start editing a task
  const editTask = (task) => {
    setCurrentTask(task); // Set currentTask state to selected task
  };

  // Function to save an edited task
  const saveTaskChanges = () => {
    setTaskList(
      taskList.map(
        (task) => (task.id === currentTask.id ? { ...currentTask } : task) // Update task in taskList state
      )
    );
    setCurrentTask(null); // Reset currentTask state
  };

  return (
    <div className="task-container">
      <h1>To-Do App</h1> {/* Header for the app */}
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)} // Update taskName state on change
        placeholder="Task Name"
        className="task-input"
      />
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)} // Update taskDescription state on change
        placeholder="Task Description"
        className="task-input"
      />
      <button onClick={addNewTask} className="task-button">
        <AiOutlineSave /> Add {/* Button to add new task */}
      </button>
      <h2>Task List</h2> {/* Header for task list */}
      <ul>
        {taskList.map((task, index) => (
          <li key={index} className="task-item">
            <div>
              <strong>Task Name:</strong> {task.name} {/* Display task name */}
            </div>
            <div>
              <strong>Task Description:</strong> {task.description}{" "}
              {/* Display task description */}
            </div>
            <div>
              <button
                onClick={() => editTask(task)}
                className="task-button edit-button"
              >
                <AiOutlineEdit /> Edit {/* Button to edit task */}
              </button>
              <button
                onClick={() => removeTask(task)}
                className="task-button delete-button"
              >
                <AiOutlineDelete /> Delete {/* Button to delete task */}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {currentTask && (
        <div className="edit-container">
          <input
            type="text"
            value={currentTask.name}
            onChange={
              (e) => setCurrentTask({ ...currentTask, name: e.target.value }) // Update currentTask name on change
            }
            placeholder="Edit Task Name"
            className="task-input"
          />
          <input
            type="text"
            value={currentTask.description}
            onChange={
              (e) =>
                setCurrentTask({
                  ...currentTask,
                  description: e.target.value,
                }) // Update currentTask description on change
            }
            placeholder="Edit Task Description"
            className="task-input"
          />
          <button onClick={saveTaskChanges} className="task-button save-button">
            <AiOutlineSave /> Save {/* Button to save edited task */}
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem; // Export TodoItem component
