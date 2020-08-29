<template>
  <Icon name />
</template>

<script>
import Icon from '@/components/core/CoreButton';

export default {
  props: {
    text: String
  },
  setup() {},
  components: {
    Icon
  }
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
