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
    const error = ref()
    const getCountries = url => {
      fetch(url)
        .then(res   => {
            if (res.ok == false) {
                error.value = 'Error'
                countries.value = []
                return
            }

            return res.json()
        })
        .then(data  => countries.value = data)
        .catch(err  => {
            error.value = err
        })
    }
    
    getCountries('https://restcountries.com/v3.1/all')
    provide('countries', countries)
    provide('apiError', error)

    // Check if the darkmode is enabled
    if (window.matchMedia('prefers-color-scheme: dark').matches) {
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
