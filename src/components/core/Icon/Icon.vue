<template>
  <b-icon pack="fas" :icon="icon" :size="`is-${size}`" />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String
    },
    size: {
      type: String
    }
  },
  setup() {}
};
</script>

<style scoped lang="scss"></style>
