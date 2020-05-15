import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Overview from './views/Project/Overview.vue'
import Create from './views/Create.vue'
import CreateProject from './views/Project/Create.vue'
import CreateTask from './views/Task/Create.vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    component: Dashboard
  },
  { 
    path: '/dashboard',
    component: Dashboard
  },
  { 
    path: '/overview/:id',
    component: Overview,
    props: true
  },
  {
    path: '/new/',
    component: Create,
    children: [
      {
        path: 'project',
        component: CreateProject
      },
      {
        path: 'task',
        component: CreateTask
      }
    ]

  }
]

const router = new VueRouter({
  routes: routes
 })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
