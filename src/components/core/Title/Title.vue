<template>
  <h1 class="title">{{ text }}</h1>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    text: String
  },
  setup() {}
};
</script>

<style scoped lang="scss">
h1.title {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: left;
}
</style>
