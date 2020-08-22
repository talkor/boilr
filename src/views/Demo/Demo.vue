<template>
  <div class="demo">
    <div class="demo-container">
      <div class="gauge">
        <div class="temperature">{{ temperature }}°C</div>
        <svg id="gauge" width="97%" height="400px"></svg>
      </div>
      <div class="power">
        <span :class="{ led: true, active: active }" />Power
        {{ active ? 'ON' : 'OFF' }}
      </div>
    </div>
    <img class="barcode" src="../../assets/qr.png" />
  </div>
</template>

<script>
import { reactive, ref, onMounted } from '@vue/composition-api';
import { watchDevice } from '@/services/deviceService';
import * as d3 from 'd3';

export default {
  setup() {
    const active = ref(false);
    const temperature = ref(25);

    const getHue = (temp) => {
      const maxHsl = 360;
      const minHsl = 170;
      const rngHsl = maxHsl - minHsl;

      const maxTemp = 55;
      const minTemp = 25;
      const rngTemp = maxTemp - minTemp;
      const degCnt = maxTemp - temp;
      const hslsDeg = rngHsl / rngTemp;
      const returnHue = 360 - (degCnt * hslsDeg - (maxHsl - 360));
      return returnHue;
    };

    const config = reactive({
      minValue: 0,
      maxValue: 100,
      circleThickness: 0.05,
      circleFillGap: 0.05,
      circleColor: '#333333',
      waveHeight: 0.1,
      waveCount: 3,
      waveRiseTime: 1000,
      waveAnimateTime: 2000,
      waveAnimate: true,
      waveColor: '#FFDDDD',
      waveOffset: 0.25,
      textVertPosition: 0.5,
      textSize: 0.6
    });

    const loadLiquidFillGauge = (elementId, value) => {
      const gauge = d3.select('#' + elementId);
      const radius =
        Math.min(
          parseInt(gauge.style('width')),
          parseInt(gauge.style('height'))
        ) / 2;
      const locationX = parseInt(gauge.style('width')) / 2 - radius;
      const locationY = parseInt(gauge.style('height')) / 2 - radius;
      const fillPercent =
        Math.max(config.minValue, Math.min(config.maxValue, value)) /
        config.maxValue;

      const waveHeightScale = d3.scale
        .linear()
        .range([0, config.waveHeight, 0])
        .domain([0, 50, 100]);

      const circleThickness = config.circleThickness * radius;
      const circleFillGap = config.circleFillGap * radius;
      const fillCircleMargin = circleThickness + circleFillGap;
      const fillCircleRadius = radius - fillCircleMargin;
      const waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
      const waveLength = (fillCircleRadius * 2) / config.waveCount;
      const waveClipCount = 1 + config.waveCount;
      const waveClipWidth = waveLength * waveClipCount;

      const data = [];
      for (let i = 0; i <= 40 * waveClipCount; i++) {
        data.push({
          x: i / (40 * waveClipCount),
          y: i / 40
        });
      }

      const gaugeCircleX = d3.scale
        .linear()
        .range([0, 2 * Math.PI])
        .domain([0, 1]);
      const gaugeCircleY = d3.scale
        .linear()
        .range([0, radius])
        .domain([0, radius]);

      const waveScaleX = d3.scale
        .linear()
        .range([0, waveClipWidth])
        .domain([0, 1]);
      const waveScaleY = d3.scale
        .linear()
        .range([0, waveHeight])
        .domain([0, 1]);

      const waveRiseScale = d3.scale
        .linear()
        .range([
          fillCircleMargin + fillCircleRadius * 2 + waveHeight,
          fillCircleMargin - waveHeight
        ])
        .domain([0, 1]);
      const waveAnimateScale = d3.scale
        .linear()
        .range([0, waveClipWidth - fillCircleRadius * 2])
        .domain([0, 1]);

      const gaugeGroup = gauge
        .append('g')
        .attr('transform', 'translate(' + locationX + ',' + locationY + ')');

      const gaugeCircleArc = d3.svg
        .arc()
        .startAngle(gaugeCircleX(0))
        .endAngle(gaugeCircleX(1))
        .outerRadius(gaugeCircleY(radius))
        .innerRadius(gaugeCircleY(radius - circleThickness));
      gaugeGroup
        .append('path')
        .attr('d', gaugeCircleArc)
        .style('fill', config.circleColor)
        .attr('transform', 'translate(' + radius + ',' + radius + ')');

      const clipArea = d3.svg
        .area()
        .x(function (d) {
          return waveScaleX(d.x);
        })
        .y0(function (d) {
          return waveScaleY(
            Math.sin(
              Math.PI * 2 * config.waveOffset * -1 +
                Math.PI * 2 * (1 - config.waveCount) +
                d.y * 2 * Math.PI
            )
          );
        })
        .y1(function () {
          return fillCircleRadius * 2 + waveHeight;
        });
      const waveGroup = gaugeGroup
        .append('defs')
        .append('clipPath')
        .attr('id', 'clipWave' + elementId);
      const wave = waveGroup.append('path').datum(data).attr('d', clipArea);

      const fillCircleGroup = gaugeGroup
        .append('g')
        .attr('clip-path', 'url(#clipWave' + elementId + ')');
      fillCircleGroup
        .append('circle')
        .attr('cx', radius)
        .attr('cy', radius)
        .attr('r', fillCircleRadius)
        .style('fill', config.waveColor);

      const waveGroupXPosition =
        fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
      waveGroup
        .attr(
          'transform',
          'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')'
        )
        .transition()
        .duration(config.waveRiseTime)
        .attr(
          'transform',
          'translate(' +
            waveGroupXPosition +
            ',' +
            waveRiseScale(fillPercent) +
            ')'
        )
        .each('start', () => {
          wave.attr('transform', 'translate(1,0)');
        });

      const animateWave = () => {
        wave
          .transition()
          .duration(active.value ? config.waveAnimateTime : 0)
          .ease('linear')
          .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
          .each('end', () => {
            wave.attr('transform', 'translate(' + waveAnimateScale(0) + ',0)');
            animateWave(config.waveAnimateTime);
          });
        d3.select('circle').style(
          'fill',
          `hsl(${getHue(temperature.value)}, 100%, 50%`
        );
      };

      animateWave();
    };

    onMounted(async () => {
      loadLiquidFillGauge('gauge', 80);
      watchDevice({ device: 'mhXWbGB4UxIdOPqeoOJz' }, (data) => {
        active.value = data.active;
        temperature.value = Math.trunc(data.temperature);
      });
    });

    return {
      active,
      temperature
    };
  }
};
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  align-items: center;
  justify-content: center;

  .demo-container {
    width: 50%;

    .gauge {
      position: relative;

      .temperature {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 60px;
        color: #ffffff;
      }
    }
  }

  .barcode {
    position: relative;
    top: -50px;
  }

  .led {
    width: 15px;
    height: 15px;
    border: 1px solid rgb(92, 92, 92);
    display: inline-block;
    border-radius: 50%;
    margin-right: 10px;

    &.active {
      background-color: #ff5c5c;
      border: none;
      box-shadow: 0px 0px 3px 3px rgba(255, 119, 119, 0.5);
    }
  }

  .power {
    font-size: 20px;
    width: 200px;
    margin: 20px auto;
    padding: 15px;
  }
}
</style>
