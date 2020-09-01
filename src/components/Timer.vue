<template>
  <div class="timer">
    <span class="minutes">{{ `${time.minutes}`.padStart(2, 0) }}</span
    >:<span class="seconds">{{ `${time.seconds}`.padStart(2, 0) }} </span>
  </div>
</template>

<script>
import { reactive, onMounted } from '@vue/composition-api';

export default {
  setup() {
    let current = 0;
    const time = reactive({
      minutes: 0,
      seconds: 0
    });

    const timer = () => {
      current += 1000;
      time.minutes = Math.floor(current / 1000 / 60);
      time.seconds = (current / 1000) % 60;
      setTimeout(timer, 1000);
    };

    onMounted(() => {
      timer();
    });

    return {
      time
    };
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.timer {
  font-size: 40px;
  color: $text-color;
}
</style>
