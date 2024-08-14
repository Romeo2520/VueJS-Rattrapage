<template>
    <div class="task-list ">
      <h1 class="text-2xl font-bold mb-4">To do list</h1>
      <ul class="grid grid-cols-5 gap-4">
        <li v-for="task in tasks" :key="task.id" class="bg-gray-100 border border-red-300 rounded p-4 mb-4 w-64">
          <h2 class="text-xl font-semibold">{{ task.title }}</h2>
          <p>{{ task.description }}</p>
          <p>Starting date: {{ task.startDate }}</p>
          <p>Expiry date: {{ task.dueDate }}</p>
          <div class=" border border-blue-300 w-10 bg-green-500 mb-2 mt-2">
            <p>{{ task.priority }}</p>
          </div>
          
          <button @click="editTask(task)" class="bg-blue-500 text-white px-3 py-1 rounded">Modifier</button>
          <button @click="deleteTask(task.id)" class="bg-red-500 text-white px-3 py-1 rounded ml-2">Supprimer</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useTaskStore } from '@/stores/taskStore';
  
  const taskStore = useTaskStore();
  const tasks = computed(() => taskStore.tasks);
  
  const editTask = (updatedTask) => {
    taskStore.updateTask(updatedTask);
    localStorage.setItem("tasks", JSON.stringify(taskStore.tasks))
  }
  
  const deleteTask = (taskId) => {
    if (confirm('Are you sure you want to delete this?')) {
      taskStore.removeTask(taskId);
      localStorage.setItem("tasks", JSON.stringify(taskStore.tasks))
    }
  }
  </script>
  