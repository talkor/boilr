<template>
  <div class="sign-in">
    <Title text="Hi There" />
    <GoogleSignInButton />
    <EmailSignInButton />
    <RegisterButton />
  </div>
</template>

<script>
import GoogleSignInButton from '@/components/SignInButtons/GoogleSignInButton';
import EmailSignInButton from '@/components/SignInButtons/EmailSignInButton';
import RegisterButton from '@/components/SignInButtons/RegisterButton';
import Title from '@/components/core/Title/Title';

export default {
  components: {
    GoogleSignInButton,
    EmailSignInButton,
    RegisterButton,
    Title
  }
};
</script>
