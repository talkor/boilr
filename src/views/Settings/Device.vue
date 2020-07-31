<template>
  <div class="device">
    <BackButton />
    <Title text="My Device" />

    <QRScanner v-if="showDecode" @decode="onDecode" />
    <div>{{ message }}</div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import QRScanner from '@/components/QRScanner/QRScanner';
import BackButton from '@/components/core/BackButton';
import Title from '@/components/core/Title';

export default {
  setup() {
    const message = ref('Scanning...');
    const showDecode = ref(true);

    const onDecode = (decodedString) => {
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
    QRScanner,
    BackButton,
    Title
  }
};
</script>

<style scoped lang="scss"></style>
