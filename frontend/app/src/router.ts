// router/index.js
import { createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import NewDrawing from './views/drawings/New.vue'

const routes: RouteRecordRaw[] = [
  { 
    path: '/',
    component: Dashboard,
  },
  { 
    path: '/dashboard',
    component: Dashboard,
  },
  { 
    path: '/new',
    component: NewDrawing,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router