<template>
  <b-checkbox v-model="isChecked">{{ label }}</b-checkbox>
</template>

<script>
import { watch, ref } from '@vue/composition-api';

export default {
  name: 'Button',
  props: {
    label: String,
    checked: Boolean
  },
  setup({ checked }, { emit }) {
    const isChecked = ref(checked);

    watch(isChecked, (isChecked) => {
      emit('change', isChecked);
    });

    return {
      isChecked
    };
  }
};
</script>

<style scoped lang="scss"></style>
