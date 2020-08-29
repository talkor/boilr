<template>
  <h1 class="title">{{ text }}</h1>
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
h1.title {
  margin-block-end: 0;
  font-size: 20px;
  text-align: center;
}
</style>
