<template>
  <div class="container">
    <div class="time-container" @click="onClick">
      <div class="time">
        <span>{{ start }}</span> -
        <span>{{ end }}</span>
      </div>
      <div class="days">
        <span v-if="isEveryDay()">{{
          dayString({ isEveryday: true })
        }}</span>
        <span v-else v-for="(day, index) in days" :key="index" class="day">
          <span>{{ dayString({ day }) }}</span>
          <span v-if="showComma(index)">,&nbsp;</span>
        </span>
      </div>
    </div>
    <Toggle :active="active" @toggle="onToggle" />
  </div>
</template>

<script>
import Toggle from '@/components/core/Toggle/Toggle';

export default {
  props: {
    start: {
      type: String
    },
    end: {
      type: String
    },
    days: {
      type: Array
    },
    active: {
      type: Boolean
    }
  },
  setup({ days }, { emit }) {
    const NUM_DAYS_OF_WEEK = 7;
    const dayStrings = {
      1: 'Sun',
      2: 'Mon',
      3: 'Tue',
      4: 'Wed',
      5: 'Thu',
      6: 'Fri',
      7: 'Sat',
      all: 'Every day'
    };

    const onToggle = value => {
      console.log(value);
    };

    const onClick = event => {
      emit('click', event);
    };

    const isEveryDay = () => {
      return days.length === NUM_DAYS_OF_WEEK;
    };

    const dayString = ({ day, isEveryday = false }) => {
      return isEveryday ? dayStrings['all'] : dayStrings[day];
    };

    const showComma = index => {
      return index !== days.length - 1;
    };

    return {
      onToggle,
      onClick,
      dayString,
      showComma,
      isEveryDay
    };
  },
  components: {
    Toggle
  }
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  text-align: start;
  display: flex;
  padding: 10px;

  .time-container {
    flex: 1;
  }

  .time {
    font-size: 24px;
  }
}
</style>
