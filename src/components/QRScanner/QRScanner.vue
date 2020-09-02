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
    const onDecode = (decodedString) => {
      emit('decode', decodedString);
    };

    const onInit = async (promise) => {
      try {
        await promise;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          emit('error', 'ERROR: you need to grant camera access permisson');
        } else if (error.name === 'NotFoundError') {
          emit('error', 'ERROR: no camera on this device');
        } else if (error.name === 'NotSupportedError') {
          emit('error', 'ERROR: secure context required (HTTPS, localhost)');
        } else if (error.name === 'NotReadableError') {
          emit('error', 'ERROR: is the camera already in use?');
        } else if (error.name === 'OverconstrainedError') {
          emit('error', 'ERROR: installed cameras are not suitable');
        } else if (error.name === 'StreamApiNotSupportedError') {
          emit('error', 'ERROR: Stream API is not supported in this browser');
        }
      }
    };
    return {
      onDecode,
      onInit
    };
  },
  components: {
    QrcodeStream
  }
};
</script>

<style scoped lang="scss">
.qr-code {
  width: 100%;
  height: 300px;
  border: 2px dashed black;
  margin-block-start: 10px;
}
</style>
