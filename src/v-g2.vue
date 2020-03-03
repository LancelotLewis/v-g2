<!--
 * @Author: lancelot lewis
 * @Date: 2019-12-17 15:32:35
 * @Description:
 * @LastEditTime: 2020-03-03 14:23:19
 * @LastEditors: lancelot lewis
 -->
<template>
  <div class="antv-g2"></div>
</template>

<script>
import { Chart } from '@antv/g2';
import { cloneDeep } from 'lodash-es';

export default {
  name: 'VG2',
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    beforeRender: Function,
    afterRender: Function,
  },
  mounted() {
    this.drawChart();
  },
  beforeDestroy() {
    this.destroyChart();
  },
  methods: {
    destroyChart() {
      this.chart.destroy();
    },
    async drawChart() {
      this.chart && this.destroyChart();
      const { title } = this.options;
      const opt = cloneDeep({
        container: this.$el,
        autoFit: true,
        padding: [50, 20, 50, 20],
        // renderer: 'svg',
        ...this.options,
        title: undefined,
      });
      if (title) {
        const titleOpt = {
          type: 'text',
          position: ['50%', '0%'],
          content: title,
          offsetY: -30,
          style: {
            textAlign: 'center',
            fontSize: 18,
          },
        };
        opt.options.annotations = opt.options.annotations
          ? [titleOpt, ...opt.options.annotations]
          : [titleOpt];
      }
      const chart = new Chart(opt);
      // chart.on('beforerender', () => {
      //   if (this.beforeRender instanceof Function) {
      //     this.beforeRender(chart);
      //   }
      // });
      // chart.on('afterrender', () => {
      //   if (this.afterRender instanceof Function) {
      //     this.afterRender(chart);
      //   }
      // });

      if (this.beforeRender instanceof Function) {
        await this.beforeRender(chart);
      }
      chart.render();
      if (this.afterRender instanceof Function) {
        await this.afterRender(chart);
      }
      this.chart = chart;
    },
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.drawChart();
      },
    },
  },
  data() {
    return {
      chart: undefined,
    };
  },
};
</script>
