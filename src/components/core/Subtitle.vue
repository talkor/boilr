<template>
  <h2 class="subtitle">{{ text }}</h2>
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
h2.subtitle {
  margin-block-start: 20px;
  margin-block-end: 10px;
  font-size: 18px;
  text-align: left;
}
</style>
