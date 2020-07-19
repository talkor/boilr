<template>
  <div class="home">
    <Title text="Boilr" />
    <section class="cards">
      <HomeItem
        v-for="(homeItem, index) in homeData"
        :key="index"
        :label="homeItem.label"
        :dataLabel="homeItem.dataLabel"
        :icon="homeItem.icon"
      />
    </section>
    <section class="switch-container">
      <div class="switch">
        <Icon class="switch-icon" name="power-off" />
      </div>
    </section>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import HomeItem from './HomeItem';
import 'firebase/firestore';
import Title from '@/components/core/Title/Title';
import Icon from '@/components/core/Icon/Icon';
import { onMounted } from '@vue/composition-api';

export default {
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
    HomeItem
  }
};
</script>
<style scoped lang="scss">
.switch-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  .switch {
    border: 1px solid #c2c2c2;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .switch-icon {
      font-size: 24px;
    }
  }
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  margin-top: 30px;
}
</style>
