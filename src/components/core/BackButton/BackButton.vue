<template>
  <div class="back-button">
    <Button
      text="Back"
      icon="arrow-left"
      @onClick="onBack"
      size="small"
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
}
</style>
