<template>
  <div>
    <v-app-bar
      color="deep-blue-grey darken-3"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>To do</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      fixed
      elevate-on-scroll
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/dashboard">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item v-for="project in projects" :key="project.id" :to="'/project/' + project.id">
            <v-list-item-title>{{ project.name }}</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Header",
  data: () => ({
    drawer: false,
    projects: null
  }),
  async mounted() {
    await axios.get('http://localhost:8000/api/projects')
      .then( (response) => { this.projects = response.data.projects} )
      .catch( (error) => { this.projects = error } )
  }
}
</script>