<template>
  <NavBar @toggle-theme="setTheme"/>
    <router-view/>
</template>
<script>

import { ref, provide } from 'vue'
import NavBar from './components/NavBar.vue'

export default {
  components: { 
    NavBar
  },
  setup() {
    const countries = ref({})
    const getCountries =  url => {
      fetch(url)
        .then(res   => res.json())
        .then(data  => countries.value = data)
        .catch(err  => console.error(err))
    }
    
    getCountries('https://restcountries.eu/rest/v2/all')
    provide('countries', countries)

    // Check if the darkmode is enabled
    if (window.matchMedia('prefers-color-scheme: light').matches) {
      // It's a dark theme...
      return  window.document.body.classList.add('dark-mode')
    }

    const setTheme = () => {
      window.document.body
        .classList.toggle('dark-mode')
    }
   


  return { setTheme }
  }
}
</script>
<style lang="scss">
@import './assets/style.scss';

#app {
  width: 100%;
  @include flex(column, '', center);
}

@media only screen and (min-width: 1030px) {
  #app {
    align-items: center;
  }
}
</style>
