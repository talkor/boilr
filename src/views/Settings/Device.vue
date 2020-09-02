<template>
  <AppView class="device">
    <ViewHeader title="My Device">
      <template v-slot:left>
        <BackButton />
      </template>
    </ViewHeader>
    <ViewContent>
      <Subtitle text="Device control" class="section-heading" />
      <CoreButton
        @click="onSwitchClick"
        :type="active ? 'danger' : null"
        icon="power-off"
        :text="`Turn ${active ? 'OFF' : 'ON'}`"
      />
      <Divider />
      <section>
        <Subtitle text="Connected device" class="section-heading" />
        <div v-if="deviceId" class="device-id">{{ deviceId }}</div>
        <CoreButton
          @click="onChangeDevice"
          :text="showScanner ? 'Cancel' : 'Change device'"
        />
        <QRScanner v-if="showScanner" @decode="onDecode" @error="onError" />
        <div v-if="showScanner" class="message">{{ message }}</div>
      </section>
    </ViewContent>
  </AppView>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api';
import QRScanner from '@/components/QRScanner/QRScanner';
import BackButton from '@/components/core/BackButton';
import { postUserData } from '@/services/userService';
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import CoreButton from '@/components/core/CoreButton';
import Divider from '@/components/core/Divider';
import Subtitle from '@/components/core/Subtitle';
import {
  getDeviceData,
  postDeviceData,
  watchDevice
} from '@/services/deviceService';
import { log } from '@/services/loggerService';

export default {
  props: {
    device: String
  },
  setup({ device }) {
    const deviceId = ref(device);
    const message = ref('Scanning...');
    const showScanner = ref(false);
    const active = ref(false);

    watchDevice({}, (data) => {
      active.value = data.active;
    });

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

    const onSwitchClick = () => {
      const newActive = !active.value;
      postDeviceData({ active: newActive });
      log({ event: newActive ? 'on' : 'off' });
    };

    return {
      onDecode,
      onError,
      message,
      showScanner,
      onChangeDevice,
      deviceId,
      onSwitchClick,
      active
    };
  },
  components: {
    QRScanner,
    BackButton,
    CoreButton,
    AppView,
    ViewHeader,
    ViewContent,
    Divider,
    Subtitle
  }
};
</script>

<style scoped lang="scss">
.device {
  text-align: start;

  .message {
    margin-block-start: 20px;
  }

  .section-heading {
    font-weight: 600;
    margin-block-end: 20px;
  }

  .device-id {
    margin-block-start: 15px;
    margin-block-end: 10px;
  }
}
</style>
