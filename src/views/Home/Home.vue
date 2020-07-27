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
    <section class="switch">
      <div class="switch-button">
        <Icon class="switch-icon" name="power-off" />
      </div>
    </section>
    <section class="shower">
      <Button icon="shower" size="medium" text="Start Shower" />
      <ConnectToSpotify />
    </section>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import Card from '@/components/core/Card';
import 'firebase/firestore';
import Title from '@/components/core/Title';
import Icon from '@/components/core/Icon';
import Button from '@/components/core/Button';
import ConnectToSpotify from '@/components/Spotify/ConnectToSpotify';
import { onMounted } from '@vue/composition-api';

export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      firebase
        .firestore()
        .collection('users')
        .get();
      // .then(snapshot => {
      //   snapshot.forEach(doc => console.log(doc.data()));
      // });
    });
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
    return {
      homeData
    };
  },
  components: {
    Title,
    Icon,
    Card,
    Button,
    ConnectToSpotify
  }
};
</script>
<style scoped lang="scss">
.switch {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  .switch-button {
    border: 1px solid #c2c2c2;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .switch-icon {
      font-size: 24px;
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
