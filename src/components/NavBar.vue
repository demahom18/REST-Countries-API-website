<template>
  <nav>
    <h1>Where in the world?</h1>
    <div @click="$emit('toggleTheme', $event), toggleDarkMode($event)">
      <svg width="18" height="17" viewBox="0 0 18 17">
        <path  
          d="M12.5532 11.815C8.66857 11.815 5.51929 8.92783 5.51929 5.36821C5.51929 4.0253 5.96679 2.78158 6.73143 1.75C3.69036 2.69515 1.5 5.33122 1.5 8.43807C1.5 12.3385 4.94929 15.5 9.20357 15.5C12.5929 15.5 15.4696 13.4932 16.5 10.7045C15.375 11.4048 14.0161 11.815 12.5532 11.815Z" stroke-width="1.25"
          fill="white" 
          stroke="#111517"
          :class="{ fill: isDarkMode }"
        />
      </svg>
      <span>Dark Mode</span> 
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const isDarkMode = ref(false)
  
    const toggleDarkMode = (e) => {
      console.log('toggleDarkMode triggered')
      return isDarkMode.value = !isDarkMode.value
    }

    return { toggleDarkMode, isDarkMode }
  }
}
</script>

<style lang="scss">
 @import '../assets/style.scss'; 

nav{
  @include flex('', '', space-between); 
  width:100%;
  padding:30px 16px; 
  background: white;
  font-weight: 800;

  h1 {font-size: 14px;}

  div {
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    align-items: center;
    @include flex('', center, '');
  }

  span { padding: 0 8px;}

  path.fill {
    fill: #000;
  }
}
body.dark-mode nav {
  background: $el-bg-dark-mode;
}

</style>