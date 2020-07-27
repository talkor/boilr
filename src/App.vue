<template>
  <div id="app">
    <router-view class="app-content" />
    <Navbar />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar';
import { ref } from '@vue/composition-api';
// import * as firebase from 'firebase/app';
// import 'firebase/firestore';

export default {
  name: 'Home',
  setup() {
    const userData = ref({});

    // onMounted(() => {
    //   return firebase
    //     .firestore()
    //     .collection('users')
    //     .doc('0UfcIqqRdwfWYF6AbrM7BsUkXBK2')
    //     .get()
    //     .then(snapshot => {
    //       userData.value = { ...snapshot.data() };
    //     });
    // });

    return { userData };
  },
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';

html,
body {
  height: 100%;
  width: auto;
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
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

  .app-content {
    flex: 1;
    height: 100%;
    max-height: 100%;
    width: 90%;
    margin: 1.5em auto;
    position: static;
    overflow: auto;
  }

  input {
    box-shadow: none;
  }
}
</style>
