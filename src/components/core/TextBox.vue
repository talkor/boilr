<template>
  <b-field class="textbox" :label="label" :message="error">
    <b-input
      :type="type"
      :placeholder="placeholder"
      @input="onInput"
      :password-reveal="type === 'password'"
    ></b-input>
  </b-field>
</template>

<script>
import { ref } from '@vue/composition-api';

export default {
  name: 'TextBox',
  props: {
    placeholder: String,
    type: String,
    label: String,
    value: String
  },
  setup(props, { emit }) {
    const error = ref('');

    const onInput = value => {
      emit('input', value);
    };

    return { error, onInput };
  }
};
</script>

<style scoped lang="scss">
.textbox {
  text-align: left;
}
</style>
