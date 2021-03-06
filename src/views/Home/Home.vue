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
        <Label bold :text="`Hi there, ${user.name}`" class="greeting start" />
        <Card icon="power-off" label="Boiler Status">
          <Label v-if="!!active" class="boiler-active start" text="ON" />
          <Label v-else text="OFF" class="start" />
        </Card>
        <Card label="Water Temperature" icon="thermometer-empty">
          <Label
            class="start"
            :class="{ 'min-hot-temperature': temperature >= 40 }"
            :text="`${displayedTemperature}`"
          />
        </Card>
        <Card
          label="Shower Minutes"
          :dataLabel="`${showerMinutes > 0 ? showerMinutes : 0} minutes`"
          icon="tint"
        />
        <Card label="Weather" icon="sun">
          <Weather />
        </Card>
      </section>
      <section>
        <router-link
          :to="{
            name: 'Shower',
            params: {
              showerData,
              defaultShowerTime: user.defaultShowerTime,
              isSoundEnabled: soundEnabled
            }
          }"
        >
          <CoreButton
            class="start-shower"
            icon="shower"
            size="medium"
            text="Start Shower"
            :type="notifyStartShower ? 'primary' : null"
            @click="onStartShower"
          />
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
import { ref, onMounted, reactive, watch } from '@vue/composition-api';
import { watchDevice, postDeviceData } from '@/services/deviceService';
import Icon from '@/components/core/Icon';
import ViewContent from '@/components/shell/ViewContent';
import AppView from '@/components/shell/AppView';
import UserIcon from '@/components/UserIcon';
import Label from '@/components/core/Label';
import { NotificationProgrammatic as Notification } from 'buefy';
import { getUserData, postUserData } from '@/services/userService';

const MINIMUM_SHOWER_TEMP = 40;
export default {
  name: 'Home',
  setup() {
    const active = ref(false);
    const temperature = ref(0);
    const notifyStartShower = ref(false);
    const showerMinutes = ref(0);
    const showerData = ref(null);
    const displayMode = ref(0);
    const displayedTemperature = ref(0);
    const soundEnabled = ref(true);
    const user = reactive({
      name: '',
      photo: ''
    });
    var showersCounter = ref(0);

    watchDevice({}, (data) => {
      active.value = data.active;
      temperature.value = Math.floor(data.temperature);
      showerMinutes.value = Math.floor(
        (temperature.value - MINIMUM_SHOWER_TEMP) / 2
      );
      if (displayMode.value == 0) {
        displayedTemperature.value = temperature.value + '°C';
      } else if (displayMode.value == 1) {
        displayedTemperature.value = (temperature.value * 9) / 5 + 32 + '°F';
      }
      if (data.showerData?.ready) {
        notifyStartShower.value = true;
        showerData.value = data.showerData;
        postDeviceData({ showerData: { ...data.showerData, ready: false } });
      }
    });

    onMounted(async () => {
      const userData = await getUserData();
      user.photo = userData.photo;
      user.name = userData.name;
      user.defaultShowerTime = userData.defaultShowerTime;
      showersCounter.value = userData.totalShowersNumber;
      soundEnabled.value = userData.isSoundEnabled;
      if (userData.temperatureMode) {
        if (userData.temperatureMode == 'C') {
          displayMode.value = 0;
        } else {
          displayMode.value = 1;
        }
      }
    });

    watch(notifyStartShower, (oldNotifyStartShower, newNotifyShower) => {
      if (oldNotifyStartShower && !newNotifyShower) {
        notify();
      }
    });

    const onStartShower = () => {
      notifyStartShower.value = false;
      postUserData({
        totalShowersNumber: ++showersCounter.value
      });
    };

    const notify = () => {
      Notification.open({
        indefinite: true,
        message: 'Your shower is ready!',
        position: 'is-top',
        type: 'is-success'
      });
    };

    return {
      temperature,
      displayMode,
      active,
      user,
      onStartShower,
      notifyStartShower,
      showerMinutes,
      showerData,
      displayedTemperature,
      showersCounter,
      soundEnabled
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

  .boiler-active {
    color: $danger;
  }

  .min-hot-temperature {
    color: $danger;
  }

  .greeting {
    margin-block-end: 15px;
  }
}
</style>
