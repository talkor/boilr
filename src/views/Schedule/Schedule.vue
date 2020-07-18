<template>
  <div class="schedule">
    <div class="title-container">
      <Title text="Schedule" />
      <Button @click="addTime" text="Add Time" />
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
      />
      <Divider v-if="index !== times.length - 1" />
    </div>
  </div>
</template>

<script>
import Title from '@/components/core/Title/Title';
import Button from '@/components/core/Button/Button';
import Divider from '@/components/core/Divider/Divider';
import DayTimeSection from '@/components/DayTime/DayTimeSection';

export default {
  data() {
    return {
      times: [
        {
          start: '10:10',
          end: '11:00',
          days: [true, true, true, true, true, true, true],
          active: true
        },
        {
          start: '20:00',
          end: '21:00',
          days: [true, true, false, true, true, true, true],
          active: false
        },
        {
          start: '6:00',
          end: '7:00',
          days: [true, true, true, true, false, true, true],
          active: true
        }
      ]
    };
  },
  methods: {
    addTime() {},

    onDayChange(index, id) {
      const time = this.times[id];
      let days = time.days;
      days[index] = !days[index];
      const newTime = {
        ...time,
        days: [...days]
      };
      this.$set(this.times, id, newTime);
    },

    onStartTimeChange(id, start) {
      const newTime = {
        ...this.times[id],
        start
      };
      this.$set(this.times, id, newTime);
    },

    onEndTimeChange(id, end) {
      const newTime = {
        ...this.times[id],
        end
      };
      this.$set(this.times, id, newTime);
    },

    onActiveToggle(id) {
      const active = this.times[id].active;
      const newTime = {
        ...this.times[id],
        active: !active
      };
      this.$set(this.times, id, newTime);
    }
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
