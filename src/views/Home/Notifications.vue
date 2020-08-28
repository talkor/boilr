<template>
  <AppView class="notifications">
    <ViewHeader title="Notifications">
      <template v-slot:left>
        <BackButton />
      </template>
    </ViewHeader>
    <ViewContent />
  </AppView>
</template>

<script>
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import BackButton from '@/components/core/BackButton';

export default {
  components: {
    AppView,
    ViewHeader,
    ViewContent,
    BackButton
  }
};
</script>
