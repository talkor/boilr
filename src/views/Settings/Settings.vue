<template>
  <div class="settings">
    <Title text="Settings" />
    <img v-bind:src="userData.photo" class="profile-photo" />
    <div>
      <Button
        class="name-button"
        :noBorder="true"
        :noPadding="true"
        :rounded="false"
        :text="username"
        @click="changeName"
      />
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

export default {
  props: {
    userData: Object
  },
  setup({ userData }, { root }) {
    const router = root.$router;
    const username = userData.name;

    const changeName = () => {
      router.push({ name: 'Profile', params: { name: userData.name } });
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
      username
    };
  },
  components: {
    Title,
    List,
    Button
  }
};
</script>

<style scoped lang="scss">
.profile-photo {
  margin-right: 10px;
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  align-content: left;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.name-button {
  color: #000000;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-shadow: 0px 1px 0px #528ecc;
}
</style>
