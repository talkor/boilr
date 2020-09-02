<template>
  <div id="app">
    <transition mode="out-in">
      <router-view />
    </transition>
    <Navbar />
  </div>
</template>

<script>
import Navbar from '@/components/shell/Navbar/Navbar';
import { ref, onMounted } from '@vue/composition-api';
import { getUserData } from '@/services/userService';

export default {
  name: 'Home',
  setup(_, { root }) {
    const router = root.$router;
    const userData = ref({});

    router.beforeEach = (to, from, next) => {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      next();
    };

    onMounted(async () => {
      const data = await getUserData();
      userData.value = { ...data };
    });

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
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  max-height: 100%;
  text-align: center;
  color: $text-color;
  flex-direction: column;
  display: flex;
  position: static;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  input {
    box-shadow: none;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 2s, transform 1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}

.notices.is-top {
  margin-block-start: 70px;
}
</style>
