<template>
  <div class="list-main">
    <template>
      <ListSection
        v-for="(section, index) in data"
        :key="index"
        :label="section.label"
        :items="section.items"
      />
    </template>
  </div>
</template>

<script>
import ListSection from './ListSection';

export default {
  props: {
    data: {
      type: Array
    }
  },
  components: {
    ListSection
  }
};
</script>

<style scoped lang="scss">
.list-main {
  text-align: left;
}
</style>
