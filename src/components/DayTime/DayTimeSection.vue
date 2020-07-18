<template>
  <div class="container">
    <div class="view-container">
      <div
        :class="{ 'time-container': true, disabled: !active }"
        @click="onClick"
      >
        <div class="time">
          <span>{{ start }}</span> -
          <span>{{ end }}</span>
        </div>
        <div class="days">
          <span v-if="isEveryDay()">
            {{ dayString({ isEveryday: true }) }}
          </span>
          <span
            v-else
            v-for="(day, index) in days"
            :key="index"
            class="day"
          >
            <template v-if="days[index]">
              <span>{{ dayString({ index }) }}</span>
              <span v-if="showComma(index)">,&nbsp;</span>
            </template>
          </span>
        </div>
      </div>
      <Toggle :active="active" @toggle="onToggle" />
    </div>
    <transition name="slide">
      <div v-if="showEdit" class="edit-container">
        <DayPicker :days="days" @dayChange="onDayChange" />
        <div class="time-pickers">
          <TimePicker
            :time="start"
            @timeChange="onStartTimeChange"
            class="start-time"
          />
          <TimePicker
            :time="end"
            @timeChange="onEndTimeChange"
            class="end-time"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Toggle from '@/components/core/Toggle/Toggle';
import TimePicker from '@/components/DayTime/TimePicker';
import DayPicker from '@/components/DayTime/DayPicker';
import { ref } from '@vue/composition-api';

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
    },
    id: {
      type: Number
    }
  },
  setup({ days, id }, { emit }) {
    const showEdit = ref(false);

    const dayStrings = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat',
      all: 'Every day'
    };

    const onClick = () => {
      showEdit.value = !showEdit.value;
    };

    const isEveryDay = () => {
      return days.every(day => day);
    };

    const dayString = ({ index, isEveryday = false }) => {
      return isEveryday ? dayStrings['all'] : dayStrings[index];
    };

    const showComma = index => {
      return index !== days.length - 1;
    };

    const onDayChange = index => {
      emit('dayChange', index, id);
    };

    const onStartTimeChange = value => {
      emit('startTimeChange', id, value);
    };

    const onEndTimeChange = value => {
      emit('endTimeChange', id, value);
    };

    const onToggle = () => {
      emit('activeToggle', id);
    };

    return {
      onToggle,
      onClick,
      dayString,
      showComma,
      isEveryDay,
      showEdit,
      onDayChange,
      onStartTimeChange,
      onEndTimeChange
    };
  },
  components: {
    Toggle,
    TimePicker,
    DayPicker
  }
};
</script>
<style scoped lang="scss">
.container {
  .view-container {
    text-align: start;
    display: flex;
    margin-block-start: 20px;
    margin-block-end: 20px;

    .time-container {
      flex: 1;

      &.disabled {
        color: rgba(138, 138, 138, 0.541);
      }
    }

    .time {
      font-size: 24px;
    }
  }

  .edit-container {
    transition: 0.2s ease-in;

    .time-pickers {
      display: flex;
      justify-content: space-between;

      .start-time {
        margin-inline-end: 5px;
      }

      .start-end {
        margin-inline-start: 5px;
      }
    }
  }
}
</style>
