<template>
  <div class="card">
    <div class="container">
      <h3 class="card-title">{{ label }}</h3>
      <span v-if="dataLabel" class="card-number">{{ dataLabel }}</span>
      <span v-else>
        <slot></slot>
      </span>
    </div>
    <div>
      <Icon v-if="icon" :name="icon" class="icon" />
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
  padding: 10px;
  margin-block-end: 10px;
  display: flex;
  justify-content: space-between;
  box-shadow: none !important;

  .container {
    display: flex;
    flex-direction: column;
    margin: 0;

    .card-number {
      font-size: 24px;
      flex: 1;
      justify-content: start;
      text-align: start;
    }

    .card-title {
      font-size: 14px;
      align-self: start;
      margin-block-end: 15px;
      font-weight: 600;
    }
  }
  .icon {
    line-height: 30px;
    font-size: 20px;
    color: $primary;
  }
}
</style>
