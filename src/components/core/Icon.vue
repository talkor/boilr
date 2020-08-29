<template>
  <div @click="onClick" class="icon">
    <b-icon :pack="pack" :icon="name" :size="`is-${size}`" />
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    pack: {
      type: String,
      default: 'fas'
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  setup(_, { emit }) {
    const onClick = (event) => {
      emit('click', event);
    };

    return {
      onClick
    };
  }
};
</script>

<style scoped lang="scss">
.icon {
  display: inline-block;
}
</style>
