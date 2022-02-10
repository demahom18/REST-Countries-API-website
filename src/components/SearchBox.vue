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
          @keyup="searchByName"
        />
      </div>
      <div class="select-region">
        <select 
          v-model="region"
          @change="searchByRegion"
        >
          <option value="" >Search by region</option>
          <option>Africa</option>
          <option>Americas</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
        </select>
        <span></span>
      </div>
    </form>
  </div>
</template>
<script>

import { inject, ref } from 'vue'

export default {
  name: 'SearchBox',
  emits: ['search'],
  setup(props, { emit }) {
    const search = ref('')
    const region = ref('')
    
    const countries = inject('countries')
    const countriesByRegion = ref()
    const countriesToShow = ref()

    const filterByName  = (arr, input) => {
      return arr.filter(item => item.name.common.toLowerCase().includes(input))
    }
    
    const filterByRegion = (arr, reg) => {
      return arr.filter(item => item.region.includes(reg))
    }

    const searchByRegion = () => {
      if (region.value.length) {
        countriesByRegion.value = countriesToShow.value 
          = filterByRegion(countries.value, region.value) 
        emit('search', countriesToShow.value)
      }
      else emit('search', countries.value)
    }

    const searchByName = () => {      
      if (region.value.length) {
        countriesToShow.value = filterByName(countriesByRegion.value, search.value)
        emit('search', countriesToShow.value)
      }
      else { 
        countriesToShow.value = filterByName(countries.value, search.value)
        emit('search', countriesToShow.value)
      }
    }

    return {
      search,
      region,
      searchByName,
      searchByRegion
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

  .input-field {
    position: relative;

    svg {
      position: absolute;
      top:calc(50%);
      transform: translateY(-50%);
      left:46px;
    }
  }

  select, input {
    @include unsetField;
    @include d-shadow($shadow-light, 0, 0, .3rem);
    
    &:focus {
      color: $text-col;
      @include d-shadow($shadow-light, 0, 0, 1rem)
    }
  }
  
  input {
    width: min(480px, 90vw);
    height: 50px;
    padding-left: 64px;
  }

  select{
    padding-left: 24px;
    height:48px;
    width:200px;
  }

  .select-region {
    position: relative;
    width:200px;
    
    span {
      position:absolute;
      width:12px;
      height: 6px;
      top: 47%;
      right:0px;
      pointer-events: none;
      background-color: $text-col;
      clip-path: polygon(20% 0, 50% 50%, 80% 0, 100% 20%, 50% 100%, 0 20%);
    }
  }
}
body.dark-mode form {
  select, option, input {
    background: $el-bg-dark-mode;
    color: #c4c4c4;
    @include d-shadow($shadow-dark, 0, 0, .3rem);

    &:focus {
      color: white;
      @include d-shadow($shadow-dark, 0, 0, .3rem)
    }
  }
  span {
    background: $text-dark-mode;
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