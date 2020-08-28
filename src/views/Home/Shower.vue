<template>
  <AppView class="shower">
    <ViewHeader title="Shower" />
    <ViewContent />
  </AppView>
</template>

<script>
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';

export default {
  components: {
    AppView,
    ViewHeader,
    ViewContent
  }
};
</script>
