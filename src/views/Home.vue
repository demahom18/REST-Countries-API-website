<template>
  <div class="home">
    <SearchBox @search="getCountriesFiltered" />
    <template v-if="countries">
      <CountryList 
        @redirect-to="gotoDetail"
      />
    </template>
  </div>
</template>

<script>
import { provide, ref } from 'vue'
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
    const countriesFiltered = ref()
    const getCountries =  url => {
      fetch(url)
        .then(res   => res.json())
        .then(data  => countries.value = data)
        .catch(err  => console.error(err))
    }
    
    getCountries('https://restcountries.eu/rest/v2/all')

    const getCountriesFiltered = 
      countriesFound => countriesFiltered.value = countriesFound
   
    provide('countries', countries)
    provide('countriesFiltered', countriesFiltered)
    
    const gotoDetail = country => {
      console.log(country)
    }

    const showCountries = countries => {
      console.log(countries)
    }
    
    return { 
      countries, 
      gotoDetail,
      showCountries,
      getCountriesFiltered
    }
  }
}
</script>

