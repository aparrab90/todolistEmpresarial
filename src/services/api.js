
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esto según la URL de tu API
  // Puedes configurar headers aquí si es necesario
});

export const login = async (userAccess, passAccess) => {
  const response = await apiClient.post('/api/login', {
    userAccess,
    passAccess
  });
  
  return response.data;
};

export const registerUser = async (fullNameUser, addressUser) => {
  const response = await apiClient.post('/api/users', {
    fullNameUser,
    addressUser
  });
  
  return response.data;
};

export const addTask = async (taskData) => {
  console.log(taskData);
  const response = await apiClient.post('/api/addTasks', taskData);
  return response.data;
};

export const createStepTask = async (idTask, stepTaskData) => {
  try {
    const response = await apiClient.post(`/api/tasks/${idTask}/createStepTask`, stepTaskData);
    console.log('Step task created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating step task:', error);
    throw error;
  }
};

export const editStatusStepTask = async (idStepTask, newStatus) => {
  try {
    const response = await apiClient.put(`/api/stepTasks/${idStepTask}/editStatus`, { statusStepTask: newStatus });
    console.log('Status of Step Task updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error editing Step Task status:', error);
    throw error;
  }
};

export const editStatusTask = async (idTask, newStatus) => {
  try {
    const response = await apiClient.put(`/api/tasks/${idTask}/editStatus`, { statusTask: newStatus });
    console.log('Status of Task updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error editing Task status:', error);
    throw error;
  }
};



export const getCustomers = async () => {
  try {
    const response = await apiClient.get('/api/customers');
    return response.data;
  } catch (error) {
    // throw error;
  }
};
export const getTasks = async (userId) => {
  try {
    const response = await apiClient.get(`/api/tasks?userId=${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    // Manejar el error de alguna manera, lanzarlo nuevamente, mostrar un mensaje, etc.
    // throw error;
  }
};


// Puedes agregar más funciones aquí para interactuar con la API

export default {
  login,
  registerUser,
  addTask
};

/*import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto según la URL de tu API
  // Puedes configurar headers aquí si es necesario
});

// Función para realizar una solicitud POST a la API para el inicio de sesión
export const login = async (userAccess, passAccess) => {
  try {
    const response = await apiClient.post('/api/login', {
      userAccess,
      passAccess
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para realizar una solicitud POST a la API para el registro de usuario
export const registerUser = async (fullNameUser, addressUser) => {
  try {
    const response = await apiClient.post('/api/users', {
      fullNameUser,
      addressUser
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para realizar una solicitud POST a la API para el registro de tarea
export const addTask = async (taskName, taskDescription) => {
  try {
    const response = await apiClient.post('/api/tasks', {
      taskName,
      taskDescription
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Puedes agregar más funciones aquí para interactuar con la API

export default {
  login,
  registerUser,
  addTask
};
*/