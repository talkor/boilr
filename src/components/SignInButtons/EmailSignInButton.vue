<template>
  <router-link to="login/email">
    <Button
      class="email-button"
      rounded
      size="is-medium"
      text="Sign In With Email"
    >
      <span class="email-icon">
        <font-awesome-icon icon="envelope" />
      </span>
    </Button>
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

  .email-icon {
    margin-right: 10px;
    font-size: 18px;
  }
}
</style>
