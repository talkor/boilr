<template>
  <div class="back-button">
    <Button
      class="button"
      icon="chevron-left"
      @click="onBack"
      size="medium"
      :noBorder="true"
    />
  </div>
</template>

<script>
import Button from '@/components/core/Button';

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

  .button {
    padding: 0;
    margin: 0;
  }
}
</style>
