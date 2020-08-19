<template>
  <div class="settings">
    <Title text="Settings" />
    <div class="container">
    <img v-bind:src="theuser.userphoto" class="profile-photo" />
    
    <Button
      class="name-button"
      :noBorder="true"
      :noPadding="true"
      :rounded="false"
      :text="theuser.username"
      @click="changeName"
    /></div>
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

    const theuser = reactive({
        username: '',
        userphoto: ''
      });
    
    const changeName = () => {
      router.push({ name: 'Profile', params: { name: userData.name } });
    };
    
    onMounted(async () => {
      const userDatat = await getUserData();
      theuser.username = userDatat.name;
      theuser.userphoto = userDatat.photo;
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
                router.push({ name: 'ShowerSettings', 
                params: { defaultShowerTime: userData.defaultShowerTime }})
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
      theuser
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

.container {
    display: inline-block;
    text-align: center;
}
  .profile-photo {
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  }
  .name-button {
	color:#000000;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	text-shadow:0px 1px 0px #528ecc;
  display: block;
  }
</style>
