<template>
  <Icon class="back-button" :name="icon" @click="onBack" size="small" />
</template>

<script>
import Icon from '@/components/core/Icon';

export default {
  props: {
    icon: {
      type: String,
      default: 'arrow-left'
    }
  },
  setup(props, { root }) {
    const router = root.$router;

    const onBack = () => {
      router.go(-1);
    };

    return { onBack };
  },
  components: {
    Icon
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.back-button {
  color: $primary;
  font-size: 20px;
}
</style>
