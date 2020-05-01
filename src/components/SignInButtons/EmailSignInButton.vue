<template>
  <router-link to="login/email">
    <Button
      class="email-button"
      rounded
      size="medium"
      text="Sign In With Email"
      icon="envelope"
    />
  </router-link>
</template>

<script>
import Button from '@/components/core/Button/Button';

export default {
  setup() {},
  components: {
    Button
  }
};
</script>
<style scoped lang="scss">
.email-button {
  width: 250px;
}
</style>
