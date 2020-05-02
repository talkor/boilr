<template>
  <b-button
    rounded
    @click="onClick"
    :size="`is-${size}`"
    :icon-left="icon"
    :class="{ 'no-border': noBorder }"
  >
    <span class="button-content">
      <slot></slot>
      <span>{{ text }}</span>
    </span>
  </b-button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String
    },
    size: {
      type: String
    },
    icon: {
      type: String
    },
    noBorder: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    const onClick = event => {
      emit('onClick', event);
    };

    return { onClick };
  }
};
</script>

<style scoped lang="scss">
.no-border {
  border: none;
}

.button-content {
  display: flex;
  align-items: center;
}
</style>
