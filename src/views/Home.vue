<template>
  <div class="home">
    <SearchBox />
    <template v-if="countries">
      <CountryList 
        :countries="countries"
        @redirect-to="gotoDetail"
      />
    </template>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue'
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
    const getCountries =  url => {
      fetch(url)
        .then(res   => res.json())
        .then(data  => countries.value = data)
        .catch(err  => console.error(err))
    }
    getCountries('https://restcountries.eu/rest/v2/all')

    const gotoDetail = country => {
      console.log(country)
    }
    
    return { countries, gotoDetail }
  }
}
</script>

