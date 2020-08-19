<template>
  <div class="device">
    <BackButton />
    <Title text="My Device" />
    <div v-if="deviceId">Connected to {{ deviceId }}</div>
    <Button
      @click="onChangeDevice"
      :text="showScanner ? 'Cancel' : 'Change device'"
    />
    <QRScanner v-if="showScanner" @decode="onDecode" @error="onError" />
    <div v-if="showScanner" class="message">{{ message }}</div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import QRScanner from '@/components/QRScanner/QRScanner';
import BackButton from '@/components/core/BackButton';
import Title from '@/components/core/Title';
import Button from '@/components/core/Button';
import { postUserData } from '@/services/userService';

export default {
  props: {
    device: String
  },
  setup({ device }) {
    const deviceId = ref(device);

    const message = ref('Scanning...');
    const showScanner = ref(false);

    const onDecode = (decodedString) => {
      const newDeviceId = `${decodedString}`;
      message.value = newDeviceId;
      deviceId.value = newDeviceId;
      showScanner.value = false;
      postUserData({ device: newDeviceId });
    };

    const onError = (errorStr) => {
      message.value = errorStr;
    };

    const onChangeDevice = () => {
      showScanner.value = !showScanner.value;
    };

    return {
      onDecode,
      onError,
      message,
      showScanner,
      onChangeDevice,
      deviceId
    };
  },
  components: {
    QRScanner,
    BackButton,
    Title,
    Button
  }
};
</script>

<style scoped lang="scss">
.message {
  margin-block-start: 20px;
}
</style>
