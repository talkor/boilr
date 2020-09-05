<template>
  <b-field class="textbox" :label="label">
    <section>
      <div class="block">
        <b-radio v-model="mode" name="name" native-value="C" @input="onInput">
          {{ option1 }}
        </b-radio>
        <b-radio v-model="mode" name="name" native-value="F" @input="onInput">
          {{ option2 }}
        </b-radio>
      </div>
    </section>
  </b-field>
</template>

<script>
import { ref } from '@vue/composition-api';
export default {
  name: 'RadioButton',
  props: {
    label: String,
    option1: String,
    option2: String,
    value: String
  },
  setup({ value }, { emit }) {
    const error = ref('');
    const mode = ref(value);

    const onInput = (value) => {
      emit('input', value);
    };

    return { error, onInput, mode };
  }
};
</script>

<style scoped lang="scss">
.textbox {
  text-align: left;
}
</style>
