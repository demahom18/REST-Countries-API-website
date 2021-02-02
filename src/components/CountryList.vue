<template>
  <section class="country-list">
    <div 
      v-for="country in countries" 
      :key="country.name"
      class="country-card"
    >
      <img :src="country.flag" :alt="`${country.name} flag`">
      <div class="country-infos">
        <span>
          <h2>{{ country.name }}</h2>
        </span>

        <span>
          <h3>Population: </h3>
          <p>{{ country.population }}</p>
        </span>

        <span>
          <h3>Region: </h3>
          <p>{{ country.region }}</p>
        </span>

        <span>
          <h3>Capital: </h3>
          <p>{{ country.capital }}</p>
        </span>
      </div>
     
    </div>
  </section>
</template>

<script >
export default {
  name: 'CountryList',
  props: {
    countries: {
      type: Object,
      required: true, 
    }
  }
}
</script>

<style lang="scss">

$card-bg : hsl(0, 0%, 100%);

  .country-list {
    display: flex;
    flex-basis: 100%;
    flex-direction: column;
  }

  .country-card {
    margin: 20px;
    width:min(90vw, 350px);
    background: $card-bg;
    img { 
      border-radius: 5px 5px 0 0; 
    }

    
  }

 .country-infos {
   padding: 20px;
   span {
    display:flex;
    align-items:  center;
  }
  p {
    padding: 0 5px;
  }
 }

 
</style>