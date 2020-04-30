<template>
  <div>
    <Header></Header>

    <div class="pa-3 bg-light">
      <router-view></router-view>
    </div>
  </div>
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
