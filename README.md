<!--
 * @Author: lancelot lewis
 * @Date: 2019-12-17 16:51:44
 * @Description:
 * @LastEditTime: 2020-03-03 11:21:43
 * @LastEditors: lancelot lewis
 -->

# VG2

A antv-g2 components for vue.js

## Installation

### npm

```bash
npm install @antv/g2 v-g2
```

## Usage

### ES Modules with npm & Vue Loader (Recommended)

```js
import Vue from 'vue';
import VG2 from 'v-g2'; // refers to components/ECharts.vue in webpack

// register component to use
Vue.component('v-g2', VG2);
```

### AMD

```js
require.config({
  paths: {
    vue: 'path/to/vue',
    g2: 'path/to/g2',
    'v-g2': 'path/to/v-g2',
  },
});

require(['vue', 'v-g2'], function(Vue, VG2) {
  // register component to use...
  Vue.component('v-g2', VG2);
});
```

### Global variable

```js
// register component to use
Vue.component('v-g2', VG2);
```

## Using the component

```vue
<template>
  <v-g2 style="height:500px" :options="options"></v-g2>
</template>

<script>
import VG2 from 'v-g2';

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
```

### Props

* `chartOpt`

  Used to update option and data for G2 instance

* `viewOpt`

  Used to update option and data for G2 view instance

### Methods

* `drawChart`

  Redraw v-g2 chart
