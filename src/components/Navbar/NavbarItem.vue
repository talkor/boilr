<template>
  <router-link class="navbar-item" :to="path">
    <li :class="[{ active }]" @click="onClick">
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
    },
    click: {
      type: Function
    }
  },
  components: {
    Icon
  },
  setup(props, { emit }) {
    const onClick = event => {
      emit('click', event);
    };

    return { onClick };
  }
};
</script>

<style scoped lang="scss">
.navbar-item {
  flex-basis: 120px;
  cursor: pointer;
  font-size: 15px;
  color: #c2c2c2;
  text-decoration: none;

  .active,
  &:hover,
  &:focus {
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
