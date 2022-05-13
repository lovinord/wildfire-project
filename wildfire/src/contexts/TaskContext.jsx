import { createContext, useState } from "react";
export const TaskContext = createContext();

const TaskContextProvider = (props) => {
  const [userActiveTasks, setUserActiveTasks] = useState();
  const [userOldTasks, setUserOldTasks] = useState();

  const baseURL = "http://localhost:3001/api/task";
  const resetTaskContext = () => {
    setUserOldTasks(null);
    setUserActiveTasks(null);
  };
  const getActiveUserTasks = async (userId) => {
    let result = await fetch(`${baseURL}/${userId}`, {
      method: "GET",
      credentials: "include",
    });
    result = await result.json();
    setUserActiveTasks(result);
    return result;
  };

  const getOldUserTasks = async (userId) => {
    let result = await fetch(`${baseURL}/${userId}/oldtasks`, {
      method: "GET",
      credentials: "include",
    });
    result = await result.json();
    setUserOldTasks(result);
    return result;
  };

  const createNewTask = async (createTask) => {
    let result = await fetch(`${baseURL}/addnew`, {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(createTask),
    });
    result = await result.json();
    return result;
  };

  const updateATask = async (updateTask) => {
    let result = await fetch(
      `${baseURL}/${updateTask.userId}/${updateTask._id}`,
      {
        credentials: "include",
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }),
      }
    );
    result = await result.json();
    return result;
  };

  const markTaskAsMissed = async (updateTask) => {
    let result = await fetch(
      `${baseURL}/${updateTask.userId}/${updateTask._id}`,
      {
        credentials: "include",
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: "missed" }),
      }
    );
    result = await result.json();
    return result;
  };

  const deleteTask = async (task) => {
    let result = await fetch(`${baseURL}/${task.userId}/${task._id}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  };

  const deleteAllTasks = async (userId) => {
    let result = await fetch(`${baseURL}/${userId}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    return result;
  };

  const values = {
    getActiveUserTasks,
    userActiveTasks,
    getOldUserTasks,
    userOldTasks,
    createNewTask,
    updateATask,
    deleteTask,
    markTaskAsMissed,
    resetTaskContext,
    deleteAllTasks,
  };

  return (
    <TaskContext.Provider value={values}>{props.children}</TaskContext.Provider>
  );
};

export default TaskContextProvider;
