<template>
  <div class="container">
    <div class="view-container">
      <UserIcon :image="userImage" class="user-image" />
      <div
        :class="{ 'time-container': true, disabled: !active }"
        @click="onClick"
      >
        <div class="time">{{ time }}</div>
        <div v-if="!showEdit && repeat" class="days">
          <span v-for="(day, index) in days" :key="index" class="day">
            <template v-if="days[index]">
              <span>{{ dayString(index) }}&nbsp;</span>
            </template>
          </span>
        </div>
      </div>
      <Icon
        class="delete-icon"
        v-if="showEdit"
        name="trash-alt"
        size="small"
        @click="onDelete"
        pack="far"
      />
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
import Icon from '@/components/core/Icon';
import Checkbox from '@/components/core/Checkbox';
import TimePicker from '@/components/DayTime/TimePicker';
import DayPicker from '@/components/DayTime/DayPicker';
import UserIcon from '@/components/UserIcon';
import { ref, onMounted } from '@vue/composition-api';
import { getDeviceData } from '@/services/deviceService';
import { getUserPhotoByUuid } from '@/services/userService';

export default {
  props: {
    time: String,
    days: Array,
    active: Boolean,
    repeat: Boolean,
    id: String,
    isNewSchedule: Boolean,
    uuid: String,
    allowEdit: Boolean
  },
  setup({ id, uuid, isNewSchedule, allowEdit }, { emit }) {
    const showEdit = ref(isNewSchedule);
    const userImage = ref('');

    onMounted(async () => {
      const { schedule } = await getDeviceData();
      userImage.value = await getUserPhotoByUuid(uuid);
    });

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
      onDelete,
      userImage
    };
  },
  components: {
    Toggle,
    TimePicker,
    DayPicker,
    Icon,
    Checkbox,
    UserIcon
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

    .delete-icon {
      margin-inline-start: 5px;
    }

    .time {
      font-size: 24px;
    }

    .user-image {
      margin-inline-end: 10px;
      // margin-block-start: 5px;
      display: flex;
      // align-self: start;
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
      margin-block-start: 5px;
      margin-block-end: 10px;
    }
  }
}
</style>
