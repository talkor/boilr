<template>
  <AppView class="statistics">
    <ViewHeader title="Statistics" />
    <ViewContent>
      <div class="title-container">
        <Subtitle :text="`Top Water Saver: ${topSaver}`" />
      </div>
      <div id="chart"></div>
    </ViewContent>
  </AppView>
</template>

<script>
import AppView from '@/components/shell/AppView';
import ViewHeader from '@/components/shell/ViewHeader';
import ViewContent from '@/components/shell/ViewContent';
import { getUsersData } from '@/services/userService';
import { ref, onMounted } from '@vue/composition-api';
import { Chart } from 'frappe-charts/dist/frappe-charts.esm.js';
import 'frappe-charts/dist/frappe-charts.min.css';
import Subtitle from '@/components/core/Subtitle';

export default {
  setup() {
    let usersData;
    const usd = ref([]);
    const userNames = [];
    const totalShowersNumber = [];
    const totalShowersTime = [];
    const averageShowerTime = [];
    const topSaver = ref('');

    onMounted(async () => {
      usersData = await getUsersData();
      usd.value = [...usersData];
      usd.value.sort((a, b) =>
        a.totalShowersTime / a.totalShowersNumber >
        b.totalShowersTime / b.totalShowersNumber
          ? 1
          : -1
      );
      topSaver.value = usd.value[0].name;
      for (let i = 0; i < usd.value.length; i++) {
        userNames.push(usd.value[i].name);
        totalShowersNumber.push(usd.value[i].totalShowersNumber);
        totalShowersTime.push(usd.value[i].totalShowersTime);
        averageShowerTime.push(
          Math.floor(
            usd.value[i].totalShowersTime / usd.value[i].totalShowersNumber
          )
        );
      }
    });

    return {
      usersData,
      userNames,
      totalShowersNumber,
      totalShowersTime,
      averageShowerTime,
      topSaver
    };
  },
  components: {
    AppView,
    ViewHeader,
    ViewContent,
    Subtitle
  },
  data() {
    return {
      data: {
        labels: this.userNames,
        datasets: [
          {
            name: 'Avg. Shower Time',
            values: this.averageShowerTime
          },
          {
            name: 'No. Of Showers',
            values: this.totalShowersNumber
          },
          {
            name: 'Total Shower Time',
            values: this.totalShowersTime
          }
        ]
      },

      chart: null
    };
  },
  methods: {
    setChart() {
      this.chart = new Chart('#chart', {
        title: '',
        data: this.data,
        type: 'bar',
        truncateLegends: 0,
        barOptions: {
          spaceRatio: 0.2
        },
        height: 500,
        // tooltipOptions: {
        //   formatTooltipX: d => (d)
        // },
        colors: ['#7cd6fd', '#743ee2', '#f21901']
      });
    }
  },
  mounted() {
    this.setChart();
  }
};
</script>
<style scoped lang="scss"></style>
