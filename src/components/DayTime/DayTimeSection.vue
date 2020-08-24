<template>
  <div class="container">
    <div class="view-container">
      <div
        :class="{ 'time-container': true, disabled: !active }"
        @click="onClick"
      >
        <div class="name">{{ name }}</div>
        <div class="time">{{ time }}</div>
        <div class="days" v-if="repeat">
          <span v-for="(day, index) in days" :key="index" class="day">
            <template v-if="days[index]">
              <span>{{ dayString(index) }}&nbsp;</span>
            </template>
          </span>
        </div>
      </div>
      <Button v-if="showEdit" icon="trash" size="small" @click="onDelete" />
      <Toggle
        v-if="allowEdit && !showEdit"
        :active="active"
        @toggle="onActiveToggle"
      />
    </div>
    <transition name="slide">
      <div v-if="showEdit" class="edit-container">
        <div class="row-container">
          <TimePicker
            :time="time"
            @timeChange="onTimeChange"
            class="time-picker"
          />
          <Checkbox :checked="repeat" label="Repeat" @change="onRepeatChange" />
        </div>
        <DayPicker v-if="repeat" :days="days" @dayChange="onDayChange" />
      </div>
    </transition>
  </div>
</template>

<script>
import Toggle from '@/components/core/Toggle';
import Button from '@/components/core/Button';
import Checkbox from '@/components/core/Checkbox';
import TimePicker from '@/components/DayTime/TimePicker';
import DayPicker from '@/components/DayTime/DayPicker';
import { ref } from '@vue/composition-api';

export default {
  props: {
    time: String,
    days: Array,
    active: Boolean,
    repeat: Boolean,
    id: Number,
    isNewSchedule: Boolean,
    name: String,
    allowEdit: Boolean
  },
  setup({ id, isNewSchedule, allowEdit }, { emit }) {
    const showEdit = ref(isNewSchedule);

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
      if (!allowEdit) {
        return;
      }
      showEdit.value = !showEdit.value;
    };

    const dayString = (index) => {
      return dayStrings[index];
    };

    const onDayChange = (index) => {
      emit('dayChange', index, id);
    };

    const onTimeChange = (value) => {
      emit('timeChange', id, value);
    };

    const onRepeatChange = (value) => {
      emit('repeatChange', id, value);
    };

    const onActiveToggle = (value) => {
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
      onActiveToggle,
      onRepeatChange,
      onClick,
      dayString,
      showEdit,
      onDayChange,
      onTimeChange,
      onDelete
    };
  },
  components: {
    Toggle,
    TimePicker,
    DayPicker,
    Button,
    Checkbox
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

    .name {
      font-size: 14px;
    }
  }

  .edit-container {
    transition: all 0.2s ease-in;

    .time-picker {
      flex: 1;
      margin-block-end: 0;
      margin-inline-end: 10px;
    }

    .row-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-block-start: 20px;
      margin-block-end: 5px;
    }
  }
}
</style>
