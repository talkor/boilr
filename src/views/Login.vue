<template>
  <div class="sign-in">
    <GoogleSignInButton />
    <EmailSignInButton @onClick="() => {}" />
  </div>
</template>

<script>
import GoogleSignInButton from '@/components/SignInButtons/GoogleSignInButton';
import EmailSignInButton from '@/components/SignInButtons/EmailSignInButton';

export default {
  components: {
    GoogleSignInButton,
    EmailSignInButton
  }
};
</script>
