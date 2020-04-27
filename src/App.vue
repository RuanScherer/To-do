<template>
  <v-app>
    <Header></Header>

    <v-content class="pa-3 blue-grey lighten-5">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'App',

  components: {
    Header
  }
};
</script>
