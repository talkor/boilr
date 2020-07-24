<template>
  <div class="container">
    <div class="view-container">
      <div :class="{ 'time-container': true, disabled: !active }" @click="onClick">
        <div class="time">
          <span>{{ start }}</span> -
          <span>{{ end }}</span>
        </div>
        <div class="days">
          <span v-for="(day, index) in days" :key="index" class="day">
            <template v-if="days[index]">
              <span>{{ dayString(index) }}&nbsp;</span>
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
            label="Start"
            :time="start"
            @timeChange="onStartTimeChange"
            class="time-picker"
          />
          <TimePicker label="End" :time="end" @timeChange="onEndTimeChange" class="time-picker" />
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
    start: String,
    end: String,
    days: Array,
    active: Boolean,
    id: Number
  },
  setup({ id }, { emit }) {
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

    const dayString = index => {
      return dayStrings[index];
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

    const onToggle = value => {
      if (!value) {
        showEdit.value = false;
      }
      emit('activeToggle', id);
    };

    return {
      onToggle,
      onClick,
      dayString,
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
      margin-block-end: 20px;

      .time-picker {
        flex: 3;
        margin: 5px;
      }
    }
  }
}
</style>
