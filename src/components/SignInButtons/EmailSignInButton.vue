<template>
  <router-link to="login/email">
    <CoreButton
      class="email-button"
      rounded
      size="medium"
      text="Sign In With
    Email"
      icon="envelope"
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
.email-button {
  width: 250px;
}
</style>
