<template>
  <div class="sign-in">
    <div class="logo-title">iBoiler</div>
    <img class="logo-image" src="../../assets/logo-inverted.png" />
    <img class="login-image" src="../../assets/login.png" />
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
  position: relative;
  background: $primary;
  padding-block-end: 0px;

  .login-image {
    padding-inline-start: 30px;
    padding-inline-end: 30px;
  }

  .logo-image {
    width: 100px;
    position: absolute;
    top: 105px;
    left: 50px;
  }

  .logo-title {
    color: white;
    font-weight: 900;
    font-size: 50px;
    position: relative;
    top: 60px;
    left: 25px;
  }

  .login-button {
    margin-block-end: 50px;
  }
}
</style>
