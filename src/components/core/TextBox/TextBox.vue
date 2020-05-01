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
    placeholder: {
      type: String
    },
    type: {
      type: String
    },
    label: {
      type: String
    },
    value: {
      type: String
    }
  },
  setup(props, { emit }) {
    const error = ref('');
    // const value = ref('');
    const onInput = value => {
      emit('onInput', value);
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
