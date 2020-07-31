<template>
  <div class="settings">
    <Title text="Settings" />
    <List :data="list.data" />
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Title from '@/components/core/Title';
import List from '@/components/List/List';
import { reactive } from '@vue/composition-api';

export default {
  props: {
    userData: Object
  },
  setup({ userData }, { root }) {
    const router = root.$router;
    const list = reactive({
      data: [
        {
          label: 'Profile',
          items: [
            {
              label: 'My Profile',
              icon: 'user',
              action: () => {}
            },
            {
              label: 'Shower settings',
              icon: 'shower',
              action: () => {}
            },
            {
              label: 'Energy Points',
              icon: 'lightbulb',
              action: () => {}
            }
          ]
        },
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
            },
            {
              label: 'Power Consumption',
              icon: 'plug',
              action: () => {}
            }
          ]
        },
        {
          label: 'Preferences',
          items: [
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
      list
    };
  },
  components: {
    Title,
    List
  }
};
</script>
