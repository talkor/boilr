<template>
  <div class="card">
    <div class="container">
      <h3 class="card-title">{{ label }}</h3>
      <Icon v-if="icon" :name="icon" class="icon" />
    </div>
    <div class="container data-container">
      <span v-if="dataLabel" class="card-number">{{ dataLabel }}</span>
      <span v-else>
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/core/Icon';

export default {
  props: {
    icon: String,
    label: String,
    dataLabel: String
  },
  components: {
    Icon
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.card {
  width: 100%;
  height: auto;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.11);
  padding: 15px;
  margin-block-end: 10px;
  display: flex;
  justify-content: space-between;
  box-shadow: none;

  .container {
    display: flex;
    flex-direction: column;
    margin: 0;

    &.data-container {
      margin-block-start: 10px;
    }

    .card-number {
      font-size: 24px;
    }

    .card-title {
      font-size: 18px;
      align-self: start;
      margin-block-end: 15px;
    }

    .icon {
      line-height: 20px;
      font-size: 20px;
      color: $primary;
    }
  }

  .card-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>
