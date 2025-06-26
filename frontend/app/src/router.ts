// router/index.js
import { createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import DrawingNew from './views/drawings/New.vue'
import DrawingRevision from './views/drawings/Revision.vue'
import DrawingShow from './views/drawings/Show.vue'

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
    path: '/drawings/new',
    component: DrawingNew,
  },
  {
    path: '/drawings/:id',
    name: 'DrawingShow',
    component: DrawingShow,
    props: true, // ← これを付けると props として `id` を受け取れる
  },
  {
    path: '/drawings/:id/revision',
    name: 'DrawingRevision',
    component: DrawingRevision,
    props: true, // ← これを付けると props として `id` を受け取れる
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router