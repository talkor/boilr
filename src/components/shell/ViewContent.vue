<template>
  <div class="view-content">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.view-content {
  flex: 1;
  width: 100%;
  padding-block-start: 20px;
  padding-inline-start: 20px;
  padding-inline-end: 20px;
  overflow: auto;
  background-color: $background;
}
</style>
