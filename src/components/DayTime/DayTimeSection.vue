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
          <span v-for="(day, index) in days" :key="index" class="day">
            <template v-if="days[index]">
              <span>{{ dayString(index) }}&nbsp;</span>
            </template>
          </span>
        </div>
      </div>
      <Button v-if="showEdit" icon="trash" size="small" @click="onDelete" />
      <Toggle v-else vi :active="active" @toggle="onToggle" />
    </div>
    <transition name="slide">
      <div v-if="showEdit" class="edit-container">
        <div class="time-pickers">
          <TimePicker
            label="Start"
            :time="start"
            @timeChange="onStartTimeChange"
            class="time-picker"
          />
          <TimePicker
            label="End"
            :time="end"
            @timeChange="onEndTimeChange"
            class="time-picker"
          />
        </div>
        <DayPicker :days="days" @dayChange="onDayChange" />
      </div>
    </transition>
  </div>
</template>

<script>
import Toggle from '@/components/core/Toggle';
import Button from '@/components/core/Button';
import TimePicker from '@/components/DayTime/TimePicker';
import DayPicker from '@/components/DayTime/DayPicker';
import { ref } from '@vue/composition-api';

export default {
  props: {
    start: String,
    end: String,
    days: Array,
    active: Boolean,
    id: Number,
    isNewTime: Boolean
  },
  setup({ id, isNewTime }, { emit }) {
    const showEdit = ref(isNewTime);

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

    const dayString = (index) => {
      return dayStrings[index];
    };

    const onDayChange = (index) => {
      emit('dayChange', index, id);
    };

    const onStartTimeChange = (value) => {
      emit('startTimeChange', id, value);
    };

    const onEndTimeChange = (value) => {
      emit('endTimeChange', id, value);
    };

    const onToggle = (value) => {
      if (!value) {
        showEdit.value = false;
      }
      emit('activeToggle', id);
    };

    const onDelete = () => {
      showEdit.value = false;
      emit('delete', id);
    };

    return {
      onToggle,
      onClick,
      dayString,
      showEdit,
      onDayChange,
      onStartTimeChange,
      onEndTimeChange,
      onDelete
    };
  },
  components: {
    Toggle,
    TimePicker,
    DayPicker,
    Button
  }
};
</script>
<style scoped lang="scss">
.container {
  .view-container {
    text-align: start;
    display: flex;

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
    transition: all 0.2s ease-in;

    .time-pickers {
      display: flex;
      justify-content: space-between;

      .time-picker {
        flex: 3;
        margin-block-start: 10px;
        margin-block-end: 5px;
        margin-inline-end: 10px;
      }
    }
  }
}
</style>
