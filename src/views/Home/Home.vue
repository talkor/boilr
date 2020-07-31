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
        :noBorder="true"
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
import { ref, onMounted } from '@vue/composition-api';
import { watchDevice, postDeviceData } from '@/services/deviceService';

export default {
  name: 'Home',
  props: {
    userData: Object
  },
  setup() {
    const active = ref(false);

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

    watchDevice({}, data => {
      active.value = data.active;
    });

    const onSwitchClick = () => {
      postDeviceData({ active: !active.value });
      active.value = !active.value;
    };

    return {
      onSwitchClick,
      homeData,
      active
    };
  },
  components: {
    Title,
    Card,
    Button,
    ConnectToSpotify
  }
};
</script>
<style scoped lang="scss">
.switch-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

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
</style>
