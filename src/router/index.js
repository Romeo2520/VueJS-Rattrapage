import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import AddTaskView from '@/views/AddTaskView.vue'
import ShowToDoListView from '@/views/ShowToDoListView.vue'
import UpdateTaskView from '@/views/UpdateTaskView.vue'
import InscriptionUsersView from '@/views/InscriptionUsersView.vue'
import ConnexionUsersView from '@/views/ConnexionUsersView.vue'
import ConnexionUsers from '@/components/ConnexionUsers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: InscriptionUsersView
    },

    {
      path: '/login',
      name: 'Connexion',
      component: ConnexionUsersView
    },

    {
      path: '/AddTask',
      name: 'AddTask',
      component: AddTaskView
    },
    {
      path: '/ShowToDoList',
      name: 'ShowToDoList',
      component: ShowToDoListView
    },
    {
      path: '/update/:id',
      name: 'updatetask',
      component: UpdateTaskView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
