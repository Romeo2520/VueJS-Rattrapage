<template>
  <h1 class="text-2xl font-bold mb-4">To do list</h1>
   <div class="text-2xl font-bold mb-4 text-red">
    <RouterLink :to="{ path: '/AddTask'}">
    <button @click="showForm = true" class="bg-green-500 text-white px-4 py-2 rounded">Add a todo list</button>
    <AddTask v-if="showForm" @close="showForm = false" />
  </RouterLink>
  </div>
  <div class="task-list ">
    
    <ul class="grid grid-cols-5 gap-4">
      <li v-for="task in tasks" :key="task.id" class="bg-gray-100 border border-red-300 rounded p-4 mb-4 w-64">
        <h2 class="text-xl font-semibold">{{ task.title }}</h2>
        <p>{{ task.description }}</p>
        <p>Starting date: {{ task.startDate }}</p>
        <p>Expiry date: {{ task.dueDate }}</p>
        <div class=" border border-blue-300 w-10 bg-green-500 mb-2 mt-2">
          <p>{{ task.priority }}</p>
        </div>
        <RouterLink :to="`/update/${task.id}`">
          <button @click="editTask(updateTask)" class="bg-blue-500 text-white px-3 py-1 rounded"><svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button>
        </RouterLink>
        <button @click="deleteTask(task.id)" class="bg-red-500 text-white px-3 py-1 rounded ml-2"><svg width="16px" height="16px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M667.8 362.1H304V830c0 28.2 23 51 51.3 51h312.4c28.4 0 51.4-22.8 51.4-51V362.2h-51.3z" fill="#CCCCCC" /><path d="M750.3 295.2c0-8.9-7.6-16.1-17-16.1H289.9c-9.4 0-17 7.2-17 16.1v50.9c0 8.9 7.6 16.1 17 16.1h443.4c9.4 0 17-7.2 17-16.1v-50.9z" fill="#CCCCCC" /><path d="M733.3 258.3H626.6V196c0-11.5-9.3-20.8-20.8-20.8H419.1c-11.5 0-20.8 9.3-20.8 20.8v62.3H289.9c-20.8 0-37.7 16.5-37.7 36.8V346c0 18.1 13.5 33.1 31.1 36.2V830c0 39.6 32.3 71.8 72.1 71.8h312.4c39.8 0 72.1-32.2 72.1-71.8V382.2c17.7-3.1 31.1-18.1 31.1-36.2v-50.9c0.1-20.2-16.9-36.8-37.7-36.8z m-293.5-41.5h145.3v41.5H439.8v-41.5z m-146.2 83.1H729.5v41.5H293.6v-41.5z m404.8 530.2c0 16.7-13.7 30.3-30.6 30.3H355.4c-16.9 0-30.6-13.6-30.6-30.3V382.9h373.6v447.2z" fill="#211F1E" /><path d="M511.6 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.4 9.3 20.7 20.8 20.7zM407.8 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0.1 11.4 9.4 20.7 20.8 20.7zM615.4 799.6c11.5 0 20.8-9.3 20.8-20.8V467.4c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.5 9.3 20.8 20.8 20.8z" fill="#211F1E" /></svg></button>
      </li>
    </ul>
  </div>
 
</template>

<script setup>
import { computed } from 'vue';
import { ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import AddTask from './AddTask.vue';
import { RouterLink } from 'vue-router';
const showForm = ref(false);
const taskStore = useTaskStore();
const tasks = computed(() => taskStore.tasks);

const editTask = (updatedTask) => {
  taskStore.updateTask(updatedTask);
  console.log(updated)
  localStorage.setItem("tasks", JSON.stringify(taskStore.tasks))
}

const deleteTask = (taskId) => {
  if (confirm('Are you sure you want to delete this?')) {
    taskStore.removeTask(taskId);
    localStorage.setItem("tasks", JSON.stringify(taskStore.tasks))
  }
}
</script>