import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
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
    path: '/project',
    name: 'Project',
    component: Project
  }
]

const router = new VueRouter({
  routes: routes
 })

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
