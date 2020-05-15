<template>
  <div class="container py-4">
    <MainCard title="Estamos em constante mudança..." subtitle="Não se preocupe, entendemos que é normal"></MainCard>
    <router-view></router-view>
  </div>
</template>

<script>
import MainCard from '../components/MainCard.vue'

export default {
  name: "Edit",
  components: {
    MainCard
  }
}
</script>