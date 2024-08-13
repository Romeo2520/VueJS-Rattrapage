// stores/taskStore.js
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid'; // Pour générer des ID uniques

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem("tasks"))||[]

  }),
  
  actions: {
    addTask(title, description, startDate, dueDate, priority) {
      this.tasks.push({title, description, startDate, dueDate, priority, id: uuidv4() });
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      console.log(this.tasks)
      // console.log(title, description, startDate, dueDate, priority)
    },
    removeTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    updateTask(updatedTask) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    }
  }
});
