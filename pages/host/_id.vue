<template>
  <div class="container">
    This is where the host manages the game.
  </div>
    
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'

export default Vue.extend({
  components: {
    Logo
  },
  validate ({ params }) {
    // Must be a five letter word all lowercase
    return /^[A-z]{5}$/.test(params.id)
  }
})
</script>

<style>
</style>
