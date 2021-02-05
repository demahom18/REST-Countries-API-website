<template>
  <div class="search">
      <form>
        <div class="input-field">
          <svg width="16" height="16" viewBox="0 0 16 16">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.1111 9.77778H10.4L10.1333 9.51111C11.0222 8.53333 11.5556 7.2 11.5556 5.77778C11.5556 2.57778 8.97778 0 5.77778 0C2.57778 0 0 2.57778 0 5.77778C0 8.97778 2.57778 11.5556 5.77778 11.5556C7.2 11.5556 8.53333 11.0222 9.51111 10.1333L9.77778 10.4V11.1111L14.2222 15.5556L15.5556 14.2222L11.1111 9.77778ZM5.77778 9.77778C3.55556 9.77778 1.77778 8 1.77778 5.77778C1.77778 3.55556 3.55556 1.77778 5.77778 1.77778C8 1.77778 9.77778 3.55556 9.77778 5.77778C9.77778 8 8 9.77778 5.77778 9.77778Z" fill="#B2B2B2"/>
          </svg>

          <input 
            type="text" 
            placeholder="Search for a country..."
            v-model="search"
            @input="searchByName"
          />
        </div>
        <div class="select-region">
          <select 
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
        this.countriesByRegion = 
          this.filterByRegion(this.countries, this.region)
        this.countriesFiltered = this.countriesByRegion
        this.$emit('search', this.countriesToShow)
      }
      else {
        this.$emit('search', this.countries)
      }
    },
    searchByName() {      
      if (this.region && this.region.length > 0) {
        this.countriesFiltered = 
          this.filterByName(this.countriesByRegion, this.search)
        this.$emit('search', this.countriesToShow)
      }
      else { 
        this.countriesFiltered = 
          this.filterByName(this.countries, this.search)
        this.$emit('search', this.countriesToShow)
      }
    },
    /**
     * Filter an iterator by the name of its items.
     * 
     * @param {*} iter iterator to filter
     * @param {*} input the input to filter by
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

<style lang="scss">
@import '../assets/style.scss';
.search {
  margin: 0 auto;
  width:100%;
}

form {
  @include flex(column);
  // width:fit-content;

  .input-field {
    position: relative;

    svg {
      position: absolute;
      top:calc(50%);
      transform: translateY(-50%);
      left:46px;
    }

    input {
      width: min(350px, 90vw);
      height: 50px;
      color: #c4c4c4;
      padding-left: 64px;
      @include unsetField;

      &:focus {
        color: $text-col;
        @include d-shadow($shadow-light, 0, 0, .3rem)
      }
    }
  }

  select{
    padding-left: 24px;
    height:48px;
    width:200px;
    @include unsetField;
    
    &:focus {
      color: $text-col;
      @include d-shadow($shadow-light, 0, 0, .3rem)
    }
  }
}
body.dark-mode form {
  select, option, input {
    background: $el-bg-dark-mode;
    color: #c4c4c4;
    &:focus {
      color: white;
      @include d-shadow($shadow-dark, 0, 0, .3rem)
    }
  }
  
}

@media only screen and (min-width: 900px) {
  form {
    @include flex(row, center, space-between);
    max-width: 1440px;
    margin:32px max(60px, 3vw) 0; 
  }
}
</style>