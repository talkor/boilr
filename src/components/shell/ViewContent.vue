<template>
  <div class="view-content">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.view-content {
  flex: 1;
  width: 90%;
  margin-block-start: 20px;
  margin-inline-start: auto;
  margin-inline-end: auto;
  overflow: auto;
}
</style>;
