<template>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Login here
            </h1>
            <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com" required>
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              </div>
              <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account? <a href="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Create account here</a>
              </p>
              <div v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; // Import useRouter
  import { useUsersStore } from '@/stores/UsersStore';
  
  export default {
    setup() {
      const router = useRouter(); // Get the router instance
      const usersStore = useUsersStore();
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
  
      const handleLogin = async () => {
        try {
          await usersStore.login(email.value, password.value);
          router.push('/ShowToDoList'); // Navigate to the ToDo list page on successful login
          errorMessage.value = ''; // Clear any previous error messages
        } catch (error) {
          errorMessage.value = error.message; // Set error message for display
        }
      };
  
      return { email, password, handleLogin, errorMessage };
    }
  };
  </script>
  