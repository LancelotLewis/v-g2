<!--
 * @Author: lancelot lewis
 * @Date: 2019-12-17 15:45:40
 * @Description:
 * @LastEditTime: 2020-03-03 10:30:48
 * @LastEditors: lancelot lewis
 -->
<template>
  <v-g2 ref="v-g2" class="chart" :options="chartOpt"></v-g2>
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
  mounted() {
    // const chart = this.$refs['v-g2'].chart;
    // setTimeout(() => {
    //   chart.updateOptions({
    //     data,
    //     scales: {
    //       value: {
    //         alias: '销售额(--万--)',
    //       },
    //     },
    //   });
    //   chart.render();
    // }, 3000);
  },
  data() {
    return {
      chartOpt: {
        title: '这是标题这是标题这是标题这是标题',
        options: {
          data,
          scales: {
            value: {
              alias: '销售额(--万)',
            },
          },
          axes: {
            // value: {},
            type: {
              label: {
                textStyle: {
                  fill: '#aaaaaa',
                },
              },
              tickLine: {
                alignWithLabel: false,
                length: 0,
              },
            },
          },
          // guides: [
          //   {
          //     type: 'dataMarker',
          //     top: true,
          //     content: '因政策调整导致销量下滑',
          //     position: ['2014-01', 1750],
          //     style: {
          //       text: {
          //         fontSize: 13,
          //       },
          //     },
          //     lineLength: 30,
          //   },
          // ],
          geometries: [
            {
              type: 'interval',
              position: 'type*value',
              color: 'type',
              // opacity: 1,
              // label: {
              //   field: 'value',
              //   cfg: {
              //     useHtml: true,
              //     htmlTemplate: (text, item) => {
              //       const a = item.point;
              //       const percent = String(parseInt(a.percent * 100)) + '%';
              //       return (
              //         '<span class="g2-label-item"><p class="g2-label-item-value">' +
              //         a.value +
              //         '</p><p class="g2-label-item-percent">' +
              //         percent +
              //         '</p></div>'
              //       );
              //     },
              //   },
              // },
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
