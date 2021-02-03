<template>
  <NavBar @toggle-theme="setTheme"/>
  <router-view/>
</template>
<script>
import NavBar from './components/NavBar.vue'
export default {
  components: { NavBar },
  methods: {
    setTheme() {
      const body = this.$el.parentNode.parentNode
      body.classList.toggle('dark-mode')
    }
  }
}
</script>
<style>
#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
