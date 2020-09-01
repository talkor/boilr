<template>
  <div class="weather">
    <div>{{ curTempDisplay }}°C</div>
    <div>{{ city }}</div>
  </div>
</template>

<script>
import axios from 'axios';

const CELSIUS = 0;
export default {
  setup() {
    const city = 'Retrieving Weather...';
    const latitude = 0.0;
    const longitude = 0.0;
    const curTemp = null;
    const displayMode = CELSIUS;
    const dataObj = null;
    const weatherMain = 'Fine';
    const weatherDesc = 'Clear day';
    const errorMsg = '';
    return {
      city,
      latitude,
      longitude,
      curTemp,
      displayMode,
      dataObj,
      weatherMain,
      weatherDesc,
      errorMsg
    };
  },
  computed: {
    classWI: function () {
      if (this.dataObj != null) {
        const weatherID = this.data.dataObj.weather[0].id;
        if (weatherID >= 200 && weatherID <= 232) {
          return 'wi-thunderstorm';
        } else if (weatherID >= 300 && weatherID <= 321) {
          return 'wi-sprinkle';
        } else if (weatherID >= 500 && weatherID <= 531) {
          return 'wi-rain';
        } else if (weatherID >= 600 && weatherID <= 622) {
          return 'wi-snow';
        } else if (weatherID >= 701 && weatherID <= 781) {
          return 'wi-train';
        } else if (weatherID == 800) {
          return 'wi-moon-alt-new';
        } else if (weatherID >= 801 && weatherID <= 804) {
          return 'wi-cloud';
        } else if (weatherID >= 900 && weatherID <= 962) {
          return 'wi-small-craft-advisory';
        }
      }
      return '';
    },
    curTempDisplay: function () {
      if (this.curTemp != null) {
        if (this.displayMode == CELSIUS) {
          return (this.curTemp - 273.15).toFixed(1);
        } else {
          return ((this.curTemp * 9) / 5 - 459.67).toFixed(1);
        }
      } else {
        return null;
      }
    }
  },
  created() {
    this.getLocation();
  },
  methods: {
    getTemp: function (option) {
      this.displayMode = option;
    },
    getLocation: function () {
      if (!navigator.geolocation) {
        this.errorMsg = 'Geolocation is not supported by your browser';
        this.city = this.errorMsg;
        console.warn(this.errorMsg);
        return;
      }
      const options = { timeout: 60000 };
      navigator.geolocation.getCurrentPosition(
        this.success,
        this.error,
        options
      );
    },
    success: function (position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.latitude = parseFloat(this.latitude).toFixed(2);
      this.longitude = parseFloat(this.longitude).toFixed(2);
      this.getWeather();
    },
    error: function (err) {
      this.errorMsg = 'Unable to retrieve your location';
      this.city = this.errorMsg;

      console.warn(`ERROR(${err.code}): ${err.message}`);
      console.warn(this.errorMsg);
    },

    getWeather: function () {
      const reqURL =
        'https://api.openweathermap.org/data/2.5/weather?lat=' +
        this.latitude +
        '&lon=' +
        this.longitude +
        '&APPID=' +
        process.env.VUE_APP_WEATHER_API_TOKEN;

      axios
        .get(reqURL)
        .then(
          (response) => (
            (this.curTemp = response.data.main.temp),
            (this.city = response.data.name),
            (this.weatherMain = response.data.weather[0].main),
            (this.weatherDesc = response.data.weather[0].description)
          )
        );
    }
  }
};
</script>

<style scoped lang="scss">
.weather {
  text-align: start;
}
</style>
