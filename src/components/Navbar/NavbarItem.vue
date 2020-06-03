<template>
  <router-link class="navbar-item" :to="path">
    <li :class="[{ active }]">
      <span v-if="label" class="label">{{ label }}</span>
      <Icon v-if="icon" :icon="icon" />
    </li>
  </router-link>
</template>

<script>
import Icon from '@/components/core/Icon/Icon';

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
  },
  components: {
    Icon
  }
};
</script>

<style scoped lang="scss">
.navbar-item {
  flex-basis: 120px;
  cursor: pointer;
  font-size: 15px;
  color: #d1040446;
  text-decoration: none;

  .active,
  &:hover {
    color: #444444;
    background-color: #ffffff;
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
