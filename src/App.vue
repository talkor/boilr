<template>
  <div id="app">
    <router-view class="content" />
    <Navbar />
  </div>
</template>

<script>
import Navbar from '@/components/shell/Navbar/Navbar';

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
  width: auto;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  max-height: 100%;
  text-align: center;
  color: #2c3e50;
  flex-direction: column;
  display: flex;
  position: static;
}

.content {
  flex: 1;
  height: 100%;
  width: 80%;
  margin: 0 auto;
}
</style>
