<!--
 * @Author: lancelot lewis
 * @Date: 2019-12-17 15:45:40
 * @Description:
 * @LastEditTime: 2019-12-17 16:39:44
 * @LastEditors: lancelot lewis
 -->
<template>
  <v-g2 style="height:500px" :chartOpt="chartOpt"></v-g2>
</template>

<script>
import VG2 from '../dist/v-g2.esm';

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
      chartOpt: {
        data,
        height: 500,
        padding: [20, 20, 50, 20],
        options: {
          scales: {
            value: {
              alias: '销售额(万)',
            },
          },
          axes: {
            value: false,
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
          guides: [
            {
              type: 'dataMarker',
              top: true,
              content: '因政策调整导致销量下滑',
              position: ['2014-01', 1750],
              style: {
                text: {
                  fontSize: 13,
                },
              },
              lineLength: 30,
            },
          ],
          geoms: [
            {
              type: 'interval',
              position: 'type*value',
              opacity: 1,
              label: {
                field: 'value',
                cfg: {
                  useHtml: true,
                  htmlTemplate: (text, item) => {
                    const a = item.point;
                    const percent = String(parseInt(a.percent * 100)) + '%';
                    return (
                      '<span class="g2-label-item"><p class="g2-label-item-value">' +
                      a.value +
                      '</p><p class="g2-label-item-percent">' +
                      percent +
                      '</p></div>'
                    );
                  },
                },
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
.g2-label-item {
  font-size: 12px;
  text-align: center;
  line-height: 0.4;
}
.g2-label-item-value {
  color: #595959;
}
.g2-label-item-percent {
  color: #8c8c8c;
}
</style>
