<template>
  <div class="header">
    <div class="left-slot">
      <slot name="left"></slot>
    </div>
    <Title class="title" :text="title"></Title>
    <div class="right-slot">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import Title from '@/components/core/Title';

export default {
  props: {
    title: String
  },
  setup() {},
  components: {
    Title
  }
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-block-end: 1px solid #c2c2c26c;
  padding-block-start: 20px;
  padding-block-end: 20px;

  .left-slot {
    width: 30px;
    margin-inline-start: 20px;
  }

  .right-slot {
    width: 30px;
    margin-inline-end: 20px;
  }
}
</style>
