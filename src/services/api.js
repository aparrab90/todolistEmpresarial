import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://4.236.216.199/", //  API
  //  headers
});

export const login = async (identificationUser, passwordUser) => {
  const response = await apiClient.post("/api/Users/login", {
    identificationUser,
    passwordUser,
  });
  console.log("service api", response);
  return response.data;

  // if (identificationUser === '1726722638' && passwordUser === '123456') {
  //   return {
  //     statusCode: 200,
  //     isSuccess: true,
  //     errorMessages: [],
  //     result: {
  //       usuario: {
  //         idUser: 2,
  //         identificationUser: '1726722638',
  //         nameUser: '123456',
  //         emailUser: 'Usuario1@gmail.com',
  //         passwordUser: '3f1308149ab8219e32bf9d91028c4eb4',
  //         createUser: '2023-08-13T15:14:39.0779368',
  //         role: 'user' // Agregar el rol
  //       },
  //       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjE3MTc5Mzc4NDgiLCJuYmYiOjE2OTE5NjI1MjMsImV4cCI6MTY5MjU2NzMyMywiaWF0IjoxNjkxOTYyNTIzfQ.jWb5zLROc03Umlljm9EFrwkHDBqZhClKdfDyqgtjbcQ'
  //     }
  //   };
  // } else {
  //   return {
  //     statusCode: 400,
  //     isSuccess: false,
  //     errorMessages: ['El nombre de usuario o password son incorrectos'],
  //     result: null
  //   };
  // }
};

export const registerUser = async (userData) => {
  // const response = await apiClient.post('/api/Users/registro', userData);
  // return response.data;
  console.log(userData);
  const fakeResponse = {
    statusCode: 200,
    isSuccess: true,
    errorMessages: [],
    result: null,
  };

  // Devolvemos la respuesta falsa
  return fakeResponse;
};

export const addTask = async (taskData) => {
  console.log(taskData);
  const response = await apiClient.post("/api/Tasks/TaskRegistro", taskData);
  return response.data;
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
    return response.data;
  } catch (error) {
    console.error("Error editing Step Task status:", error);
    throw error;
  }
};

export const editStatusTask = async (idTask, newStatus) => {
  try {
    const response = await apiClient.put(`/api/tasks/${idTask}/editStatus`, {
      statusTask: newStatus,
    });
    console.log("Status of Task updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error editing Task status:", error);
    throw error;
  }
};

const fakeUserList = [
  {
    idUser: 1,
    identificationUser: "1717937849",
    nameUser: "JUAN CARLOS VELÁSQUEZ",
    emailUser: "juanvelasquez79@hotmail.com",
    passwordUser: "e2f671cbd1087c054a39de20b7018d9c",
    createUser: "2023-08-13T15:08:08.6151393",
  },
  {
    idUser: 2,
    identificationUser: "1717937848",
    nameUser: "USUARIO1",
    emailUser: "Usuario1@gmail.com",
    passwordUser: "3f1308149ab8219e32bf9d91028c4eb4",
    createUser: "2023-08-13T15:14:39.0779368",
  },
];

export const getUsers = async () => {
  try {
    // const response = await apiClient.get('/api/Users'); // Ajusta la ruta según la configuración de tu API
    // return response.data;
    return fakeUserList;
  } catch (error) {
    console.error("Error fetching user list:", error);
    return []; // Devolver una lista vacía en caso de error
  }
};

//GETTASKS IDUSER

export const getTasks = async (userId) => {
  try {
    // Simulación de datos ficticios
    const mockData = [
      {
        idTask: 8,
        nameTask: "Tarea de Pruebas 1",
        detailTask: "Esta Tarea es de Pruebas",
        statusTask: true,
        createTask: "2023-08-17T14:19:00.44",
        limitTask: "2023-08-17T17:57:15.657",
        priorityTask: false,
        idUser: 6,
        idCategory: 3,
      },
      {
        idTask: 9,
        nameTask: "Tarea de Pruebas 2",
        detailTask: "Esta Tarea es de Pruebas",
        statusTask: true,
        createTask: "2023-08-17T14:19:00.44",
        limitTask: "2023-08-17T17:57:15.657",
        priorityTask: false,
        idUser: 6,
        idCategory: 3,
      },
      {
        idTask: 10,
        nameTask: "Tarea de Pruebas 3",
        detailTask: "Esta Tarea es de Pruebas",
        statusTask: true,
        createTask: "2023-08-17T14:19:12.52",
        limitTask: "2023-08-17T17:57:15.657",
        priorityTask: true,
        idUser: 6,
        idCategory: 3,
      },
    ];

    console.log("SALIDA OK", mockData, userId);
    return mockData;
  } catch (error) {
    // Manejar el error de alguna manera, lanzarlo nuevamente, mostrar un mensaje, etc.
    // throw error;
    console.error("SALIDA ERROR", error.message);
    return []; // Devolver un array vacío en caso de error
  }
};
// export const getTasks = async (userId) => {
  //   try {
    //     const response = await apiClient.get(`/api/Tasks/GetTasksUser/${userId}`);
    //     console.log(response);
    //     return response.data;
//   } catch (error) {

//   }
// };

//GETTASKS IDUSER

export default {
  login,
  registerUser,
  addTask,
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


export default {
  login,
  registerUser,
  addTask
};
*/
