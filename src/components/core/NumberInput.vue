<template>
  <b-field :label="label" :message="error">
    <b-numberinput @input="onInput" v-model="time" />
  </b-field>
</template>

<script>
import { getUserData } from '@/services/userService';
import { ref, onMounted } from '@vue/composition-api';

export default {
  name: 'NumberInput',
  props: {
    label: String
  },
  setup(_, { emit }) {
    const error = ref('');
    let userData;

    const time = ref(0);

    onMounted(async () => {
      userData = await getUserData();
      time.value = userData.defaultShowerTime;
    });

    const onInput = (value) => {
      emit('input', value);
    };

    return { error, onInput, time };
  }
};
</script>
