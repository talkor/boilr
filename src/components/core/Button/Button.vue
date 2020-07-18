<template>
  <b-button
    @click="onClick"
    :size="`is-${size}`"
    :icon-left="icon"
    :class="{ main: true, 'no-border': noBorder }"
    :rounded="rounded"
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
    },
    rounded: {
      type: Boolean,
      default: true
    }
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
.main {
  margin: 10px 0;
}

.no-border {
  border: none;
}

.button-content {
  display: flex;
  align-items: center;
}
</style>
