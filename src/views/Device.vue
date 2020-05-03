<template>
  <div class="device">
    <qrcode-stream @decode="onDecode"></qrcode-stream>
    <div>{{ message }}</div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  setup() {
    const message = ref('');

    const onDecode = decodedString => {
      window.navigator.vibrate(200);
      message.value = decodedString;
    };

    return { onDecode, message };
  },
  components: { QrcodeStream }
};
</script>
