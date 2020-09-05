<template>
  <div class="container">
    <CoreButton
      v-for="(day, index) in 7"
      :key="index"
      :noBorder="!days[index]"
      :noPadding="true"
      :rounded="true"
      :text="dayStrings[index]"
      :class="{ day: true, unchecked: !days[index] }"
      @click="onDayChange(index)"
    />
  </div>
</template>

<script>
import CoreButton from '@/components/core/CoreButton';

export default {
  props: {
    days: Array
  },
  setup(props, { emit }) {
    const NUM_DAYS_OF_WEEK = 7; // TODO: move to consts
    const dayStrings = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const onDayChange = (index) => {
      emit('dayChange', index);
    };

    return {
      NUM_DAYS_OF_WEEK,
      dayStrings,
      onDayChange
    };
  },
  components: {
    CoreButton
  }
};
</script>
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;

  .day {
    min-width: 40px;

    &.unchecked {
      background: #fbfbfb;
    }
  }
}
</style>
