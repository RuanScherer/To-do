<template>
  <div class="container py-4">
    <MainCard title="Vamos criar algo novo?" subtitle="É bom ver que você está sempre ativo :)"></MainCard>
    <router-view></router-view>
  </div>
</template>

<script>
import MainCard from '../components/MainCard.vue'

export default {
  name: "Create",
  components: {
    MainCard
  }
}
</script>