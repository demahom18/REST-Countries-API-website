<template>
  <div class="btn-wrap">
    <div class="btn-back">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.81802 3.6967L6.87868 4.75736L3.3785 8.25754H16.7428L16.7428 9.74246H3.3785L6.87868 13.2426L5.81802 14.3033L0.514719 9L5.81802 3.6967Z" fill="#111517"/>
      </svg>
      <span>Back</span>
    </div>
  </div>
  <div class="detail">
    <div class="flag">
      <img 
        :src="country.flag" 
        :alt="`${country.name} flag`"
      />
    </div>
    <div class="infos">
      <div>
        <div class="infos1">
          <h2>{{ country.name }}</h2>
          <p>
            <b>Native name: </b>{{ country.nativeName }}<br> 
            <b>Population: </b>{{ country.population }}<br>   
            <b>Region: </b>{{ country.region }}<br> 
            <b>Sub Region: </b>{{ country.subregion }}<br>  
            <b>Capital: </b>{{ country.capital }}<br>
          </p>
        </div>
        <div class="infos2">
          <p>
            <b>Top level domain: </b>{{ country.topLevelDomain }}<br> 
            <b>Currencies: </b>{{ country.currencies }}<br> 
            <b>Languages: </b>{{ country.languages }}<br> 
          </p>
        </div>
      </div>
      <div class="borders">
        <p><b>Border Countries: </b>{{ country.borders }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { inject } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const countries = inject('countries')

    const country = Array.from(countries.value)
      .find(country => country.name === route.params.countryname)
      
    return { country }
  }
}
</script>
<style lang="scss" >
@import '../assets/style.scss';

.button-wrap {
  position: relative;
  height:100px;
}

.btn-back {
  @include flex();
  background: white;
  cursor:pointer;
  position: absolute;
  padding: 7px 24px;
  margin: 40px 0;
  left:180px;
  transform: translateX(-100%);
  
  &:hover {
    @include d-shadow($shadow-light, 0, 0, 7px);
  }

  span { 
    padding: 0 8px; 
    font-size: 14px;
  }
}

.detail{
  @include flex('', center, center);
  flex-wrap: wrap;
  margin-top: 130px;
    
  > * {
    flex-basis: 560px;
    width: min(90vw, 560px);
  }

  img {
    max-height: 400px;
    border-radius: 5px;
    width: clamp(320px, 85vw, 560px);
    margin-bottom: 40px;
  }

  h2 {
    padding-bottom: 16px;
    font-size: 32px;      
  }  

  .infos1, .infos2 {
    margin: 16px 0;
    line-height: 32px;
  }
}

body.dark-mode  .btn-back{
  background: $el-bg-dark-mode;
  
  &:hover {
    @include d-shadow($shadow-dark, 0, 0, 7px);
  }

  path {
    fill: $text-dark-mode;
  }
}

@media only screen and (max-width:630px) {
  .btn-back {
    left: 130px;
  }
  
  .detail {
    padding-left: 30px;
    padding-right: 30px;
    
    h2 {
      font-size:22px;
    }
  }
}

@media only screen and (min-width:630px) {
  p, b, span {
    font-size: 16px !important;
  } 
}

@media only screen and (min-width:1030px) {
  .infos {
    padding: 0 0 0 min(120px, 9vw);
    margin-right: 80px;
    justify-content: space-between;

    > div:first-child {
      @include flex();
      flex-wrap: wrap;
      gap: max(50px, 7vw);
      width: 50vw;
        
      > * {
        flex-basis: 220px;
      }
    }
  }

  .detail {
    h2 {
      position: absolute;
      transform: translateY(-70px);
    }

    .infos1, .infos2 {
      transform: translateY(50px);
    }
  }
}

</style>
