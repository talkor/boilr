<template>
  <div class="home">
    <Title text="Boilr" />
    <section class="cards">
      <Card
        v-for="(homeItem, index) in homeData"
        :key="index"
        :label="homeItem.label"
        :dataLabel="homeItem.dataLabel"
        :icon="homeItem.icon"
      />
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
    <section v-if="timeIsUp">
      <h1
        class="times-up animate__animated animate__pulse animate__slow animate__infinite"
      >
        Shower Is Ready!
      </h1>
    </section>
    <section :class="{ times: true, active: active, timeClicked: timeClicked }">
      <Timer
        v-if="timeClicked"
        :TIME_LIMIT="TIME_LIMIT"
        @onTimesUp="onTimesUp"
      />
    </section>
    <section class="shower">
      <Button icon="shower" size="medium" text="Start Shower" />
      <ConnectToSpotify />
    </section>
  </div>
</template>

<script>
import Card from '@/components/core/Card';
import 'firebase/firestore';
import Title from '@/components/core/Title';
import Button from '@/components/core/Button';
import ConnectToSpotify from '@/components/Spotify/ConnectToSpotify';
import Timer from '@/components/core/Timer';
import { ref } from '@vue/composition-api';
import { watchDevice, postDeviceData } from '@/services/deviceService';
import 'animate.css';

export default {
  name: 'Home',
  props: {
    userData: Object
  },
  setup() {
    const active = ref(false);
    const timerActive = ref(false);
    const timeClicked = ref(false);
    const timeIsUp = ref(false);
    const TIME_LIMIT = ref(600);
    const homeData = [
      {
        label: 'Temperatue',
        dataLabel: '59°C',
        icon: 'thermometer-empty'
      },
      {
        label: 'Weather',
        dataLabel: '23°C',
        icon: 'sun'
      },
      {
        label: 'Energy Points',
        dataLabel: '5K',
        icon: 'lightbulb'
      },
      {
        label: 'Avg. Water',
        dataLabel: '20L',
        icon: 'tint'
      }
    ];
    const timeData = [
      {
        text: 'Default shower time',
        TIME_LIMIT: 10
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
    watchDevice({}, data => {
      active.value = data.active;
      //timerActive.value = data.timerActive; /* tal- Review this
    });

    const onTimesUp = () => {
      onSwitchClick();
      timeIsUp.value = true;
    };

    const onSwitchClick = () => {
      postDeviceData({ active: !active.value });
      active.value = !active.value;
      active.timerActive ? false : (timerActive.value = false);
      active.timeClicked ? false : (timeClicked.value = false);
      active.timeIsUp ? true : (timeIsUp.value = false);
    };

    const onTimeClick = item => {
      //postDeviceData({ timerActive: !timerActive.value }); /* tal- Review this
      timerActive.value = !timerActive.value;
      timeClicked.value = !timeClicked.value;
      TIME_LIMIT.value = item.TIME_LIMIT;
    };
    return {
      onTimesUp,
      onSwitchClick,
      onTimeClick,
      homeData,
      timeData,
      active,
      TIME_LIMIT,
      timerActive,
      timeClicked,
      timeIsUp
    };
  },
  components: {
    Title,
    Card,
    Button,
    ConnectToSpotify,
    Timer
  }
};
</script>

<style scoped lang="scss">
.switch-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

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

.shower {
  margin-top: 20px;
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  margin-top: 30px;
}

.times-up {
  font-size: 150%;
  font-family: inherit;
  font-weight: bolder;
  color: mediumblue;
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
</style>
