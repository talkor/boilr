<template>
  <AppView class="device">
    <ViewHeader title="My Device">
      <template v-slot:left>
        <BackButton />
      </template>
    </ViewHeader>
    <ViewContent>
      <div v-if="deviceId">Connected to {{ deviceId }}</div>
      <CoreButton
        @click="onChangeDevice"
        :text="showScanner ? 'Cancel' : 'Change device'"
      />
      <QRScanner v-if="showScanner" @decode="onDecode" @error="onError" />
      <div v-if="showScanner" class="message">{{ message }}</div>
    </ViewContent>
  </AppView>
</template>

<script>
import { ref } from '@vue/composition-api';
import QRScanner from '@/components/QRScanner/QRScanner';
import BackButton from '@/components/core/BackButton';
import { postUserData } from '@/services/userService';
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import CoreButton from '@/components/core/CoreButton';

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
    CoreButton,
    AppView,
    ViewHeader,
    ViewContent
  }
};
</script>

<style scoped lang="scss">
.message {
  margin-block-start: 20px;
}
</style>
