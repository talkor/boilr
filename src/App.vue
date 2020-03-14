<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar';

export default {
  name: 'Home',
  components: {
    Navbar
  }
};
</script>

<style>
html,
body {
  height: 100%;
  max-height: 100%;
  width: auto;
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: static;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-overflow-scrolling: touch;
  text-align: center;
  color: #2c3e50;
}
</style>
