<template>
  <div class="search">
      <form>
        <div class="search">
          <input 
            type="text" 
            placeholder="Search for a country..."
            v-model="search"
            @input="searchByName"
          />
        </div>
        <div>
          <select 
            name="filter" 
            id="filter"
            v-model="region"
            @change="searchByRegion"
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
    searchByRegion() { 
      if (this.region && this.region.length > 0) {
        this.countriesByRegion = this.filterByRegion(this.countries, this.region)
        this.countriesFiltered = this.countriesByRegion
        this.$emit('search', this.countriesToShow)
      }
      else {
        this.$emit('search', this.countries)
      }
    },
    searchByName() {      
      if (this.region && this.region.length > 0) {
        this.countriesFiltered = this.filterByName(this.countriesByRegion, this.search)
        this.$emit('search', this.countriesToShow)
      }
      else { 
        this.countriesFiltered = this.filterByName(this.countries, this.search)
        this.$emit('search', this.countriesToShow)
      }
    },
    /**
     * Filter an iterator by the name of its items.
     * 
     * @param {*} iter iterator to filter
     * @param {*} input the input to filter by name
     * @returns { Array } the array filtered
     */
    filterByName (iter, input) {
      return Array.from(iter).filter(it => it.name.toLowerCase().includes(input))
    },
    //Same as filterByName 
    filterByRegion (iter, reg) {
      return Array.from(iter).filter(it => it.region.includes(reg))
    }
  }
}
</script>

<style>

</style>