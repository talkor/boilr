<template>
  <b-field :label="label">
    <b-timepicker
      class="time-picker"
      :placeholder="placeholder"
      editable
      icon="clock"
      v-model="value"
    />
  </b-field>
</template>

<script>
import { ref, watch } from '@vue/composition-api';

export default {
  props: {
    time: {
      type: String
    },
    placeholder: {
      type: String
    },
    label: {
      type: String
    }
  },
  setup({ time }, { emit }) {
    const newTime = new Date();
    const hours = time.split(':')[0];
    const minutes = time.split(':')[1];
    newTime.setHours(hours, minutes);
    const value = ref(newTime);

    watch(value, value => {
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
<style scoped lang="scss"></style>
