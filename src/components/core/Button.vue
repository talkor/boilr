<template>
  <b-button
    @click="onClick"
    :size="`is-${size}`"
    :icon-left="icon"
    :class="{ main: true, 'no-border': noBorder, 'no-padding': noPadding }"
    :rounded="rounded"
    :icon-pack="iconPack"
  >
    <span v-if="text" class="button-content">
      <slot></slot>
      <span>{{ text }}</span>
    </span>
  </b-button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
    size: String,
    icon: String,
    noBorder: Boolean,
    noPadding: Boolean,
    rounded: {
      type: Boolean,
      default: true
    },
    iconPack: {
      type: String,
      default: 'fa'
    }
  },
  setup(props, { emit }) {
    const onClick = (event) => {
      emit('click', event);
    };

    return { onClick };
  }
};
</script>

<style scoped lang="scss">
.main {
  &.no-border {
    border: none;
  }

  &.no-padding {
    padding: 0;
  }

  .button-content {
    display: flex;
    align-items: center;
  }
}
</style>

