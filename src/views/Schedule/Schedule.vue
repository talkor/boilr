<template>
  <div class="schedule">
    <div class="title-container">
      <Title text="Schedule" />
      <Button @click="addTime" text="Add Time" />
    </div>
    <div class="time" v-for="(time, index) in times" :key="index">
      <TimeRenderer
        :start="time.start"
        :end="time.end"
        :days="time.days"
        :active="time.active"
        @click="editTime(index)"
      />
      <Divider v-if="index !== times.length - 1" />
    </div>
    <Modal :isActive="showTimePicker">
      <TimePicker />
      {{editedTime}}
    </Modal>
  </div>
</template>

<script>
import Title from '@/components/core/Title/Title';
import Button from '@/components/core/Button/Button';
import Divider from '@/components/core/Divider/Divider';
import Modal from '@/components/core/Modal/Modal';
import TimeRenderer from '@/components/TimePicker/TimeRenderer';
import TimePicker from '@/components/TimePicker/TimePicker';
import { reactive, ref } from '@vue/composition-api';

export default {
  setup() {
    const showTimePicker = ref(false);
    const editedTime = ref(null);

    const times = reactive([
      {
        start: '10:10',
        end: '11:00',
        days: [1, 2, 3, 4, 5, 6, 7],
        active: true
      },
      {
        start: '20:00',
        end: '21:00',
        days: [1, 2, 3, 4, 6, 7],
        active: false
      },
      {
        start: '6:00',
        end: '7:00',
        days: [1, 2, 3, 5, 6, 7],
        active: true
      }
    ]);

    const close = () => {
      showTimePicker.value = false;
    };

    const addTime = () => {};

    const editTime = index => {
      showTimePicker.value = true;
      editedTime.value = index;
    };

    return {
      times,
      addTime,
      showTimePicker,
      close,
      editTime,
      editedTime
    };
  },
  components: {
    Title,
    Button,
    TimeRenderer,
    Divider,
    Modal,
    TimePicker
  }
};
</script>

<style lang="scss" scoped>
.title-container {
  display: flex;
  justify-content: space-between;
}
</style>
