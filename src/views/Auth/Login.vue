<template>
  <div class="sign-in">
    <div class="logo-container">
      <img class="logo-image" src="../../assets/logo.png" />
      <div class="logo-title">iBoiler</div>
    </div>
    <img class="login-image" src="../../assets/shower.svg" />
    <GoogleSignInButton class="login-button" />
  </div>
</template>

<script>
import GoogleSignInButton from '@/components/SignInButtons/GoogleSignInButton';

export default {
  components: {
    GoogleSignInButton
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.sign-in {
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  padding-block-end: 0px;

  .logo-container {
    margin-block-start: 50px;
    display: flex;
    align-items: center;
    margin-inline-end: 40px;
  }

  .login-image {
    padding-inline-start: 30px;
    padding-inline-end: 30px;
  }

  .logo-image {
    width: 100px;
  }

  .logo-title {
    color: $primary;
    font-weight: 900;
    font-size: 50px;
    margin-block-start: 10px;
  }

  .login-button {
    margin-block-end: 80px;
    border: gray 1px solid;
  }
}
</style>
