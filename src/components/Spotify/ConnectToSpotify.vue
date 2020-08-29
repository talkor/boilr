<template>
  <router-link to="">
    <CoreButton
      class="spotify-button"
      rounded
      size="medium"
      text="Connect To
    Spotify"
      icon="spotify"
      iconPack="fab"
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
.spotify-button {
  width: 250px;
  background-color: #1ed760;
  color: #ffffff;
}
</style>
