<template>
  <div class="search">
      <form>
        <div class="search">
          <input 
            type="text" 
            placeholder="Search for a country..."
            v-model="search"
            @input="searchCountries"
          />
        </div>
        <div>
          <select 
            name="filter" 
            id="filter"
            v-model="region"
            @change="searchByZone"
          >
            <option value="">Search by region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
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
import { inject, ref, computed } from 'vue'
export default {
  name: 'SearchBox',
  emits: ['search'],
  setup() {
    const search = ref('')
    const region = ref()
    const countriesByRegion = ref()

    const countries = inject('countries')
    const countriesToShow = ref()
    countriesToShow.value = countries.value
    
    const countriesFiltered = computed({
      get: () => countriesToShow,

      set: newVal => countriesToShow.value = newVal
    })

    return {
      search,
      region,
      countries,
      countriesToShow,
      countriesByRegion,
      countriesFiltered
    }
  },
  methods: {
    searchByZone() { 
      this.countriesByRegion = Array.from(
          this.countries).filter(
            country => country.region == this.region
        )     
      this.countriesFiltered = this.countriesByRegion
      this.$emit('search', this.countriesToShow)
    },
    searchCountries() {      
      if (this.region) {
        
        this.countriesFiltered = Array.from(
          this.countriesByRegion).filter(
            country => country.name.toLowerCase().includes(this.search)
          )
        this.$emit('search', this.countriesToShow)
      }

      else { 
        this.countriesFiltered = Array.from(
          this.countries).filter( 
            country => country.name.toLowerCase().includes(this.search))
        // console.log('countries found:',this.countriesToShow, this.region)
        this.$emit('search', this.countriesToShow)
      }
    }
  }
}
</script>

<style>

</style>