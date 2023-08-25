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
