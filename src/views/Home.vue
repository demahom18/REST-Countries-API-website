<template>
  <div class="home">
    <SearchBox />
    <CountryList :countries="countries"/>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import CountryList from '../components/CountryList.vue'
import SearchBox from '../components/SearchBox.vue'

export default {
  name: 'Home',
  components: {
    CountryList,
    SearchBox,
  },
  setup() {
    const countries = ref({})
  
    const getCountries = onBeforeMount(() => {
      fetch(
        'https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(data =>  countries.value = data)
        .catch(err => console.error(err))
    })

    

    return { countries, getCountries }
  }
}
</script>

<style lang="scss">

  
</style>
