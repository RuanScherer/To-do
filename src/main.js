import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Project from './views/Project.vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  { 
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  { 
    path: '/project/:id',
    name: 'Project',
    component: Project,
    props: true
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
