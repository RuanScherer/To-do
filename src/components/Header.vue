<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container"> 
      <h1 class="navbar-brand">To do</h1>
      <button 
        class="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item dropdown">
            <a 
              class="nav-link dropdown-toggle" 
              href="#" 
              id="navbarDropdown" 
              role="button" 
              data-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="false"
              @click="getProjects" >
              Seus projetos
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link 
                class="dropdown-item" 
                v-for="project in projects" 
                :key="project._id" 
                :to="'/overview/' + project._id">
                {{ project.name }}
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  name: "Header",
  data: () => ({
    projects: null
  }),
  methods: {
    async getProjects() {
      await axios.get('https://ruanscherer-todo.herokuapp.com/project/all')
      .then( (response) => { this.projects = response.data.projects} )
      .catch( (error) => { this.projects = error } )
    }
  }
}
</script>