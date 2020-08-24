<template>
  <b-field :label="label" :message="error">
    <b-numberinput @input="onInput" v-model="time.showerTime"></b-numberinput>
  </b-field>
</template>

<script>
import { getUserData } from '@/services/userService';
import { ref, onMounted } from '@vue/composition-api';
import { reactive } from '@vue/composition-api';

export default {
  name: 'NumberInput',
  props: {
    label: String
  },
  setup(props, { emit }) {
    const error = ref('');
    let userData;

    const time = reactive({
      showerTime: ''
    });

    onMounted(async () => {
      userData = await getUserData();
      time.showerTime = userData.defaultShowerTime;
    });

    const onInput = (value) => {
      emit('input', value);
    };

    return { error, onInput, time };
  }
};
</script>
