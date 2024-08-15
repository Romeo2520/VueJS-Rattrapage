<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore'; // Importation de la store Pinia
import router from '@/router';
const showForm = ref(false)
const task = ref({
  title: '',
  description: '',
  startDate: '',
  dueDate: '',
  priority: ''
});

const taskStore = useTaskStore();

const submitTask = () => {
  taskStore.addTask(task.value.title, task.value.description, task.value.startDate, task.value.dueDate, task.value.priority);
  
  // console.log(task.value.title)
  // Réinitialiser le formulaire après soumission
  task.value = {
    title: '',
    description: '',
    startDate: '',
    dueDate: '',
    priority: ''
  };
  showForm.value = false;
  router.push('/ShowToDoList')
};

const closeForm = () => {
  showForm.value = false;
}
</script>

<template>
   <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-bold mb-4">Add a task </h2>
      <form @submit.prevent="submitTask">
        <div class="mb-4">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="title">Title</label>
          <input v-model="task.title" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="title" type="text" placeholder="Ajoutez un titre" required>
        </div>
        <div class="mb-4">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description">Description</label>
          <textarea v-model="task.description" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" placeholder=""></textarea>
        </div>
        <div class="mb-4">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="start-date">Starting date</label>
          <input v-model="task.startDate" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" id="start-date" required>
        </div>
        <div class="mb-4">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="due-date">Ending date</label>
          <input v-model="task.dueDate" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" id="due-date" required>
        </div>
        <div class="mb-4">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="priority">Priority</label>
          <select v-model="task.priority" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="priority" required>
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div class="flex justify-between mt-4">
          
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Submit</button> 
          <RouterLink :to="`/ShowToDoList`">
          <button type="button" @click="closeForm" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button></RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>


