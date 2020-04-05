<template>
  <div class="main-container">
    <div>
      <logo />
      <h1 class="title">jeoparty</h1>
      <h2 class="subtitle">Jeopardy for everybody</h2>
      <div class="input-group mx-3 input-group-lg" v-if="!thinking">
        <input
          type="text"
          v-model.trim="code"
          class="form-control"
          :class="{ 'is-invalid': error.length > 0} "
          placeholder="Room code..."
          aria-label="the code to the room you want to join"
          aria-describedby="button-addon2"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" id="button-addon2" @click="join">Join</button>
        </div>
        <div class="invalid-feedback">{{error}}</div>
      </div>
      <div v-if="thinking">
        <i class="fas fa-circle-notch fa-spin fa-2x"></i>
        <p>Seeing if your room exists</p>
      </div>

      <div class="links">
        <a href="/host" class="btn btn-outline-success btn-lg">Host</a>
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="btn btn-outline-info btn-lg"
        >Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="btn btn-outline-primary btn-lg"
        >GitHub</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'

export default Vue.extend({
  data: () => {
    return {
      code: '',
      error: '',
      thinking: false
    }
  },
  components: {
    Logo
  },
  methods: {
    async join() {
      this.error = ''
      if (this.code.length != 5) {
        this.error = 'This game code is invalid. It needs to be 5 letters long.'
        this.thinking = false
      } else {
        this.thinking = true
        const result = await this.checkIfRoomExists(this.code)
        this.thinking = false
        if (result) {
          this.gotoRoom(this.code)
        } else {
          this.error = "This game wasn't found"
        }
      }
    },
    gotoRoom(roomcode: string) {
      console.log('Trying to go to ' + roomcode)
      this.$router.push('join-id/' + roomcode)
    },
    async checkIfRoomExists(roomcode: string) {
      try {
        const ip = await (this as any).$axios.$get('/api/games/' + roomcode)
        console.log(ip)
        return true
      } catch (e) {
        console.log(e)
        return false
      }
      return false
    }
  }
})
</script>

<style>
.main-container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
