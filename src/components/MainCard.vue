<template>
  <section class="card shadow-sm radius">
    <div class="card-body text-center">
      <h3 class="card-title">{{ title }}</h3>
      <h5 class="card-subtitle text-secondary mb-2">{{ subtitle }}</h5>
      <router-link 
        v-for="button in buttons" 
        :key="button.title" 
        :class="'btn btn-' + button.theme + '-smoof no-elevate rounded-pill align-self-center m-1'" 
        :to="button.link + id">
        {{ button.title }}
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "MainCard",
  props: ['title', 'subtitle', 'buttons', 'id']
}
</script>