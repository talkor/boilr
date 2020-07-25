<template>
  <div class="schedule">
    <div class="title-container">
      <Title text="Schedule" />
      <Button @click="addTime" icon="plus" size="small" />
    </div>
    <div class="time" v-for="(time, index) in times" :key="index">
      <DayTimeSection
        :id="index"
        :start="time.start"
        :end="time.end"
        :days="time.days"
        :active="time.active"
        @dayChange="onDayChange"
        @startTimeChange="onStartTimeChange"
        @endTimeChange="onEndTimeChange"
        @activeToggle="onActiveToggle"
        :isNewTime="isNewTime"
        @delete="onDeleteTime"
      />
      <Divider v-if="index !== times.length - 1" />
    </div>
  </div>
</template>

<script>
import Title from '@/components/core/Title';
import Button from '@/components/core/Button';
import Divider from '@/components/core/Divider';
import DayTimeSection from '@/components/DayTime/DayTimeSection';
import { ref, onMounted } from '@vue/composition-api';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  setup(_, { root: { $set, $delete } }) {
    const isNewTime = ref(false);
    const times = ref([]);

    const newTime = {
      start: '6:00',
      end: '7:00',
      days: [true, true, true, true, true, false, false],
      active: true
    };

    onMounted(() => {
      return firebase
        .firestore()
        .collection('users')
        .doc(window.uid)
        .get()
        .then(snapshot => {
          const userData = { ...snapshot.data() };
          times.value = [...userData.times];
        });
    });

    const addTime = () => {
      times.value.push(newTime);
      isNewTime.value = true;
      updateServer();
    };

    const updateServer = () => {
      return firebase
        .firestore()
        .collection('users')
        .doc(window.uid)
        .set(
          {
            times: [...times.value]
          },
          { merge: true }
        );
    };

    const onDeleteTime = id => {
      $delete(times.value, id);
      updateServer();
    };

    const onDayChange = (index, id) => {
      const time = times.value[id];
      let days = time.days;
      days[index] = !days[index];
      const newTime = {
        ...time,
        days: [...days]
      };
      $set(times.value, id, newTime);
      updateServer();
    };

    const onStartTimeChange = (id, start) => {
      const newTime = {
        ...times.value[id],
        start
      };
      $set(times.value, id, newTime);
      updateServer();
    };

    const onEndTimeChange = (id, end) => {
      const newTime = {
        ...times.value[id],
        end
      };
      $set(times.value, id, newTime);
      updateServer();
    };

    const onActiveToggle = id => {
      const active = times.value[id].active;
      const newTime = {
        ...times.value[id],
        active: !active
      };
      $set(times.value, id, newTime);
      updateServer();
    };

    return {
      onEndTimeChange,
      onActiveToggle,
      onStartTimeChange,
      onDayChange,
      addTime,
      times,
      isNewTime,
      onDeleteTime
    };
  },
  components: {
    Title,
    Button,
    DayTimeSection,
    Divider
  }
};
</script>

<style lang="scss" scoped>
.title-container {
  display: flex;
  justify-content: space-between;
}
</style>
