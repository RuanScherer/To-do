<template>
  <div class="container py-4">
    <MainCard :title="project.name" :subtitle="project.description" :buttons="buttons" :id="id"></MainCard>
    <section class="card shadow-sm radius mt-3">
      <div class="card-body d-flex flex-wrap">
        <router-link class="btn btn-primary rounded-pill btn-primary-smoof w-100 mx-3 mb-2" to="/task/new">Nova tarefa</router-link>
        <article 
          class="col-md-4 p-3" 
          v-for="task in tasks" 
          :key="task.id">
          <div class="card card-elevate radius">
            <div class="card-body text-center">
              <h3 class="card-title">{{ task.name }}</h3>
              <h5 class="card-subtitle text-secondary mb-2">{{ task.description }}</h5>
              <router-link class="btn btn-primary rounded-pill align-self-center m-1" :to="/task/ + task.id">Marcar como concluído</router-link>
              <router-link class="btn btn-info rounded-pill align-self-center m-1" :to="/task/ + task.id">Editar</router-link>
              <router-link class="btn btn-danger rounded-pill align-self-center m-1" :to="/task/ + task.id">Remover</router-link>
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
  name: "Project",
  components: {
    MainCard
  },
  props: ['id'],
  data: () => {
    return {
      project: null,
      tasks: null,
      buttons: [
        {
          title: "Editar",
          link: `/project/edit/`,
          theme: "info"
        },
        {
          title: "Remover",
          link: `/project/delete/`,
          theme: "danger"
        }
      ]
    }
  },
  async mounted() {
    await axios.get(`http://localhost:8000/api/projects/${this.id}`)
      .then( async (response) => {
        this.project = response.data.project
        await axios.get(`http://localhost:8000/api/tasks/project/${this.id}`)
          .then( (response) => { this.tasks = response.data.task } )
          .catch( (error) => { this.tasks = error } )
      } )
      .catch( (error) => { this.project = error } )
  }
}
</script>