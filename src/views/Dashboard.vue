<template>
  <div class="container py-4">
    <section class="card shadow-sm radius">
      <div class="card-body text-center">
        <h3 class="card-title">Olá, Ruan</h3>
        <h5 class="card-subtitle text-secondary">Vamos trabalhar em qual projeto agora?</h5>
      </div>
    </section>
    <a class="btn btn-primary rounded-pill btn-primary-smoof w-100 my-3" href="/project/new">Novo projeto</a>
    <section class="card shadow-sm radius">
      <div class="card-body d-flex flex-wrap">
        <article 
          class="col-md-4 p-3" 
          v-for="project in projects" 
          :key="project.id" 
          :href="/project/ + project.id">
          <div class="card card-elevate radius shadow-sm">
            <div class="card-body text-center">
              <h3 class="card-title">{{ project.name }}</h3>
              <h5 class="card-subtitle text-secondary">{{ project.description }}</h5>
              <a class="btn btn-primary rounded-pill align-self-center mt-3" :href="/project/ + project.id">Entrar no projeto</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Dashboard",
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