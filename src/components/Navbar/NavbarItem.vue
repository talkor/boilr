<template>
  <router-link class="navbar-item" :to="path">
    <li :class="[{ active }]" @click="onClick">
      <Icon v-if="icon" :name="icon" />
      <span v-if="label" class="label">{{ label }}</span>
    </li>
  </router-link>
</template>

<script>
import Icon from '@/components/core/Icon';

export default {
  name: 'NavbarItem',
  props: {
    path: String,
    icon: String,
    active: Boolean,
    label: String,
    click: Function
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
  flex: 1;
  cursor: pointer;
  font-size: 15px;
  color: #a2a2a2;
  text-decoration: none;

  .active,
  &:hover,
  &:focus {
    color: #444444;
    background-color: #ffffff;
  }

  .label {
    font-size: 11px;
    margin-top: 0;
    font-weight: 400;

    .active,
    &:hover,
    &:focus {
      color: #444444;
    }
  }
}
</style>
