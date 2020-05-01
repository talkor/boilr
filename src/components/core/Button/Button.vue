<template>
  <b-button rounded @click="onClick">{{ text }}</b-button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String
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

<style scoped lang="scss"></style>
