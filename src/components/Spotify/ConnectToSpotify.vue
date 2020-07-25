<template>
  <router-link to="">
    <Button
      class="spotify-button"
      rounded
      size="medium"
      text="Connect To Spotify"
      icon="spotify"
      iconPack="fab"
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
.spotify-button {
  width: 250px;
  background-color: #1ed760;
  color: #ffffff;
}
</style>
