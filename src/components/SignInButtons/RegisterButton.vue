<template>
  <router-link to="register">
    <CoreButton
      class="register-button"
      rounded
      size="medium"
      text="No Account?
    Register"
      icon="account"
    />
  </router-link>
</template>

<script>
import CoreButton from '@/components/core/CoreButton';

export default {
  setup() {},
  components: {
    CoreButton
  }
};
</script>
<style scoped lang="scss">
.register-button {
  width: 250px;
}
</style>
