<template>
  <AppView class="shower">
    <ViewHeader title="Shower">
      <template v-slot:left>
        <BackButton icon="times" />
      </template>
    </ViewHeader>
    <ViewContent>
      <img class="shower-image" src="../../assets/shower.png" />
      <Timer class="timer" />
      <CoreButton
        class="start-shower"
        size="medium"
        text="End Shower"
        primary
      />
    </ViewContent>
  </AppView>
</template>

<script>
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import CoreButton from '@/components/core/CoreButton';
import BackButton from '@/components/core/BackButton';
import Timer from '@/components/Timer';

export default {
  components: {
    AppView,
    ViewHeader,
    ViewContent,
    CoreButton,
    BackButton,
    Timer
  }
};
</script>

<style lang="scss" scoped>
.timer {
  margin-block-end: 50px;
}
</style>
