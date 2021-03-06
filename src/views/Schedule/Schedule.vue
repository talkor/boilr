<template>
  <AppView class="schedule">
    <ViewHeader title="Schedule">
      <template v-slot:right>
        <Icon @click="addTime" name="plus" size="small" />
      </template>
    </ViewHeader>
    <ViewContent>
      <div class="top-container">
        <div class="title-container">
          <Subtitle text="My shower schedules" />
        </div>
      </div>
      <div class="skeleton" v-if="!schedule.length">
        <ScheduleSkeleton />
      </div>
      <div class="all-schedules" v-else>
        <div
          class="time"
          v-for="(item, index) in currentUserSchedule"
          :key="item.id"
        >
          <DayTimeSection
            :id="item.id"
            :time="item.time"
            :days="item.days"
            :uuid="item.uuid"
            :active="item.active"
            :repeat="item.repeat"
            :duration="parseInt(item.duration, 10)"
            @dayChange="onDayChange"
            @timeChange="onTimeChange"
            @activeToggle="onActiveToggle"
            @repeatChange="onRepeatChange"
            @durationChange="onDurationChange"
            :isNewItem="isNewSchedule"
            @delete="onDeleteTime"
            :allowEdit="true"
          />
          <Divider v-if="index !== currentUserSchedule.length - 1" />
        </div>
        <Divider />
        <div class="top-container" v-if="otherSchedule.length">
          <div class="title-container">
            <Subtitle text="Other schedules" />
          </div>
        </div>
        <div class="time" v-for="(item, index) in otherSchedule" :key="item.id">
          <DayTimeSection
            :id="item.id"
            :time="item.time"
            :days="item.days"
            :uuid="item.uuid"
            :active="item.active"
            :repeat="item.repeat"
            :allowEdit="false"
          />
          <Divider v-if="index !== otherSchedule.length - 1" />
        </div>
      </div>
    </ViewContent>
  </AppView>
</template>

<script>
import ViewHeader from '@/components/shell/ViewHeader';
import AppView from '@/components/shell/AppView';
import ViewContent from '@/components/shell/ViewContent';
import Subtitle from '@/components/core/Subtitle';
import Icon from '@/components/core/Icon';
import Divider from '@/components/core/Divider';
import DayTimeSection from '@/components/DayTime/DayTimeSection';
import { ref, onMounted, computed } from '@vue/composition-api';
import { getDeviceData, postDeviceData } from '@/services/deviceService';
import { getUserData } from '@/services/userService';
import { v4 as uuidv4 } from 'uuid';
import ScheduleSkeleton from './ScheduleSkeleton';

export default {
  setup(_, { root: { $set, $delete } }) {
    const isNewSchedule = ref(false);
    const schedule = ref([]);
    let userData;

    onMounted(async () => {
      const deviceData = await getDeviceData();
      userData = await getUserData();
      schedule.value = [...deviceData.schedule];
    });

    const addTime = () => {
      const time = new Date();
      const hours = `${time.getHours()}`.padStart(2, 0);
      const minutes = `${time.getMinutes()}`.padStart(2, 0);
      const newSchedule = {
        time: `${hours}:${minutes}`,
        days: [true, true, true, true, true, false, false],
        active: true,
        id: uuidv4(),
        uuid: userData.uid,
        repeat: false,
        duration: userData.defaultShowerTime
      };
      schedule.value.unshift({ ...newSchedule });
      isNewSchedule.value = true;
      postDeviceData({ schedule: [...schedule.value] });
    };

    const currentUserSchedule = computed(() => {
      return schedule.value.filter((item) => {
        return item.uuid === userData.uid;
      });
    });

    const otherSchedule = computed(() => {
      return schedule.value.filter((item) => item.uuid !== userData.uid);
    });

    const updateValues = ({ id, value = '', deleteValue = false }) => {
      if (deleteValue) {
        $delete(
          schedule.value,
          schedule.value.findIndex((item) => item.id === id)
        );
      } else if (value) {
        $set(
          schedule.value,
          schedule.value.findIndex((item) => item.id === id),
          value
        );
      }
      postDeviceData({ schedule: [...schedule.value] });
    };

    const onDeleteTime = (id) => {
      updateValues({ id, deleteValue: true });
    };

    const onDayChange = (index, id) => {
      const oldSchedule = getScheduleById(id);
      let days = oldSchedule.days;
      days[index] = !days[index];
      const newValue = {
        ...oldSchedule,
        days: [...days]
      };
      updateValues({ id, value: newValue });
    };

    const onTimeChange = (id, time) => {
      const oldSchedule = getScheduleById(id);
      const newValue = {
        ...oldSchedule,
        time
      };
      updateValues({ id, value: newValue });
    };

    const onActiveToggle = (id) => {
      const oldSchedule = getScheduleById(id);
      const newValue = {
        ...oldSchedule,
        active: !oldSchedule.active
      };
      updateValues({ id, value: newValue });
    };

    const onDurationChange = (id, duration) => {
      const oldSchedule = getScheduleById(id);
      const newValue = {
        ...oldSchedule,
        duration
      };
      updateValues({ id, value: newValue });
    };

    const onRepeatChange = (id) => {
      const oldSchedule = getScheduleById(id);
      const newValue = {
        ...oldSchedule,
        repeat: !oldSchedule.repeat
      };
      updateValues({ id, value: newValue });
    };

    const getScheduleById = (id) => {
      return schedule.value.find((item) => item.id === id);
    };

    const allowEdit = (item) => {
      return item.userId === userData.uid;
    };

    return {
      onActiveToggle,
      onTimeChange,
      onDayChange,
      onRepeatChange,
      onDurationChange,
      addTime,
      schedule,
      isNewSchedule,
      onDeleteTime,
      allowEdit,
      otherSchedule,
      currentUserSchedule
    };
  },
  components: {
    ViewHeader,
    Subtitle,
    Icon,
    DayTimeSection,
    Divider,
    AppView,
    ViewContent,
    ScheduleSkeleton
  }
};
</script>

<style lang="scss" scoped>
.top-container {
  display: flex;
  justify-content: space-between;
  margin-block-end: 15px;
}

.all-schedules {
  margin-block-end: 25px;
}
</style>
