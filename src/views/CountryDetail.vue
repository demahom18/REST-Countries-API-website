<template>
  <div class="country-detail">
    <h1>This is the detail page of {{ country.name }}</h1>
  </div>
</template>
<script>
import { inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const countries = inject('countries')

    const country = Array.from(countries.value)
      .find(country => country.name === route.params.countryname)
      
      console.log('country',country)
    return { country }
  }
}
</script>
