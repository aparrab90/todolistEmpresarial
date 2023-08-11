
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

export const addTask = async (taskName, taskDescription) => {
  const response = await apiClient.post('/api/tasks', {
    taskName,
    taskDescription
  });
  
  return response.data;
};

export const getCustomers = async () => {
  try {
    const response = await apiClient.get('/api/customers');
    return response.data;
  } catch (error) {
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