<template>
  <div class="d-flex flex-wrap">
    <v-col v-for="project in projects" :key="project.id" cols="4" class="pa-2">
      <v-card elevation="2" class="pa-2">
        <v-card-title>{{ project.name }}</v-card-title>
        <v-card-text>{{ project.description }}</v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="blue-grey darken-3"
            :to="'/project/' + project.id"
          >
            Gerenciar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
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