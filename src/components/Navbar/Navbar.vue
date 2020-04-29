<template>
  <nav>
    <ul class="navbar">
      <NavbarItem
        v-for="(navbarItem, index) in navbarData"
        :key="index"
        @click.native="setActive(navbarItem.name)"
        :active="isActive(navbarItem.name)"
        :path="navbarItem.path"
        :label="navbarItem.label"
        :icon="navbarItem.icon"
      />
    </ul>
  </nav>
</template>

<script>
import NavbarItem from './NavbarItem';
import { ref, computed } from '@vue/composition-api';

export default {
  name: 'Navbar',
  setup() {
    const activeItem = ref('home');

    const setActive = item => {
      activeItem.value = item;
    };

    const isActive = item => {
      return activeItem.value === item;
    };

    const navbarItems = computed(() => {
      return navbarData.filter(item => item.mobileOnly !== true);
    });

    const navbarData = [
      {
        path: '/statistics',
        name: 'statistics',
        label: 'Statistics',
        icon: 'chart-bar'
      },
      {
        path: '/',
        name: 'home',
        label: 'Home',
        icon: 'home',
        mobileOnly: true
      },
      {
        path: '/settings',
        name: 'settings',
        label: 'Settings',
        icon: 'cog'
      }
    ];

    return {
      setActive,
      isActive,
      navbarItems,
      navbarData
    };
  },
  components: {
    NavbarItem
  }
};
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  list-style-type: none;
  padding: 10px 0 10px 0;
  margin: 0;
  align-items: center;
  width: 100%;
  border-top: 1px solid #c2c2c26c;
  padding: 20px 0 25px 0;
  background-color: #ffffff;
}
</style>
