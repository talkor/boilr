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
    items: {
      type: Array
    },
    label: {
      type: String
    }
  },
  components: {
    ListItem,
    Fragment
  }
};
</script>

<style scoped lang="scss"></style>
