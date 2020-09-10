<template>
  <AppView class="statistics">
    <ViewHeader title="Statistics" />
    <div class="titles">
      <Label center bold text="User" />
      <Label center bold text="Average Shower Time" />
      <Label center bold text="Number Of Showers" />
      <Label center bold text="Total Shower Time" />
    </div>
    <ViewContent>
      <div v-for="(user, index) in users" :key="user.id">
        <div class="user">
          <Label class="start bold" :text="index + 1" />
          <img
            class="badge"
            v-if="index == 0"
            src="../../assets/water_saver_gold.png"
          />
          <img
            class="badge"
            v-if="index == 1"
            src="../../assets/water_saver_silver.png"
          />
        </div>
        <div class="lables">
          <div class="user">
            <UserIcon :image="user.photo" />
            <Label center bold :text="`${user.name}`" />
          </div>
          <Label
            center
            :text="`${Math.floor(
              user.totalShowersTime / user.totalShowersNumber
            ).toString()} Min.`"
          />
          <Label center :text="`${user.totalShowersNumber.toString()}`" />
          <Label center :text="`${user.totalShowersTime.toString()} Min.`" />
        </div>
        <Divider v-if="index !== users.length - 1" />
      </div>
    </ViewContent>
  </AppView>
</template>

<script>
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import { getUsersData } from '@/services/userService';
import { ref, onMounted, computed } from '@vue/composition-api';
import UserIcon from '@/components/UserIcon';
import Label from '@/components/core/Label';
import Divider from '@/components/core/Divider';

export default {
  setup() {
    let usersData;
    const usd = ref([]);
    const users = computed(() => {
      return usd.value.sort(
        (a, b) =>
          a.totalShowersTime / a.totalShowersNumber -
          b.totalShowersTime / b.totalShowersNumber
      );
    });

    onMounted(async () => {
      usersData = await getUsersData();
      usd.value = [...usersData];
    });

    return {
      users,
      usersData
    };
  },
  components: {
    AppView,
    ViewHeader,
    ViewContent,
    UserIcon,
    Label,
    Divider
  }
};
</script>
<style lang="scss" scoped>
.user {
  display: flex;
}
.lables {
  column-count: 4;
  border-style: double;
}

.titles {
  column-count: 4;
}

.badge {
  width: 55px;
  height: 55px;
}
</style>
