<template>
  <div class="home">
    <Title text="Boilr" />
    <section class="cards">
      <div class="card">
        <h2 class="card-title">Temperatue</h2>
        <div class="card-container">
          <span class="card-number">59°C</span>
          <Icon class="card-icon" icon="thermometer-empty" size="medium" />
        </div>
      </div>
      <div class="card">
        <h2 class="card-title">Weather</h2>
        <div class="card-container">
          <span class="card-number">23°C</span>
          <Icon class="card-icon" icon="sun" size="medium" />
        </div>
      </div>
      <div class="card">
        <h2 class="card-title">Energy Points</h2>
        <div class="card-container">
          <span class="card-number">5K</span>
          <Icon class="card-icon" icon="lightbulb" size="medium" />
        </div>
      </div>
      <div class="card">
        <h2 class="card-title">Avg. Water</h2>
        <div class="card-container">
          <span class="card-number">20L</span>
          <Icon class="card-icon" icon="tint" size="medium" />
        </div>
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
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => console.log(doc.data()));
        });
    });
  },
  components: {
    Title,
    Icon
  }
};
</script>
<style scoped lang="scss">
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  margin-top: 30px;

  .card {
    width: 100%;
    height: 100px;
    border-radius: 10px;
    border: 0.2px solid rgba(0, 0, 0, 0.11);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .card-title {
      align-self: flex-start;
      margin: 10px 0 0 10px;
    }

    .card-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .card-icon {
        margin: 10px;
      }

      .card-number {
        margin-left: 10px;
        font-size: 28px;
      }
    }
  }
}
</style>
