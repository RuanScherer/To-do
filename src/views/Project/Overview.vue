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
      @delete-task="deleteTask()">
    </DeleteModal>
    <DeleteModal 
      id="deleteProjectModal" 
      title="Excluir projeto"
      text="Tem certeza que deseja excluir o projeto?"
      action="delete-project"
      buttonText="Sim, excluir"
      @delete-project="deleteProject()">
    </DeleteModal>
    <section class="card shadow-sm radius mt-3">
      <div class="card-body d-flex flex-wrap">
        <div class="d-flex flex-column align-items-center flex-md-row justify-content-md-between mb-2 px-3 w-100">
          <div class="form-group">
            <select 
              class="form-control rounded-pill" 
              @change="updateTasks()"
              v-model="filter">
              <option value="1" selected>Todas</option>
              <option value="2">Concluídas</option>
              <option value="3">Não concluídas</option>
            </select>
          </div>
          <div>
            <router-link class="btn btn-primary rounded-pill btn-primary-smoof no-elevate mr-2" to="/new/task">Nova tarefa</router-link>
            <button class="btn btn-primary rounded-pill btn-primary-smoof no-elevate" @click="updateTasks()">Atualizar</button>
          </div>
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
                <button 
                  class="btn btn-primary rounded-pill align-self-center m-1" 
                  v-if="task.complete == false"
                  :key="'setAsFinished-' + task._id"
                  @click="setAsFinished(task._id)">
                  Marcar como concluído
                </button>
                <button 
                  class="btn btn-dark rounded-pill align-self-center m-1" 
                  v-else
                  :key="'setAsFinished-' + task._id"
                  @click="setAsUnfinished(task._id)">
                  Marcar como não concluído
                </button>
                <router-link class="btn btn-info rounded-pill align-self-center m-1" :to="'/edit/task/' + task._id">Editar</router-link>
                <button 
                  class="btn btn-danger rounded-pill align-self-center m-1" 
                  @click="setTaskToDelete(task._id)"
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
      filter: 1,
      taskToDelete: null
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
      switch(Number(this.filter)) {
        case 1:
          await axios.get(`https://ruanscherer-todo.herokuapp.com/task/project/${this.id}`)
            .then( (response) => { this.tasks = response.data.tasks } )
            .catch( (error) => { this.tasks = error } )
          break
        case 2:
          await axios.get(`https://ruanscherer-todo.herokuapp.com/task/project/${this.id}/finished`)
            .then( (response) => { this.tasks = response.data.tasks } )
            .catch( (error) => { this.tasks = error } )
          break
        case 3:
          await axios.get(`https://ruanscherer-todo.herokuapp.com/task/project/${this.id}/unfinished`)
            .then( (response) => { this.tasks = response.data.tasks } )
            .catch( (error) => { this.tasks = error } )
          break
        default:
          await axios.get(`https://ruanscherer-todo.herokuapp.com/task/project/${this.id}`)
            .then( (response) => { this.tasks = response.data.tasks } )
            .catch( (error) => { this.tasks = error } )
          break
      }
    },
    async setAsUnfinished(taskId) {
      await axios.put(`https://ruanscherer-todo.herokuapp.com/task/update/${taskId}`, { complete: false })
        .then( () => { this.updateTasks() } )
        .catch( () => { this.updateTasks() } )
    },
    async setAsFinished(taskId) {
      await axios.put(`https://ruanscherer-todo.herokuapp.com/task/update/${taskId}`, { complete: true })
        .then( () => { this.updateTasks() } )
        .catch( () => { this.updateTasks() } )
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