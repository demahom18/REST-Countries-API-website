<template>
  <div class="search">
      <form>
        <div class="search">
          <input 
            type="text" 
            placeholder="Search for a country..."
            v-model="searchText"
            @input="$emit('search', countriesFiltered)"
          />
        </div>
        <div>
          <select name="filter" id="filter">
            <option value="">Search by region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </form>
    </div>
</template>
<script>
// $emit('search', countriesFiltered)
import { onBeforeMount, inject, ref, computed } from 'vue'
export default {
  name: 'SearchBox',
  emits: ['search'],
  setup() {
    const searchText = ref('')
    const countries = inject('countries')
    
    const countriesFiltered  = computed(() => {
      let countriesInjected = Array.from(countries.value)
      let text = searchText.value.toLowerCase()
      console.log('text: ', countriesInjected)
      return countriesInjected.filter( 
        country => country.name.toLowerCase().includes(text))
    })
    // const searchCountries = () => {
    //   console.log('searchText: ', searchText.value)
     
    //     console.log('searchText end: ', searchText.value)
    // }
    // watch(searchText, () => searchCountries())

    return {
      searchText,
      countriesFiltered,
      // searchCountries
    }
  },
  // methods: {
  //   filterCountries() {
  //     console.log('methods:', this.countriesFiltered)
  //     this.$emit('search', this.countriesFiltered)
  //   }
  // }
}
</script>

<style>

</style>