<template>
  <div class="home">
    <HelloWorld />
    <router-link :to="login">Go To Login</router-link>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld/HelloWorld';

export default {
  components: {
    HelloWorld
  }
};
</script>
