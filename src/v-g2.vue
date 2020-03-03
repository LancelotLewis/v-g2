<!--
 * @Author: lancelot lewis
 * @Date: 2019-12-17 15:32:35
 * @Description:
 * @LastEditTime: 2020-03-03 10:30:58
 * @LastEditors: lancelot lewis
 -->
<template>
  <div class="antv-g2"></div>
</template>

<script>
import { Chart } from '@antv/g2';

export default {
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
      const opt = {
        container: this.$el,
        autoFit: true,
        padding: [50, 20, 50, 20],
        // renderer: 'svg',
        ...this.options,
        title: undefined,
      };
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
      if (this.beforeRender instanceof Function) {
        await this.beforeRender(chart);
      }
      // chart.on('beforerender', () => {
      // });
      // chart.on('afterrender', () => {
      // });
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
