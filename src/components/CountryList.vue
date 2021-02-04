<template>
  <section 
    class="country-list" 
    v-if="countries.length > 0"
  >
    <CountryCard  
      v-for="country in countries"
      :country="country" 
      :key="country.name"
      @click="$emit(`redirectTo`, country)"
    />
  </section>
  <div v-else>
    <h2>No result found</h2>
  </div>
</template>

<script >
import { inject, computed } from 'vue'
import CountryCard from './CountryCard.vue'

export default {
  name: 'CountryList',
  emits: ['redirectTo'],
  components: { CountryCard },
  setup() {
    const countries = inject('countries')
    const countriesFiltered = inject('countriesFiltered')

    const countriesToDisplay = computed(() => {
      if (countriesFiltered.value != undefined) {
        return countriesFiltered.value  
      }
      else return countries.value
    })

    return { countries: countriesToDisplay }
  }
}
</script>

<style lang="scss">
 @import '../assets/style.scss'; 

  .country-list {
    @include flex('', center, center);
    flex-wrap: wrap;
    max-width: 1440px;
    
    > * {
      flex-basis: 265px;
      width: min(90vw, 265px);
    }
  }

  

 
</style>
