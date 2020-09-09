<template>
  <AppView class="statistics">
    <ViewHeader title="Statistics" />
    <ViewContent>
      <div class="time" v-for="(user, index) in users" :key="user.id">
        <UserIcon :image="user.photo" />
        <Label bold :text="user.name" />
        <Label
          :text="
            Math.floor(
              user.totalShowersTime / user.totalShowersNumber
            ).toString()
          "
        />
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
          b.totalShowersTime / b.totalShowersNumber -
          a.totalShowersTime / a.totalShowersNumber
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
