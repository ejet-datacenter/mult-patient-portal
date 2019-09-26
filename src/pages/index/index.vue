<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html, body {
    height: 100%;
    background: rgb(238, 241, 246);
  }
  #app{
    height: 100%;
    overflow: hidden;
  }
</style>
