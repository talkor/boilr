<template>
  <label class="label">{{ text }}</label>
</template>

<script>
export default {
  props: {
    text: String
  }
};
</script>

<style scoped lang="scss">
label.label.label.label {
  margin-block-start: 0px;
  margin-block-end: 15px;
  font-size: 16px;
  font-weight: 300;
  text-align: start;
}
</style>
