<template>
  <div class="main-container">
    <div class="container">
      <h1 class="title">
        Create a new game
      </h1>
      <h2 class="subtitle">
        Select what options you want
      </h2>
      <template v-for="option,index in options">
        <div class="form-check" v-if="option.type == 'checkbox'" >
          <input class="form-check-input" type="checkbox" value="" :name="option.name" :id="'value' + option.name" v-model="options[index].value">
          <label class="form-check-label" :for="'value' + option.name">
            {{option.label}}
          </label>
        </div>
        <form class="form-inline" v-else-if="option.type == 'number'">
          <label :for="'value' + option.name">{{option.label}}</label> &nbsp;
          <input type="number" class="form-control mb-2 mr-sm-2" :name="option.name" :id="'value' + option.name" v-model="options[index].value">
        </form>
        <div v-else>
          Unknown option: {{option}}
        </div>
      </template>
      <br/>
      <div>
        <p class="text-danger" v-if="error">We failed to create your game, please wait a minute and try again</p>
        <button v-if="!thinking" class="btn btn-lg btn-success" @click="submit">start</button>
        <i v-else class="fas fa-circle-notch fa-spin fa-2x"></i>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      options: [
        {name: "cat_vote", label: "Allow players to vote Categories", value: true, type:"checkbox"},
        {name: "final_jep", label: "Have a Final Jeopardy Question", value: false, type:"checkbox"},
        {name: "daily_dub", label: "Do the Daily double", value: true, type:"checkbox"},
        {name: "num_rounds", label: "The number of rounds to play", value:1, type:"number"},
      ],
      thinking: false,
      error: false
    }
  },
  methods: {
    async submit() {
      this.thinking = true;
      this.error = false;
      var data: {[key:string]: string|number|boolean} = {};
      this.options.forEach( (x) => {
        data[x.name] = x.value;
      })
      console.log(data);
      try {
        const response = await (this as any).$axios.$post('/api/games/', data)
        console.log("Got new game code: "+ response);
        if (response.length == 5) this.$router.replace('/host/'+response);
      }
      catch (e) {
        console.error(e);
        this.error = true;
      }
      this.thinking = false;
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

</style>
