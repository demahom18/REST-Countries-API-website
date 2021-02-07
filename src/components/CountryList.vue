<template>
    <section 
    class="country-list" 
    v-if="countries.length > 0"
  >
    <TransitionGroupAnim>
      <CountryCard  
      v-for="country in countries"
      :country="country" 
      :key="country.name"
      @click="$emit(`showDetail`, country)"
    />
    </TransitionGroupAnim>
  </section>
  <div v-else class="no-result">
    <h2>No result found</h2>
  </div>
  
</template>

<script >
import { inject, computed } from 'vue'
import CountryCard from './CountryCard.vue'
import TransitionGroupAnim from './TransitionGroupAnim.vue'

export default {
  name: 'CountryList',
  emits: ['showDetail'],
  components: { CountryCard, TransitionGroupAnim },
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
  .no-result {
    display: grid;
    margin-top: 100px;
    place-content: center;
  }
</style>
