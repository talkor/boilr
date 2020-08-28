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
          <Subtitle text="Select your shower schedules" />
        </div>
      </div>
      <div class="time" v-for="(item, index) in schedule" :key="index">
        <DayTimeSection
          :id="index"
          :time="item.time"
          :days="item.days"
          :uuid="item.uuid"
          :active="item.active"
          :repeat="item.repeat"
          @dayChange="onDayChange"
          @timeChange="onTimeChange"
          @activeToggle="onActiveToggle"
          @repeatChange="onRepeatChange"
          :isNewItem="isNewSchedule"
          @delete="onDeleteTime"
          :allowEdit="allowEdit(item)"
        />
        <Divider v-if="index !== schedule.length - 1" />
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
import { ref, onMounted } from '@vue/composition-api';
import { getDeviceData, postDeviceData } from '@/services/deviceService';
import { getUserData } from '@/services/userService';

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
      const newSchedule = {
        time: '7:00',
        days: [true, true, true, true, true, false, false],
        active: true,
        uuid: userData.uid,
        userId: userData.uid,
        repeat: false
      };
      schedule.value.unshift({ ...newSchedule });
      isNewSchedule.value = true;
      updateServer();
    };

    const updateServer = () => {
      postDeviceData({ schedule: [...schedule.value] });
    };

    const onDeleteTime = (id) => {
      $delete(schedule.value, id);
      updateServer();
    };

    const onDayChange = (index, id) => {
      const time = schedule.value[id];
      let days = time.days;
      days[index] = !days[index];
      const newValue = {
        ...time,
        days: [...days]
      };
      $set(schedule.value, id, newValue);
      updateServer();
    };

    const onTimeChange = (id, time) => {
      const newValue = {
        ...schedule.value[id],
        time
      };
      $set(schedule.value, id, newValue);
      updateServer();
    };

    const onActiveToggle = (id) => {
      const active = schedule.value[id].active;
      const newValue = {
        ...schedule.value[id],
        active: !active
      };
      $set(schedule.value, id, newValue);
      updateServer();
    };

    const onRepeatChange = (id) => {
      const repeat = schedule.value[id].repeat;
      const newValue = {
        ...schedule.value[id],
        repeat: !repeat
      };
      $set(schedule.value, id, newValue);
      updateServer();
    };

    const allowEdit = (item) => {
      return item.userId === userData.uid;
    };

    return {
      onActiveToggle,
      onTimeChange,
      onDayChange,
      onRepeatChange,
      addTime,
      schedule,
      isNewSchedule,
      onDeleteTime,
      allowEdit
    };
  },
  components: {
    ViewHeader,
    Subtitle,
    Icon,
    DayTimeSection,
    Divider,
    AppView,
    ViewContent
  }
};
</script>

<style lang="scss" scoped>
.top-container {
  display: flex;
  justify-content: space-between;
  margin-block-end: 15px;
}
</style>
