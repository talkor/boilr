<template>
  <div class="home">
    <Title text="Boilr" />
    <section class="cards">
      <div class="card">
        <h3 class="card-title">Temperatue</h3>
        <div class="card-container">
          <span class="card-number">59°C</span>
          <Icon class="card-icon temperature" name="thermometer-empty" />
        </div>
      </div>
      <div class="card">
        <h3 class="card-title">Weather</h3>
        <div class="card-container">
          <span class="card-number">23°C</span>
          <Icon class="card-icon" name="sun" />
        </div>
      </div>
      <div class="card">
        <h3 class="card-title">Energy Points</h3>
        <div class="card-container">
          <span class="card-number">5K</span>
          <Icon class="card-icon" name="lightbulb" />
        </div>
      </div>
      <div class="card">
        <h3 class="card-title">Avg. Water</h3>
        <div class="card-container">
          <span class="card-number">20L</span>
          <Icon class="card-icon" name="tint" />
        </div>
      </div>
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
  },
  components: {
    Title,
    Icon
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

  .card {
    width: 100%;
    height: 80px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.11);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: none;

    .card-title {
      align-self: flex-start;
      margin: 10px 0 0 10px;
      font-size: 14px;
    }

    .card-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .card-icon {
        margin: 10px;
        font-size: 15px;
      }

      .card-number {
        margin-left: 10px;
        font-size: 22px;
      }
    }
  }
}
</style>
