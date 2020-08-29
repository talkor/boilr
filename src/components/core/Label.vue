<template>
  <h2 class="label">{{ text }}</h2>
</template>

<script>
export default {
  props: {
    text: String
  },
  setup() {}
};
</script>

<style scoped lang="scss">
h2.label {
  margin-block-end: 0;
  font-size: 15px;
  text-align: center;
}
</style>
