<template>
  <AppView class="home">
    <ViewHeader title="iBoiler">
      <template v-slot:right>
        <router-link to="/notifications">
          <Icon name="bell" pack="far" class="notifications-icon new" />
        </router-link>
      </template>
      <template v-slot:left>
        <router-link to="/settings/profile">
          <UserIcon :image="user.photo" />
        </router-link>
      </template>
    </ViewHeader>
    <ViewContent>
      <section class="cards">
        <Card icon="home" :label="`Oh hi, ${user.name}!`">
          <Label text="Next shower: 7:00" />
        </Card>
        <Card label="Weather" icon="sun">
          <Weather />
        </Card>
        <Card
          label="Water Temperature"
          :dataLabel="`${Math.floor(temperature)}°C`"
          icon="thermometer-empty"
        />
        <Card label="Shower Minutes" :dataLabel="`40 Min`" icon="tint" />
        <Card icon="power-off" label="Boiler Status" :dataLabel="active ? 'ON' : 'OFF'" />
      </section>
      <section>
        <router-link to="shower">
          <CoreButton class="start-shower" icon="shower" size="medium" text="Start Shower" primary />
        </router-link>
        <div v-show="false">
          <ConnectToSpotify class="spotify" />
        </div>
      </section>
    </ViewContent>
  </AppView>
</template>

<script>
import Weather from '@/components/Weather';
import Card from '@/components/core/Card';
import 'firebase/firestore';
import ViewHeader from '@/components/shell/ViewHeader';
import CoreButton from '@/components/core/CoreButton';
import ConnectToSpotify from '@/components/Spotify/ConnectToSpotify';
import { ref, onMounted, reactive } from '@vue/composition-api';
import { watchDevice } from '@/services/deviceService';
import Icon from '@/components/core/Icon';
import ViewContent from '@/components/shell/ViewContent';
import AppView from '@/components/shell/AppView';
import UserIcon from '@/components/UserIcon';
import Label from '@/components/core/Label';
import { ToastProgrammatic } from 'buefy';
import { getUserData } from '@/services/userService';

export default {
  name: 'Home',
  props: {
    userData: Object
  },
  setup() {
    const active = ref(false);
    const temperature = ref(0);
    const user = reactive({
      name: '',
      photo: ''
    });

    watchDevice({}, (data) => {
      active.value = data.active;
      temperature.value = data.temperature;
    });

    onMounted(async () => {
      const userData = await getUserData();
      user.photo = userData.photo;
      user.name = userData.name;

      if (active.value) {
        notify();
      }
    });

    const notify = () => {
      ToastProgrammatic.open({
        duration: 5000,
        message: 'Your shower is ready!',
        position: 'is-top',
        type: 'is-success'
      });
    };

    return {
      temperature,
      active,
      user
    };
  },
  components: {
    ViewHeader,
    Card,
    CoreButton,
    ConnectToSpotify,
    Weather,
    Icon,
    ViewContent,
    AppView,
    UserIcon,
    Label
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.home {
  .notifications-icon {
    color: $text-color;
    position: relative;
  }

  .cards {
    // display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }

  .spotify {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 75%;
  }

  .start-shower {
    margin-block-start: 50px;
  }
}
</style>
