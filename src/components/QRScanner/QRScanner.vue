<template>
  <qrcode-stream
    class="qr-code"
    @decode="onDecode"
    @init="onInit"
  ></qrcode-stream>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  setup(props, { emit }) {
    const onDecode = decodedString => {
      emit('decode', decodedString);
      window.navigator.vibrate(100);
    };

    return {
      onDecode
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
