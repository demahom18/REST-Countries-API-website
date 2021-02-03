<template>
  <section class="country-list">
    <CountryCard  
      v-for="country in countries"
      :country="country" 
      :key="country.name"
      @click="$emit(`redirectTo`, country)"
    />
  </section>
</template>

<script >
import CountryCard from './CountryCard.vue'
export default {
  name: 'CountryList',
  emits: ['redirectTo'],
  components: { CountryCard },
  props: {
    countries: {
      type: Object,
      required: true 
    }
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
      width:min(90vw, 265px);
    }
  }

  

 
</style>
