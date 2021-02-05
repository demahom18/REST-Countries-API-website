<template>
  <NavBar @toggle-theme="setTheme"/>
  <router-view/>
</template>
<script>

import { ref, provide } from 'vue'
import NavBar from './components/NavBar.vue'
export default {
  components: { NavBar },
  setup(props, context) {
    const countries = ref({})
    const getCountries =  url => {
      fetch(url)
        .then(res   => res.json())
        .then(data  => countries.value = data)
        .catch(err  => console.error(err))
    }
    
    getCountries('https://restcountries.eu/rest/v2/all')
    provide('countries', countries)

  },
  methods: {
    setTheme() {
      const body = this.$el.parentNode.parentNode
      body.classList.toggle('dark-mode')
    }
  }
}
</script>
<style lang="scss">
@import './assets/style.scss';

#app {
  width: 100%;
  @include flex(column, center, center);
}
</style>
