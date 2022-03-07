<template>
  <div id="app">
    <Container msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Container from './components/Container.vue'

export default {
  name: 'App',
  components: {
    Container
  }
}
</script>

<style>
#app {
  font-family: 'Open Sans', sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #222222;
  font-size: 14px;
  margin-top: 60px;
}
</style>
