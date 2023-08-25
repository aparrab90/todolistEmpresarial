export const addTaskStore = (state, dataList) => {
  state.todoList.push(dataList);
};
export const addAllTaskStore = (state, taskList) => {
  state.todoList = [];
  state.todoList.push(...taskList);
};
export const editStatusTaskStore = (state, taskId) => {
  console.log("edittttt", taskId);

  // Mapear sobre la lista de tareas y encontrar la tarea con el mismo taskId
  state.todoList = state.todoList.map((task) => {
    if (task.idTask === taskId) {
      console.log("status actual", task.statusTask);
      task.statusTask = task.statusTask === "true" ? "false" : "true";
      console.log("status cambio a ", task.statusTask);
    }
    return task;
  });
};
export const editPriorityTaskStore = (state, taskId) => {
  console.log("edittttt", taskId);

  // Mapear sobre la lista de tareas y encontrar la tarea con el mismo taskId
  state.todoList = state.todoList.map((task) => {
    if (task.idTask === taskId) {
      console.log("status actual", task.priorityTask);
      task.priorityTask = task.priorityTask === "true" ? "false" : "true";
      console.log("status cambio a ", task.priorityTask);
    }
    return task;
  });
};
export const editTaskStore = (state, updatedTaskData) => {
  const taskIdToUpdate = updatedTaskData.idTask;

  // Buscar la tarea en el estado y actualizar sus campos
  state.todoList = state.todoList.map((task) => {
    if (task.idTask === taskIdToUpdate) {
      // Actualizar los campos relevantes
      task.nameTask = updatedTaskData.nameTask;
      task.detailTask = updatedTaskData.detailTask;
      task.statusTask = updatedTaskData.statusTask;
      task.limitTask = updatedTaskData.limitTask;
      task.priorityTask = updatedTaskData.priorityTask;
      task.idUser = updatedTaskData.idUser;
      task.idCategory = updatedTaskData.idCategory;
    }
    return task;
  });
};
