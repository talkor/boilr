<template>
  <div class="app-view">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.app-view {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
</style>
