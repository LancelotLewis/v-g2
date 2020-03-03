<!--
 * @Author: lancelot lewis
 * @Date: 2019-12-17 15:45:40
 * @Description:
 * @LastEditTime: 2020-03-03 11:27:12
 * @LastEditors: lancelot lewis
 -->
<template>
  <v-g2 ref="v-g2" class="chart" :options="options"></v-g2>
</template>

<script>
// import VG2 from '../dist/v-g2.esm';
import VG2 from './v-g2';

const data = [
  { type: '未知', value: 654, percent: 0.02 },
  { type: '17 岁以下', value: 654, percent: 0.02 },
  { type: '18-24 岁', value: 4400, percent: 0.2 },
  { type: '25-29 岁', value: 5300, percent: 0.24 },
  { type: '30-39 岁', value: 6200, percent: 0.28 },
  { type: '40-49 岁', value: 3300, percent: 0.14 },
  { type: '50 岁以上', value: 1500, percent: 0.06 },
];

export default {
  components: {
    VG2,
  },
  data() {
    return {
      options: {
        title: '不同年龄段销售额统计',
        padding: [50, 20, 50, 50],
        options: {
          data,
          scales: {
            value: {
              alias: '销售额(万)',
            },
          },
          axes: {
            // value: false,
            type: {
              label: {
                style: {
                  fill: '#aaaaaa',
                },
              },
              tickLine: {
                alignTick: false,
                length: 0,
              },
            },
          },
          annotations: [
            {
              type: 'dataMarker',
              text: {
                content: '因政策调整导致销量下滑',
                style: {
                  fontSize: 13,
                },
              },
              position: ['40-49 岁', 3500],
              // lineLength: 30,
            },
          ],
          geometries: [
            {
              type: 'interval',
              position: 'type*value',
              style: {
                opacity: 1,
              },
              color: 'type',
              label: {
                fields: ['value'],
              },
            },
          ],
        },
      },
    };
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100vh;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chart {
  width: 90vw;
  height: 90vh;
}
</style>
