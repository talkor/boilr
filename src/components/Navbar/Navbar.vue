<template>
  <div>
    <ul v-if="$isMobile()" class="navbar">
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
    <ul v-else class="navbar">
      <NavbarItem
        v-for="(navbarItem, index) in navbarItems"
        :key="index"
        @click.native="setActive(navbarItem.name)"
        :active="isActive(navbarItem.name)"
        :path="navbarItem.path"
        :label="navbarItem.label"
        :icon="navbarItem.icon"
      />
    </ul>
  </div>
</template>

<script>
import NavbarItem from './NavbarItem';
import { ref, computed } from '@vue/composition-api';

export default {
  name: 'Navbar',
  setup() {
    const activeItem = ref('shower');

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
        icon: 'shower',
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
  border-bottom: 1px solid #c2c2c26c;
  display: flex;
  list-style-type: none;
  padding: 10px 0 10px 0;
  margin: 0;
  align-items: center;
  justify-content: flex-end;

  .home-item {
    display: none;
  }

  .home-logo {
    justify-self: flex-start;
    margin-right: auto;
    margin-left: 15px;
  }
}

@media only screen and (max-width: 486px) {
  .navbar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #c2c2c26c;
    border-bottom: 0;
    padding: 20px 0 25px 0;

    .home-item {
      display: initial;
    }

    .home-logo {
      display: none;
    }
  }
}
</style>
