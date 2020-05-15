<template>
  <section class="card shadow-sm radius">
    <div class="card-body text-center">
      <h3 class="card-title">{{ title }}</h3>
      <h5 class="card-subtitle text-secondary mb-2">{{ subtitle }}</h5>
      <slot name="buttons"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "MainCard",
  props: ['title', 'subtitle', 'buttons', 'id']
}
</script>