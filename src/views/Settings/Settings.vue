<template>
  <div class="settings">
    <Title text="Settings" />
    <div class="container">
      <Avatar :rounded="true" v-bind:name="user.name" size="70"></Avatar>
      <Button :rounded="true" :text="user.name" @click="changeName" />
    </div>
    <List :data="list.data" />
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Title from '@/components/core/Title';
import List from '@/components/List/List';
import { reactive } from '@vue/composition-api';
import Button from '@/components/core/Button';
import { onMounted } from '@vue/composition-api';
import { getUserData } from '@/services/userService';
import Avatar from '@/components/core/Avatar';

export default {
  props: {
    userData: Object
  },
  setup({ userData }, { root }) {
    const router = root.$router;

    const user = reactive({
      name: ' ',
      photo: ''
    });

    const changeName = () => {
      router.push({ name: 'Profile', params: { } });
    };

    onMounted(async () => {
      const newUserData = await getUserData();
      user.name = newUserData.name;
      user.photo = newUserData.photo;
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
                  params: { }
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
      changeName,
      user
    };
  },
  components: {
    Title,
    List,
    Button,
    Avatar
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
