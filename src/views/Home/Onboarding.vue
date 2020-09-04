<template>
  <portal to="shower-screen">
    <AppView class="shower">
      <ViewHeader title="Welcome!">
        <template v-slot:left>
          <router-link to="/">
            <BackButton icon="times" />
          </router-link>
        </template>
      </ViewHeader>
      <ViewContent>
        <b-carousel
          arrow
          :autoplay="false"
          :arrow-both="false"
          :arrow-hover="false"
          :repeat="false"
        >
          <b-carousel-item>
            <section class="hero is-medium">
              <div class="hero-body has-text-centered">
                <Title text="Hot water, low energy" />
                <img
                  class="onboarding-image"
                  src="../../assets/onboarding-3.svg"
                />
                <p>iBoiler will make sure you have enough hot water on time.</p>
              </div>
            </section>
          </b-carousel-item>
          <b-carousel-item>
            <section class="hero is-medium">
              <div class="hero-body has-text-centered">
                <Title text="Your shower schedule" />
                <img
                  class="onboarding-image"
                  src="../../assets/onboarding-2.svg"
                />
                <p>
                  Set up your shower times and iBoiler will turn on and off
                  automatically, providing you with just the right water
                  temperatur for your shower.
                </p>
              </div>
            </section>
          </b-carousel-item>
          <b-carousel-item>
            <section class="hero is-medium">
              <div class="hero-body has-text-centered">
                <Title text="Connect your device" />
                <QRScanner @decode="onDecode" @error="onError" />
                <div class="message">{{ message }}</div>
                <p>Scan your device code to connect it to the app</p>
              </div>
            </section>
          </b-carousel-item>
          <b-carousel-item>
            <section class="hero is-medium">
              <div class="hero-body has-text-centered">
                <Title text="Your usual shower time" />
                <div>
                  {{ showerTime }} Minutes
                  <Slider
                    label="Usual Shower Time"
                    :value="10"
                    @change="onTimeChange"
                  />
                </div>
                <img
                  class="onboarding-image"
                  src="../../assets/onboarding-4.svg"
                />
                <p>
                  Choose your average usual shower time. You can change this
                  later
                </p>
              </div>
            </section>
          </b-carousel-item>
          <b-carousel-item>
            <section class="hero is-medium">
              <div class="hero-body has-text-centered">
                <Title text="All set, let's go" />
                <img
                  class="onboarding-image"
                  src="../../assets/onboarding-5.svg"
                />
                <router-link to="/">
                  <CoreButton text="Start using the app" type="primary" />
                </router-link>
              </div>
            </section>
          </b-carousel-item>
        </b-carousel>
      </ViewContent>
    </AppView>
  </portal>
</template>

<script>
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import CoreButton from '@/components/core/CoreButton';
import Icon from '@/components/core/Icon';
import BackButton from '@/components/core/BackButton';
import Timer from '@/components/Timer';
import Title from '@/components/core/Title';
import QRScanner from '@/components/QRScanner/QRScanner';
import Slider from '@/components/core/Slider';
import { postUserData } from '@/services/userService';
import { ref } from '@vue/composition-api';

export default {
  setup() {
    const message = ref('');
    const deviceId = ref('');
    const showerTime = ref(10);

    const onDecode = (decodedString) => {
      const newDeviceId = `${decodedString}`;
      message.value = newDeviceId;
      deviceId.value = newDeviceId;
      postUserData({ device: newDeviceId });
    };

    const onError = (errorStr) => {
      message.value = errorStr;
    };

    const onTimeChange = (value) => {
      showerTime.value = value;
      postUserData({ defaultShowerTime: `"${value}"` });
    };

    return {
      onTimeChange,
      showerTime,
      onDecode,
      onError,
      message
    };
  },
  components: {
    AppView,
    ViewHeader,
    ViewContent,
    CoreButton,
    BackButton,
    Timer,
    Title,
    QRScanner,
    Slider
  }
};
</script>

<style lang="scss">
.carousel {
  height: 90%;

  .carousel-items {
    height: 100%;
  }
}

.hero {
  flex: 1;
  height: 100%;
}
</style>

<style lang="scss" scoped>
.onboarding-image {
  margin-block-start: 20px;
  margin-block-end: 20px;
}

p {
  margin-block-start: 20px;
  font-size: 18px;
}

.hero-body {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.shower-time {
  margin-block-end: 100px;
}
</style>
