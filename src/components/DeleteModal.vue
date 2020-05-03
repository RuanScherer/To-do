<template>
  <div class="modal" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog" role="document">
      <div class="modal-content radius">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{{ text }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-link-dark no-elevate m-1" data-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-danger rounded-pill m-1" data-dismiss="modal" v-on:click="call()">{{ buttonText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteModal",
  props: ['id', 'title', 'text', 'action', 'buttonText'],
  methods: {
    call: function() {
      this.$emit(this.action)
    }
  }
}
</script>