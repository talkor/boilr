<template>
  <div class="device">
    <BackButton />
    <Title text="My Device" />
    <div v-if="device">Connected to {{ device }}</div>
    <Button text="Change device" />
    <!-- <TextBox type="text" label="Connected device" /> -->
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

export default {
  props: {
    device: String
  },
  setup({ device }) {
    const message = ref('Scanning...');
    const showScanner = ref(false);

    const onDecode = decodedString => {
      message.value = decodedString;
      showScanner.value = false;
    };

    const onError = errorStr => {
      message.value = errorStr;
    };

    console.log(device);
    return {
      onDecode,
      onError,
      message,
      showScanner
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
