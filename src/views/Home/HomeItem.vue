<template>
  <div class="card">
    <h3 class="card-title">{{ label }}</h3>
    <div class="card-container">
      <span class="card-number">{{ dataLabel }}</span>
      <Icon v-if="icon" :name="icon" />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/core/Icon/Icon';

export default {
  name: 'HomeItem',
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
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  margin-top: 30px;

  .card {
    width: 100%;
    height: 80px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.11);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: none;

    .card-title {
      align-self: flex-start;
      margin: 10px 0 0 10px;
      font-size: 14px;
    }

    .card-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .card-icon {
        margin: 10px;
        font-size: 15px;
      }

      .card-number {
        margin-left: 10px;
        font-size: 22px;
      }
    }
  }
}
</style>
