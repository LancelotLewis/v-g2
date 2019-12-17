<!--
 * @Author: lancelot lewis
 * @Date: 2019-12-17 15:32:35
 * @Description:
 * @LastEditTime: 2019-12-17 16:00:17
 * @LastEditors: lancelot lewis
 -->
<template>
  <div class="antv-g2"></div>
</template>

<script>
import throttle from 'lodash.throttle';
import cloneDeep from 'lodash.clonedeep';
import G2 from '@antv/g2';
import ResizeObserver from 'resize-observer-polyfill';

export default {
  props: {
    chartOpt: {
      type: Object,
      default() {
        return {};
      },
    },
    viewOpt: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {
    this.ro = new ResizeObserver(this.resize);
    this.ro.observe(this.$el);
    this.drawChart();
  },
  beforeDestroy() {
    this.ro.unobserve(this.$el);
    this.ro.disconnect();
    this.chart.destroy();
  },
  methods: {
    resize: throttle(
      function() {
        const height = this.$el.clientHeight;
        this.chart.changeHeight(height);
      },
      500,
      {
        leading: false,
        trailing: true,
      },
    ),
    drawChart() {
      this.chart && this.chart.destroy();
      const chart = new G2.Chart(
        Object.assign(
          {
            container: this.$el,
            forceFit: true,
            height: this.$el.clientHeight,
            // renderer: 'svg',
          },
          this.chartOpt,
        ),
      );
      this.viewOpt.forEach(view => {
        chart.view(cloneDeep(view));
      });
      chart.render();
      this.chart = chart;
    },
  },
  watch: {
    chartOpt: {
      deep: true,
      handler() {
        this.drawChart();
      },
    },
    viewOpt: {
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

<style scoped>
.antv-g2 {
  height: 100%;
}
</style>
