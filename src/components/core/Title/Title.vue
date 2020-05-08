<template>
  <h1 class="title">{{ text }}</h1>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    text: {
      type: String
    }
  },
  setup() {}
};
</script>

<style scoped lang="scss">
h1.title {
  margin: 10px 0;
  font-size: 24px;
}
</style>
