<template>
  <Fragment>
    <b-menu-item
      class="list-item"
      :label="label"
      :icon="icon"
      @click="action"
    />
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';

export default {
  props: {
    label: {
      type: String
    },
    icon: {
      type: String
    },
    action: {
      type: Function
    }
  },
  components: {
    Fragment
  }
};
</script>

<style scoped lang="scss">
li.list-item {
  padding: 10px 0;
  border: none;
}
</style>

<style>
.list-item .icon {
  margin-right: 10px;
}
</style>
