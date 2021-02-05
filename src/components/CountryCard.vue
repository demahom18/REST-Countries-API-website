<template>
  <div class="country-card">
    <router-link 
      :to="{ 
        name: 'CountryDetail', 
        params: { countryname: country.name }
      }"
    >
      <img 
        :src="country.flag" 
        :alt="`${country.name} flag`"
      />
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
    </router-link>
  </div>
</template>

<script>
export default {
props: {
  country: {
    type: Object,
    required: true
  }
}
}
</script>

<style lang="scss">
 @import '../assets/style.scss'; 

.country-card {
    margin: 36px;
    transform: translateZ(0);
    border-radius: 5px;
    cursor: pointer; 
    background: white;
    min-height: 330px;
    transition: all .3s;
    &:hover {
      @include d-shadow();
    }

    img { 
      border-radius: 5px 5px 0 0; 
      height: 160px;
      width: 100%;
    }

    h2 {font-size: 18px;}
  }

 .country-infos {
   padding: 24px;
   p { padding: 0 5px;}

   span {
    @include flex('', center, '');
    &, h3 { font-size: 14px;}
    padding: 4px 0;
    &:first-of-type {padding-bottom: 12px;}
  }
  
 }
 
 body.dark-mode .country-card {
   background: $el-bg-dark-mode;
   &:hover {
      @include d-shadow($shadow-dark)
    }
 }

 @media only screen and (max-width:680px) {
   .country-card { margin: 20px;}
 }
</style>