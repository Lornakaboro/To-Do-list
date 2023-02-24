export default class TaskList {
    constructor() {
      this.getTasksFromLocalStorage();
    }
  
    updateTasksInLocalStorage() {
      localStorage.setItem('taskList', JSON.stringify(this.listArray));
    }
  
    getTasksFromLocalStorage() {
      this.listArray = JSON.parse(localStorage.getItem('taskList')) || [];
    }
  
      getTasks = () => JSON.parse(localStorage.getItem('taskList')) || [];
  
      setEditTask(index) {
        const task = this.listArray.find(
          (item) => parseInt(item.index, 10) === parseInt(index, 10),
        );
        task.edit = true;
        this.updateTasksInLocalStorage();
      }
  
      addNewTask(description) {
        const task = {
          description,
          completed: false,
          index: this.listArray.length + 1,
          edit: false,
        };
        this.listArray = [...this.listArray, task];
        this.updateTasksInLocalStorage();
      }
  
      removeCompletedTasks() {
        this.listArray = this.listArray.filter((item) => item.completed !== true);
        if (this.listArray.length > 0) {
          this.listArray = this.listArray.map((task, i) => {
            task.index = i + 1;
            return task;
          });
        }
        this.updateTasksInLocalStorage();
      }
  
      removeTask(index) {
        this.listArray = this.listArray.filter((item) => item.index !== index);
        this.listArray = this.listArray.map((task, i) => {
          task.index = i + 1;
          return task;
        });
        this.updateTasksInLocalStorage();
      }
  
      editTask(index, description) {
        this.listArray[index - 1].description = description;
        this.listArray[index - 1].edit = false;
        this.updateTasksInLocalStorage();
      }
  
      changeTaskCompletionStatus(index) {
        const status = this.listArray[index - 1].completed;
        this.listArray[index - 1] = {
          ...this.listArray[index - 1],
          completed: !status,
        };
        this.updateTasksInLocalStorage();
      }
  }