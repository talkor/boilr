<template>
  <b-switch class="toggle" v-model="isActive" />
</template>

<script>
import { watch, ref } from '@vue/composition-api';

export default {
  name: 'Icon',
  props: {
    active: {
      type: Boolean
    }
  },
  setup({ active }, { emit }) {
    const isActive = ref(active);

    watch(isActive, isActive => {
      emit('toggle', isActive);
    });

    return {
      isActive
    };
  }
};
</script>

<style lang="scss">
.toggle {
  &.switch:hover input[type='checkbox']:checked + .check,
  &.switch input[type='checkbox']:checked + .check {
    background: #1b9cf1;
  }
}
</style>
