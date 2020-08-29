<template>
  <b-field :label="label">
    <b-timepicker
      class="time-picker"
      icon="clock"
      v-model="value"
      :enable-seconds="false"
      :editable="true"
      :hour-format="`24`"
    />
  </b-field>
</template>

<script>
import { ref, watch } from '@vue/composition-api';

export default {
  props: {
    time: String,
    label: String
  },
  setup({ time }, { emit }) {
    const newTime = new Date();
    const hours = time.split(':')[0];
    const minutes = time.split(':')[1];
    newTime.setHours(hours, minutes);
    const value = ref(newTime);

    watch(value, (value) => {
      const hours = `${value.getHours()}`.padStart(2, '0');
      const minutes = `${value.getMinutes()}`.padStart(2, '0');
      const newTime = `${hours}:${minutes}`;
      emit('timeChange', newTime);
    });

    return {
      value
    };
  }
};
</script>
<style lang="scss">
.field.time-picker .label {
  text-align: start;
  font-size: 14px;
}
</style>
