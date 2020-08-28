<template>
  <div class="slider">
    <b-slider
      v-model="sliderValue"
      :min="5"
      :max="60"
      :step="5"
      rounded
    ></b-slider>
  </div>
</template>

<script>
import { watch, ref } from '@vue/composition-api';

export default {
  props: {
    value: Number
  },
  setup({ value }, { emit }) {
    console.log(value);
    const sliderValue = ref(value);

    watch(sliderValue, (sliderValue) => {
      emit('change', sliderValue);
    });

    return {
      sliderValue
    };
  }
};
</script>

<style lang="scss" scoped>
.slider {
  margin-block-start: 10px;
  margin-block-end: 10px;
  margin-inline-start: 10px;
  margin-inline-end: 10px;
}
</style>
