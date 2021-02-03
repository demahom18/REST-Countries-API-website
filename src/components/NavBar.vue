<template>
  <nav>
    <div class="navbar">
      <h1>Where in the world?</h1>
      <div @click="$emit('toggleTheme', $event), toggleDarkMode($event)">
        <svg width="18" height="17" viewBox="0 0 18 17">
          <path  
            d="M12.5532 11.815C8.66857 11.815 5.51929 8.92783 5.51929 5.36821C5.51929 4.0253 5.96679 2.78158 6.73143 1.75C3.69036 2.69515 1.5 5.33122 1.5 8.43807C1.5 12.3385 4.94929 15.5 9.20357 15.5C12.5929 15.5 15.4696 13.4932 16.5 10.7045C15.375 11.4048 14.0161 11.815 12.5532 11.815Z" stroke-width="1.25"
            fill="white" 
            stroke="#111517"
            :class="{ dark: isDarkMode }"
          />
        </svg>
        <span>Dark Mode</span> 
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
export default {
  emits: ['toggleTheme'],
  setup() {
    const isDarkMode = ref(false)
  
    const toggleDarkMode = 
      () =>  isDarkMode.value = !isDarkMode.value
    
    return { toggleDarkMode, isDarkMode }
  }
}
</script>

<style lang="scss">
 @import '../assets/style.scss'; 
nav {
  width:100%;
  background: white;
  @include flex('', '', center)
}
.navbar{
  @include flex('', '', space-between); 
  width:min(1360px, 100%);
  position: relative;
  padding:30px 16px; 
  font-weight: 800;

  h1 {
    font-size: clamp(14px, 5vw, 24px);
  }

  div {
    font-weight: 600;
    font-size: clamp(12px, 4vw, 16px);
    cursor: pointer;
    align-items: center;
    @include flex('', center, '');
  }

  span { padding-left: 8px;}

  path.dark {
    stroke: white;
  }
}
body.dark-mode nav {
  background: $el-bg-dark-mode;
}
// @media only screen and (min-width:1520px){
//   nav { padding: 30px 80px;}
// }
</style>