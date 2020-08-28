<template>
  <AppView class="home">
    <ViewHeader title="iBoiler">
      <template v-slot:right>
        <router-link to="/notifications">
          <Icon class="card-icon" name="bell" pack="far" />
        </router-link>
      </template>
      <template v-slot:left>
        <router-link to="/settings/profile">
          <UserIcon :image="userData.photo" />
        </router-link>
      </template>
    </ViewHeader>
    <ViewContent class>
      <section class="cards">
        <Card
          label="Water Temperature"
          :dataLabel="`${Math.round(temperature)}°C`"
          icon="thermometer-empty"
        />
        <Card label="Weather" icon="sun">
          <Weather />
        </Card>
      </section>
      <section class="switch-container">
        <Button
          @click="onSwitchClick"
          :class="{ 'switch-button': true, active: active }"
          icon="power-off"
        />
      </section>
      <section
        :class="{ times: true, active: active, timerActive: !timerActive }"
      >
        <Button
          v-for="(timeItem, idx) in timeData"
          :key="idx"
          :text="timeItem.text"
          :TIME_LIMIT="timeItem.TIME_LIMIT"
          @click="onTimeClick(timeItem)"
        />
      </section>
      <section
        :class="{ times: true, active: active, timeClicked: timeClicked }"
      >
        <Timer
          v-if="timeClicked"
          :TIME_LIMIT="TIME_LIMIT"
          @onTimesUp="onTimesUp"
        />
      </section>
      <section>
        <Button
          @click="onStartShowerClick"
          v-if="timeIsUp & startShower"
          class="start-shower animate__animated animate__pulse animate__slow animate__infinite"
          icon="shower"
          size="medium"
          text="Start Shower"
        />
        <Button
          v-if="timeIsUp & !startShower"
          class="end-shower"
          icon="shower"
          size="medium"
          text="End Shower"
        />
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
import Button from '@/components/core/Button';
import ConnectToSpotify from '@/components/Spotify/ConnectToSpotify';
import Timer from '@/components/core/Timer';
import { ref, onMounted } from '@vue/composition-api';
import { watchDevice, postDeviceData } from '@/services/deviceService';
import { getUserData } from '@/services/userService';
import Icon from '@/components/core/Icon';
import ViewContent from '@/components/shell/ViewContent';
import AppView from '@/components/shell/AppView';
import UserIcon from '@/components/UserIcon';
import { log } from '@/services/loggerService';
import 'animate.css';

export default {
  name: 'Home',
  props: {
    userData: Object
  },
  setup() {
    const active = ref(false);
    const temperature = ref(0);
    const timerActive = ref(false);
    const timeClicked = ref(false);
    const timeIsUp = ref(false);
    const startShower = ref(true);
    const TIME_LIMIT = ref(600);
    let userData;

    const timeData = [
      {
        text: 'Default shower time',
        TIME_LIMIT: 600
      },
      {
        text: '5 Minutes',
        TIME_LIMIT: 300
      },
      {
        text: '10 Minutes',
        TIME_LIMIT: 600
      },
      {
        text: '20 Minutes',
        TIME_LIMIT: 1200
      },
      {
        text: '30 Minutes',
        TIME_LIMIT: 1800
      },
      {
        text: '40 Minutes',
        TIME_LIMIT: 2400
      },
      {
        text: '50 Minutes',
        TIME_LIMIT: 3000
      },
      {
        text: '1 Hour',
        TIME_LIMIT: 3599
      }
    ];

    watchDevice({}, (data) => {
      active.value = data.active;
      temperature.value = data.temperature;
    });

    onMounted(async () => {
      userData = await getUserData();
      timeData[0].TIME_LIMIT = userData.defaultShowerTime * 60;
    });

    const onTimesUp = () => {
      onSwitchClick();
      timeIsUp.value = true;
    };

    const onStartShowerClick = () => {
      active.startShower ? true : (startShower.value = false);
    };

    const onSwitchClick = () => {
      const newActive = !active.value;
      postDeviceData({ active: newActive });
      log({ event: newActive ? 'on' : 'off' });
      active.value = newActive;
      active.timerActive ? false : (timerActive.value = false);
      active.timeClicked ? false : (timeClicked.value = false);
      active.timeIsUp ? true : (timeIsUp.value = false);
      active.startShower ? false : (startShower.value = true);
    };

    const onTimeClick = (item) => {
      timerActive.value = !timerActive.value;
      timeClicked.value = !timeClicked.value;
      TIME_LIMIT.value = item.TIME_LIMIT;
    };

    return {
      onTimesUp,
      onSwitchClick,
      onTimeClick,
      onStartShowerClick,
      temperature,
      timeData,
      active,
      TIME_LIMIT,
      timerActive,
      timeClicked,
      timeIsUp,
      startShower
    };
  },
  components: {
    ViewHeader,
    Card,
    Button,
    ConnectToSpotify,
    Timer,
    Weather,
    Icon,
    ViewContent,
    AppView,
    UserIcon
  }
};
</script>

<style scoped lang="scss">
.home {
  .switch-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;

    .switch-button {
      font-size: 24px;
      background: none;
      width: 100px;
      height: 100px;
      border-radius: 50%;

      &.active {
        color: #ffffff;
        background-color: rgb(247, 117, 117);
      }
    }
  }

  .start-shower {
    background-color: powderblue;
    font-weight: bolder;
    margin: 20%;
  }

  .end-shower {
    background-color: rgb(247, 117, 117);
    font-weight: bold;
    margin: 20%;
  }

  .spotify {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 75%;
  }

  .times {
    display: none;

    &.active {
      grid-template-columns: 1fr 1fr;
      grid-gap: 15px;
      margin-top: 10px;
      padding: 10px;

      &.timeClicked {
        display: inline-flex;
      }

      &.timerActive {
        display: contents;
      }
    }
  }
}
</style>
