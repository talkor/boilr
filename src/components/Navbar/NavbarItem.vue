<template>
  <router-link class="navbar-item" :to="path">
    <li :class="[{ active }]">
      <font-awesome-icon :icon="icon" />
    </li>
  </router-link>
</template>

<script>
export default {
  name: 'NavbarItem',
  props: ['path', 'icon', 'active']
};
</script>

<style scoped lang="scss">
.navbar-item {
  flex: 1;
  cursor: pointer;
  transition: 0.2s all;
  font-size: 20px;
  color: #c2c2c2;

  .active {
    transform: scale(1.2);
    color: #444444;
  }
}
</style>
