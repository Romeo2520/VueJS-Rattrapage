<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 opacity-50 z-50">
    <div class="update-task bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h1 class="text-2xl font-bold mb-4">Modify task</h1>
      <form @submit.prevent="submitUpdate">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium">Title</label>
          <input id="title" v-model="task.title" type="text" class="mt-1 block w-full p-2 border rounded" required />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium">Description</label>
          <textarea id="description"  v-model="task.description" class="mt-1 block w-full p-2 border rounded" required ></textarea> 
        </div>
        <div class="mb-4">
          <label for="startDate" class="block text-sm font-medium">Starting date</label>
          <input id="startDate" v-model="task.startDate" type="date"  class="mt-1 block w-full p-2 border rounded" required />   
        </div>
        <div class="mb-4">
          <label for="dueDate" class="block text-sm font-medium">Ending date</label>
          <input id="dueDate" v-model="task.dueDate" type="date" class="mt-1 block w-full p-2 border rounded" required/>
        </div>
        <div class="mb-4">
          <label for="priority" class="block text-sm font-medium">Priority</label>
          <input  id="priority" v-model="task.priority" type="text" class="mt-1 block w-full p-2 border rounded" required/>
        </div>
        <div class="flex justify-between mt-4">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
        <button @click="cancelUpdate" type="button" class="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
      </div>
      </form>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useTaskStore } from '@/stores/taskStore';
  // import router from '@/router';
  
  const route = useRoute();
  const router = useRouter();
  const taskStore = useTaskStore();
  
  const taskId = route.params.id;
  const task = ref({
    title: '',
    description: '',
    startDate: '',
    dueDate: '',
    priority: ''
  });
  
  onMounted(() => {
    const existingTask = taskStore.tasks.find(t => t.id === taskId);
    if (existingTask) {
      task.value = { ...existingTask };
    } else {
      router.push('/ShowToDoList');
    }
  });
  
  const submitUpdate = () => {
    taskStore.updateTask(task.value);
    router.push('/ShowToDoList');
  };
  
  const cancelUpdate = () => {
    router.push('/ShowToDoList');
  };
  </script>
  