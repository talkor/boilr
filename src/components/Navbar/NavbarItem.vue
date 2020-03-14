<template>
  <router-link class="navbar-item" :to="path">
    <li :class="[{ active }]">
      <span v-if="label" class="label">{{ label }}</span>
      <font-awesome-icon v-if="icon" :icon="icon" />
    </li>
  </router-link>
</template>

<script>
export default {
  name: 'NavbarItem',
  props: {
    path: {
      type: String
    },
    icon: {
      type: String
    },
    active: {
      type: Boolean
    },
    label: {
      type: String
    }
  }
};
</script>

<style scoped lang="scss">
.navbar-item {
  flex-basis: 120px;
  cursor: pointer;
  transition: 0.2s all;
  font-size: 20px;
  color: #c2c2c2;
  text-decoration: none;

  .active {
    transform: scale(1.2);
    color: #444444;
  }

  .label {
    font-size: 20px;
    color: #000000;
    margin-right: 10px;
  }
}

@media only screen and (max-width: 486px) {
  .navbar-item {
    flex: 1;

    .label {
      display: none;
    }
  }
}
</style>
