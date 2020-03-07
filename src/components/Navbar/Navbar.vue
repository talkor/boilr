<template>
  <div class="navbar">
    <ul class="navbar-items">
      <NavbarItem
        @click.native="setActive('statistics')"
        icon="chart-bar"
        :active="isActive('statistics')"
        :path="'/statistics'"
      />
      <NavbarItem
        @click.native="setActive('shower')"
        icon="shower"
        :active="isActive('shower')"
        :path="'/'"
      />
      <NavbarItem
        @click.native="setActive('settings')"
        icon="cog"
        :active="isActive('settings')"
        path="/settings"
      />
    </ul>
  </div>
</template>

<script>
import NavbarItem from './NavbarItem';
import { ref } from '@vue/composition-api';

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

    return {
      setActive,
      isActive
    };
  },
  components: {
    NavbarItem
  }
};
</script>

<style scoped lang="scss">
@media only screen and (max-width: 486px) {
  .navbar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .navbar-items {
    display: flex;
    list-style-type: none;
    padding-left: 0;
    padding-top: 15px;
    border-top: 1px solid #c2c2c26c;
    margin: 15px 0;
  }
}
</style>
