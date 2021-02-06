<template>
  <div class="home">
    <SearchBox @search="getCountriesFiltered" />
    <template v-if="countries">
      <CountryList />
    </template>
  </div>
</template>

<script>
import { inject, provide, ref } from 'vue'
import CountryList from '../components/CountryList.vue'
import SearchBox from '../components/SearchBox.vue'

export default {
  name: 'Home',
  components: {
    CountryList,
    SearchBox,
  },
  setup() {
    const countries = inject('countries')
    const countriesFiltered = ref()
    
    const getCountriesFiltered = 
      countriesFound => countriesFiltered.value = countriesFound
    
    provide('countriesFiltered', countriesFiltered)

    // const gotoDetailPage = country => {
    //   console.log(country)
    // }

    const showCountries = countries => {
      console.log(countries)
    }
    
    return { 
      countries, 
      // gotoDetailPage,
      showCountries,
      getCountriesFiltered
    }
  }
}
</script>

