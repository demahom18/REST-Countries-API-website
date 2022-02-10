<template>
    <div class="country-detail-page" v-if="country">
        <div class="btn-wrap">
        <router-link :to="{ name: 'Home' }">
            <div class="btn back">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.81802 3.6967L6.87868 4.75736L3.3785 8.25754H16.7428L16.7428 9.74246H3.3785L6.87868 13.2426L5.81802 14.3033L0.514719 9L5.81802 3.6967Z" fill="#111517"/>
            </svg>
            <span>Back</span>
            </div>
        </router-link>
        </div>
        <div class="detail">
            <div class="flag">
                <img 
                    :src="country.flags.png" 
                    :alt="`${country.name.common} flag`"
                />
            </div>
            <div class="infos">
                <h2>{{ country.name.common }}</h2>
                <div class="infos1">
                    <p>
                        <b>Native name: </b>{{ countryNativeName }}<br> 
                        <b>Population: </b>{{ population }}<br>   
                        <b>Region: </b>{{ country.region }}<br> 
                        <b>Sub Region: </b>{{ country.subregion }}<br>  
                        <b>Capital: </b>{{ country.capital }}<br>
                    </p>
                    <p>
                        <b>Top Level Domain: </b>
                        <span
                        v-for="(domain, i) in country.tld"
                        :key="domain"
                        >{{ domain }} {{ i > 0 && i != country.tld.length ? ',' : '' }}
                        </span> <br>

                        <b>Currencies: </b>
                        <span 
                        v-for="currency in country.currencies"
                        :key="currency.code"
                        >{{ currency.name }}
                        </span><br> 

                        <b>Languages: </b>
                        <span 
                        v-for="(lang, i) in countryLanguages"
                        :key="`lang` + i"
                        class="language"
                        >{{ lang + ', '}}
                        </span><br> 
                    </p>
                </div>
                <div class="borders">
                    <p>
                        <b>Border Countries: </b>
                        <div>
                            <span 
                                v-for="border in borders" 
                                :key="border + Math.random()*100"
                                class="border-pill btn"
                                @click="gotoPage(border)"
                            > {{ border }}
                            </span>
                        </div> 
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { inject } from 'vue'

export default {
    props: {
        countryname: {
        type: String,
        required: true
        }
    },
    setup() {
        const countries = inject('countries')

        return { 
        countries,
        }
    },
    methods: {
        gotoPage(border) {
            let countryToGo = this.borders
                .find(c => c.includes(border))

            this.$router.push({
                name: 'CountryDetail', 
                params: { countryname: countryToGo},
                
            })
        },
        getBorderName(code) {
            let border = this.countries.filter(country => {
                return country.fifa == code || country.cca3 == code || country.cioc == code
            })[0]
            console.log(border);

            return border.name.common
        }
    },
    computed: {
        country() {
            if (this.countries && this.countries.length)
                return this.countries
                    .find(country => country.name.common === this.countryname)  
        },
        countryLanguages() {
            let langs = []
            for (let lang in this.country.languages) {
                langs.push(this.country.languages[lang])
            }

            return langs
        },
        countryNativeName() {
            let names = []
            for (let name in this.country.name.nativeName) {
                return this.country.name.nativeName[name].official
            }

            return names
        },
        population() {
            return [...this.country.population.toString()]
                .reverse().map((num, idx) => (idx % 3 === 0 && idx != 0) ? `${num},` : num)
                .reverse().join('')
        },
        borders() {
            let bordersRaw = this.country.borders ? Array.from(this.country.borders) : []
            let _borders = []

            if (bordersRaw.length == 0) {
                return _borders
            }

            for (let countryCode of bordersRaw) {
                let border = this.getBorderName(countryCode)
                _borders.push(border)
            }

            return _borders
        }
    },
    
}
</script>
<style lang="scss" >
@import '../assets/style.scss';

.country-detail-page {
  transition: all .5s;
}

.button-wrap {
  position: relative;
  height:100px;
  left:0;
}

.btn {
  background: white;
  cursor:pointer;
  border-radius: 2px;
  padding: 7px 24px;
  @include d-shadow($shadow-light, 0, 0, .1rem);
  transition: all .3s ease-in-out;

  &.back {
    width: 136px;
    margin: 40px 30px;
    @include flex();
    left:0px;
    transform: translateX(-100%);
    position: absolute;

    span { 
      padding: 0 8px; 
      font-size: 14px;
    }
  }

  &:hover {
    @include d-shadow($shadow-light, 0, 0, .3rem);
  }
}

.detail{
  @include flex('', center, center);
  flex-wrap: wrap;
  margin-top: 130px;
  margin-bottom: 60px;
    
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

  .infos1 p {
      line-height: 32px;
      margin: 16px 0 32px;
  }

  .borders div {
    @include flex();
    flex-wrap: wrap;
    margin-top:16px;
    
    .border-pill {
      margin: 5px;
    }
  }
}

body.dark-mode  .btn{
  background: $el-bg-dark-mode;
  @include d-shadow($shadow-dark, 0, 0, .1rem);
  
  &:hover {
    @include d-shadow($shadow-light, 0, 0, .3rem);
  }

  path {
    fill: $text-dark-mode;
  }
}

@media only screen and (max-width:630px) {
  .btn.back {
    left: 100px;
    width:100px;
    padding: 7px 15px;
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

  .btn.back {
    transform: translateX(0);
  }
}

@media only screen and (min-width:1030px) {
  .infos {
    padding: 0 0 0 min(120px, 9vw);
    margin-right: 80px;
    justify-content: space-between;

    .infos1 {
      @include flex();
      flex-wrap: wrap;
      gap: max(50px, 7vw);
      width: 50vw;
        
      > * {
        flex-basis: 220px;
      }
    }
  }
  .borders {
    position: relative;
    div {
      top: -110%;
      left: 15ch;
      width:100%;
      position: absolute;
    }
  }
}
</style>
