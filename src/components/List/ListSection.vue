<template>
  <Fragment>
    <b-menu-list :label="label">
      <ListItem
        v-for="(item, index) in items"
        :key="index"
        :label="item.label"
        :icon="item.icon"
        :action="item.action"
      />
    </b-menu-list>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import ListItem from './ListItem';

export default {
  props: {
    items: Array,
    label: String
  },
  components: {
    ListItem,
    Fragment
  }
};
</script>

<style scoped lang="scss">
:global(.menu-label) {
  margin-bottom: 0 !important;
  background-color: black;
}
</style>

<style lang="scss">
.menu-label:not(:last-child).menu-label:not(:last-child) {
  margin-bottom: 0;
}
</style>
