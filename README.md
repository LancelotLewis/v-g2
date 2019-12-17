<!--
 * @Author: lancelot lewis
 * @Date: 2019-12-17 16:51:44
 * @Description:
 * @LastEditTime: 2019-12-17 17:24:15
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
    'vue': 'path/to/vue',
    'g2': 'path/to/g2',
    'v-g2': 'path/to/v-g2'
  }
})

require(['vue', 'v-g2'], function (Vue, VG2) {
  // register component to use...
  Vue.component('v-g2', VG2)
})
```

### Global variable

```js
// register component to use
Vue.component('v-g2', VG2)
```

## Using the component

```vue
<template>
  <v-g2 style="height:500px" :chartOpt="chartOpt"></v-g2>
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
```

### Props

* `chartOpt`

  Used to update option and data for G2 instance

* `viewOpt`

  Used to update option and data for G2 view instance

### Methods

* `drawChart`

  Redraw v-g2 chart
