<template>
  <div class="back-button">
    <Button
      text=""
      icon="chevron-left"
      @click="onBack"
      size="medium"
      :noBorder="true"
    />
  </div>
</template>

<script>
import Button from '@/components/core/Button/Button';

export default {
  name: 'BackButton',
  setup(props, { root }) {
    const router = root.$router;

    const onBack = () => {
      router.go(-1);
    };

    return { onBack };
  },
  components: {
    Button
  }
};
</script>

<style scoped lang="scss">
.back-button {
  display: flex;
  align-items: flex-start;
  position: fixed;
  top: 10px;
  left: 10px;

  > button {
    font-size: 1em !important;
  }
}
</style>
