<template>
  <AppView class="settings">
    <ViewHeader title="Settings" />
    <ViewContent>
      <div class="settings">
        <div class="container">
          <!-- <img :src="user.photo" class="profile-photo" /> -->
          <!-- CoreButton :rounded="true" :text="user.name" @click="changeName" /> -->
        </div>
        <List :data="list.data" />
      </div>
    </ViewContent>
  </AppView>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import List from '@/components/List/List';
import { reactive } from '@vue/composition-api';
import AppView from '@/components/shell/AppView';
import ViewContent from '@/components/shell/ViewContent';
import ViewHeader from '@/components/shell/ViewHeader';
import { onMounted } from '@vue/composition-api';
import { getUserData } from '@/services/userService';

export default {
  setup(_, { root }) {
    const router = root.$router;
    let userData;

    onMounted(async () => {
      userData = await getUserData();
    });

    const changeName = () => {
      router.push({ name: 'Profile', params: {} });
    };

    const list = reactive({
      data: [
        {
          label: 'Device',
          items: [
            {
              label: 'My Device',
              icon: 'temperature-high',
              action: () => {
                router.push({
                  name: 'Device',
                  params: { device: userData.device }
                });
              }
            }
          ]
        },
        {
          label: 'Preferences',
          items: [
            {
              label: 'Shower settings',
              icon: 'shower',
              action: () => {
                router.push({
                  name: 'ShowerSettings',
                  params: { defaultShowerTime: userData.defaultShowerTime }
                });
              }
            },
            {
              label: 'Preferences',
              icon: 'cogs',
              action: () => {}
            }
          ]
        },
        {
          label: 'Account',
          items: [
            {
              label: 'Logout',
              icon: 'sign-out-alt',
              action: () => onLogOut()
            }
          ]
        }
      ]
    });

    const onLogOut = async () => {
      try {
        await firebase.auth().signOut();
        router.replace({ name: 'Login' });
      } catch (error) {
        throw new Error(error);
      }
    };

    return {
      onLogOut,
      list,
      changeName
    };
  },
  components: {
    List,
    AppView,
    ViewHeader,
    ViewContent
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-photo {
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
