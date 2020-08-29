<template>
  <AppView class="notifications">
    <ViewHeader title="Notifications">
      <template v-slot:left>
        <BackButton />
      </template>
    </ViewHeader>
    <ViewContent>
      <div class="log-list">
        <div v-for="(item, index) in shortLogList" :key="index">
          <div class="log-item">
            <div class="time">
              {{ new Date(item.timestamp.toDate()).toLocaleString() }}
            </div>
            <div class="text">
              iBoiler was turned
              <strong>{{ item.event.toUpperCase() }}</strong> for
              {{ item.name }}
            </div>
          </div>
          <Divider v-if="index !== shortLogList.length - 1" />
        </div>
      </div>
    </ViewContent>
  </AppView>
</template>

<script>
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import BackButton from '@/components/core/BackButton';
import Divider from '@/components/core/Divider';
import { getDeviceData } from '@/services/deviceService';
import { ref, onMounted, computed } from '@vue/composition-api';

export default {
  setup() {
    const logList = ref([]);
    onMounted(async () => {
      const { log } = await getDeviceData();
      logList.value = log;
    });

    const shortLogList = computed(() => {
      if (!logList.value.length) {
        return;
      }
      return logList.value.slice(0, 10).reverse();
    });

    return { shortLogList };
  },
  components: {
    AppView,
    ViewHeader,
    ViewContent,
    BackButton,
    Divider
  }
};
</script>
<style lang="scss">
.log-list {
  text-align: start;
  margin-block-end: 20px;

  .time {
    font-size: 14px;
  }
  .text {
    font-size: 16px;
  }
}
</style>
