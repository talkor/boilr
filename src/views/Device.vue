<template>
  <div class="device">
    <qrcode-stream
      class="qr-code"
      v-if="showDecode"
      @decode="onDecode"
    ></qrcode-stream>
    <div>{{ message }}</div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  setup() {
    const message = ref('Scanning...');
    const showDecode = ref(true);

    const onDecode = decodedString => {
      window.navigator.vibrate(200);
      message.value = decodedString;
      showDecode.value = false;
    };

    return {
      onDecode,
      message,
      showDecode
    };
  },
  components: {
    QrcodeStream
  }
};
</script>

<style scoped lang="scss">
.qr-code {
  width: 300px;
  height: 300px;
  border: 4px dashed black;
}
</style>
