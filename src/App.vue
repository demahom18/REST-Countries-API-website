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
      console.log(body.classList)
    }
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

nav {

}
</style>
