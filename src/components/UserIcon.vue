<template>
  <div class="user-icon">
    <img :src="image" class="profile-image" />
  </div>
</template>

<script>
export default {
  props: {
    image: String
  },
  setup() {},
  components: {}
};
</script>

<style scoped lang="scss">
.user-icon {
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  .profile-image {
    border-radius: 50%;
  }
}
</style>
