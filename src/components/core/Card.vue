<template>
  <div class="card">
    <div>
      <Icon v-if="icon" :name="icon" class="icon" />
    </div>
    <div class="container">
      <h3 class="card-title">{{ label }}</h3>
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
  padding: 10px;
  margin-block-end: 10px;
  display: flex;
  justify-content: space-between;

  .container {
    display: flex;
    flex-direction: column;
    margin: 0;

    .card-number {
      font-size: 16px;
      flex: 1;
      justify-content: start;
      text-align: start;
    }

    .card-title {
      font-size: 16px;
      text-align: start;
      font-weight: 600;
    }
  }
  .icon {
    color: $primary;
    margin-inline-end: 10px;
  }
}
</style>
