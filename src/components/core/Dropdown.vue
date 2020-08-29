<template>
  <b-select :icon="icon" expanded v-model="selectedOption">
    <option v-for="option in options" :key="option.id">
      {{ option.label }}
    </option>
  </b-select>
</template>

<script>
import { watch, ref } from '@vue/composition-api';

export default {
  props: {
    options: Array,
    initialValue: String,
    icon: String
  },
  setup({ initialValue }, { emit }) {
    const selectedOption = ref(initialValue);

    watch(selectedOption, (selectedOption) => {
      emit('change', selectedOption);
    });

    return {
      selectedOption
    };
  }
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';
</style>
