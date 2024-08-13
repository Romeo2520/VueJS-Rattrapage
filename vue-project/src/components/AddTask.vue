<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore'; // Importation de la store Pinia

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
};
</script>

<template>
  <form class="w-full max-w-lg" @submit.prevent="submitTask">
    <div class="">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="title">Title</label>
        <input v-model="task.title" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="title" type="text" placeholder="Ajoutez un titre" required>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description">Description</label>
        <textarea v-model="task.description" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" placeholder=""></textarea>
      </div>
    </div>
    <div class="">
      <div class="w-full md:w-56 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="start-date">Starting date</label>
        <input v-model="task.startDate" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" id="start-date" required>
      </div>
      <div class="w-full md:w-56 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="due-date">expiry date</label>
        <input v-model="task.dueDate" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" id="due-date" required>
      </div>
      <div class="w-full md:w-56 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="priority">Priority</label>
        <select v-model="task.priority" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="priority" required>
          <option value="To do">A faire </option>
          <option value="Doing">En cours </option>
          <option value="Done">Déja fait</option>
        </select>
      </div>
    </div>
    <div class="border-2 w-16 bg-black text-white ml-36 mt-2">
      <a href="/ShowToDoList">
      <button type="submit" class="w-full py-2">Submit</button>
    </a>
    </div>
  </form>
</template>


