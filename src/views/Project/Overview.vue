<template>
  <div class="container py-4">
    <MainCard 
      :title="project.name" 
      :subtitle="project.description"
      :id="id">
      <template #buttons>
        <router-link
          class="btn btn-info btn-info-smoof no-elevate rounded-pill align-self-center m-1" 
          :to="'/edit/project/' + id">
          Editar
        </router-link>
        <button
          class="btn btn-danger btn-danger-smoof no-elevate rounded-pill align-self-center m-1" 
          data-toggle="modal" 
          data-target="#deleteProjectModal">
          Excluir
        </button>
      </template>
    </MainCard>
    <DeleteModal 
      id="deleteTaskModal" 
      title="Remover tarefa"
      text="Tem certeza que deseja remover a tarefa?"
      action="delete-task"
      buttonText="Sim, remover"
      v-on:delete-task="deleteTask()">
    </DeleteModal>
    <DeleteModal 
      id="deleteProjectModal" 
      title="Excluir projeto"
      text="Tem certeza que deseja excluir o projeto?"
      action="delete-project"
      buttonText="Sim, excluir"
      v-on:delete-project="deleteProject()">
    </DeleteModal>
    <section class="card shadow-sm radius mt-3">
      <div class="card-body d-flex flex-wrap">
        <div class="d-flex justify-content-between mb-2 px-3 w-100">
          <router-link class="btn btn-primary rounded-pill btn-primary-smoof no-elevate" to="/new/task">Nova tarefa</router-link>
          <button class="btn btn-primary rounded-pill btn-primary-smoof no-elevate" v-on:click="updateTasks()">Atualizar</button>
        </div>
        <article 
          class="col-md-4 p-3" 
          v-for="task in tasks" 
          :key="task.id">
          <div class="card card-elevate radius h-100">
            <div class="card-body text-center d-flex flex-column justify-content-center align-items-center">
              <h3 class="card-title">{{ task.name }}</h3>
              <h5 class="card-subtitle text-secondary mb-2">{{ task.description }}</h5>
              <div class="d-flex flex-wrap justify-content-center">
                <router-link class="btn btn-primary rounded-pill align-self-center m-1" :to="/task/ + task.id">Marcar como concluído</router-link>
                <router-link class="btn btn-info rounded-pill align-self-center m-1" :to="/task/ + task.id">Editar</router-link>
                <button 
                  class="btn btn-danger rounded-pill align-self-center m-1" 
                  v-on:click="setTaskToDelete(task._id)"
                  data-toggle="modal" 
                  data-target="#deleteTaskModal">
                  Remover
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import MainCard from '../../components/MainCard.vue'
import DeleteModal from '../../components/DeleteModal.vue'

export default {
  name: "Project",
  components: {
    MainCard,
    DeleteModal
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
      ],
      taskToDelete: null,
      deleteStatus: false
    }
  },
  methods: {
    setTaskToDelete: function(value) {
      this.taskToDelete = value
    },
    deleteProject: function() {
      axios.delete(`https://ruanscherer-todo.herokuapp.com/project/destroy/${this.$route.params.id}`)
        .then( () => { this.$router.replace("/dashboard") } )
        .catch( () => {} )
      this.updateTasks()
    },
    deleteTask: function() {
      axios.delete(`https://ruanscherer-todo.herokuapp.com/task/destroy/${this.taskToDelete}`)
        .then( () => { this.updateTasks() } )
        .catch( () => { this.updateTasks() } )
      this.updateTasks()
    },
    updateTasks: async function() {
      await axios.get(`https://ruanscherer-todo.herokuapp.com/task/project/${this.id}`)
        .then( (response) => { this.tasks = response.data.tasks } )
        .catch( (error) => { this.tasks = error } )
    }
  },
  async mounted() {
    await axios.get(`https://ruanscherer-todo.herokuapp.com/project/id/${this.id}`)
      .then( async (response) => {
        this.project = response.data.project
        this.updateTasks()
      } )
      .catch( (error) => { this.project = error } )
  }
}
</script>