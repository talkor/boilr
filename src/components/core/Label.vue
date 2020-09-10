<template>
  <label :class="{ label: true, bold }">{{ text }}</label>
</template>

<script>
export default {
  props: {
    text: String,
    bold: Boolean
  }
};
</script>

<style scoped lang="scss">
label.label {
  margin-block-start: 0px;
  font-size: 16px;
  font-weight: 300;

  &.start {
    text-align: start;
  }

  &.center {
    text-align: center;
  }

  &.bold {
    font-weight: 600;
  }
}
</style>
