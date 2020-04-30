<template>
  <div class="container py-4">
    <MainCard title="Olá, Ruan" subtitle="Em qual projeto vamos trabalhar agora?"></MainCard>
    <section class="card shadow-sm radius mt-3">
      <div class="card-body d-flex flex-wrap">
        <router-link class="btn btn-primary rounded-pill btn-primary-smoof w-100 mx-3 mb-2" to="/project/new">Novo projeto</router-link>
        <article 
          class="col-md-4 p-3" 
          v-for="project in projects" 
          :key="project.id">
          <div class="card card-elevate radius">
            <div class="card-body text-center">
              <h3 class="card-title">{{ project.name }}</h3>
              <h5 class="card-subtitle text-secondary">{{ project.description }}</h5>
              <router-link class="btn btn-primary rounded-pill align-self-center mt-3" :to="/project/ + project.id">Entrar no projeto</router-link>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import MainCard from '../components/MainCard.vue'

export default {
  name: "Dashboard",
  components: {
    MainCard
  },
  data: () => {
    return {
      projects: null
    }
  },
  async mounted() {
    await axios.get('http://localhost:8000/api/projects')
      .then( response => { this.projects = response.data.projects } )
      .catch( (error) => { this.projects = error } )
  }
}
</script>