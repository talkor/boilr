<template>
  <AppView class="settings">
    <ViewHeader title="Settings" />
    <ViewContent>
      <div class="settings">
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
import { ref, onMounted } from '@vue/composition-api';
import { getUserData } from '@/services/userService';

export default {
  setup(_, { root }) {
    const router = root.$router;
    const userData = ref(null);

    onMounted(async () => {
      userData.value = await getUserData();
    });

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
                  params: { device: userData.value.device }
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
                  params: {
                    defaultShowerTime: userData.value.defaultShowerTime
                  }
                });
              }
            },
            {
              label: 'Preferences',
              icon: 'cogs',
              action: () => {
                router.push({
                  name: 'Preferences',
                  params: {}
                });
              }
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
      list
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
