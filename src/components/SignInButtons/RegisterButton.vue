<template>
  <router-link to="register">
    <Button
      class="register-button"
      rounded
      size="medium"
      text="No Account? Register"
      icon="account"
    />
  </router-link>
</template>

<script>
import Button from '@/components/core/Button';

export default {
  setup() {},
  components: {
    Button
  }
};
</script>
<style scoped lang="scss">
.register-button {
  width: 250px;
}
</style>
