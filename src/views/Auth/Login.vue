<template>
  <div class="sign-in">
    <Title text="Welcome to iBoiler" />
    <img class="login-image" src="../../assets/login.png" />
    <GoogleSignInButton />
    <!-- <EmailSignInButton />
    <RegisterButton />-->
  </div>
</template>

<script>
import GoogleSignInButton from '@/components/SignInButtons/GoogleSignInButton';
// import EmailSignInButton from '@/components/SignInButtons/EmailSignInButton';
// import RegisterButton from '@/components/SignInButtons/RegisterButton';
import Title from '@/components/core/Title';

export default {
  components: {
    GoogleSignInButton,
    // EmailSignInButton,
    // RegisterButton,
    Title
  }
};
</script>

<style lang="scss" scoped>
.sign-in {
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;

  .login-image {
    padding-inline-start: 20px;
    padding-inline-end: 20px;
  }
}
</style>
