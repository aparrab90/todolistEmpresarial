import axios from "axios";
import { getAuthData } from "./auth"; // Ajusta la ruta a tu ubicación
import moment from "moment";

const apiClient = axios.create({
  baseURL: "http://40.88.211.242", //  API
});

export const login = async (identificationUser, passwordUser) => {
  const response = await apiClient.post("/api/Users/login", {
    identificationUser,
    passwordUser,
  });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await apiClient.post("/api/Users/registro", userData);
  return response.data;
};

export const addTask = async (store, taskData) => {
  try {
    const { token } = getAuthData();

    const formattedDate = moment(taskData.limitTask).toISOString();

    const response = await apiClient.post(
      "/api/Tasks/TaskRegistro",
      {
        ...taskData,
        limitTask: formattedDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    store.commit("todoModule/addTaskStore", response.data);

    return response.data;
  } catch (error) {
    console.error("Error al agregar tarea:", error.message);
    throw error;
  }
};

export const getTasks = async (store, userId) => {
  try {
    const { token } = getAuthData();

    const response = await apiClient.get(`/api/Tasks/GetTasksUser/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const mappedTasks = response.data.map((task) => ({
      ...task,
      statusTask: task.statusTask === "0" ? "false" : task.statusTask,
    }));

    // Agregar las tareas al store utilizando la mutación
    store.commit("todoModule/addAllTaskStore", response.data);

    return mappedTasks;
  } catch (error) {
    console.error("SALIDA ERROR", error.message);
    return [];
  }
};

export const editStatusTask = async (store, taskId, newPriority) => {
  // console.log("recibe", taskId, newPriority);
  try {
    const { token } = getAuthData();

    const response = await apiClient.put(
      `/api/Tasks/editStatusTask/${taskId}`,
      newPriority,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    store.commit("todoModule/editStatusTaskStore", taskId);
    console.log(
      "Respuesta de API al editar prioridad de tarea:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("Error al editar prioridad de tarea:", error.message);
    throw error;
  }
};

export const editTask = async (taskId, updatedTaskData) => {
  try {
    const { token } = getAuthData();

    if (updatedTaskData.limitTask) {
      updatedTaskData.limitTask = moment(
        updatedTaskData.limitTask
      ).toISOString();
    }

    const response = await apiClient.put(
      `/api/Tasks/updateTask/${taskId}`,
      updatedTaskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // store.commit("todoModule/editTaskStore", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al editar tarea:", error.message);
    throw error;
  }
};

export const createStepTask = async (idTask, stepTaskData) => {
  try {
    const response = await apiClient.post(
      `/api/tasks/${idTask}/createStepTask`,
      stepTaskData
    );
    console.log("Step task created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating step task:", error);
    throw error;
  }
};

export const editStatusStepTask = async (idStepTask, newStatus) => {
  try {
    const response = await apiClient.put(
      `/api/stepTasks/${idStepTask}/editStatus`,
      { statusStepTask: newStatus }
    );
    console.log("Status of Step Task updated successfully:", response.data);

    // store.commit("todoModule/TaskStore", response.data);

    return response.data;
  } catch (error) {
    console.error("Error editing Step Task status:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await apiClient.get("/api/Users");
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    return [];
  }
};

//GETTASKS IDUSER

export const editTaskPriority = async (taskId, newPriority) => {
  console.log("recibe", taskId, newPriority);
  try {
    const { token } = getAuthData();

    const response = await apiClient.put(
      `/api/Tasks/editPriorityTask/${taskId}`,
      newPriority,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "Respuesta de API al editar prioridad de tarea:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("Error al editar prioridad de tarea:", error.message);
    throw error;
  }
};

export default {
  login,
  registerUser,
  addTask,
  getTasks,
};
