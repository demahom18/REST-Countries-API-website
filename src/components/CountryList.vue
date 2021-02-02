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
 @import '../assets/style.scss'; 

  .country-list {
    @include flex(column, '', '');
    flex-basis: 100%;
  }

  .country-card {
    margin: 20px;
    width:min(90vw, 350px);
    border-radius: 5px; 
    background: white;
    img { 
      border-radius: 5px 5px 0 0; 
    }

    h2 {font-size: 18px;}
  }

 .country-infos {
   padding: 20px;
   p { padding: 0 5px;}

   span {
     @include flex('', center, '');
    font-size: 14px;
  }
  
 }
 body.dark-mode .country-card {
   background: $el-bg-dark-mode;
 }

 
</style>