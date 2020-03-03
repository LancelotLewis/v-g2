import { Chart } from '@antv/g2';
import { cloneDeep } from 'lodash-es';

//
var script = {
  name: 'VG2',
  props: {
    options: {
      type: Object,

      default() {
        return {};
      }

    },
    beforeRender: Function,
    afterRender: Function
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
      const {
        title
      } = this.options;
      const opt = cloneDeep({
        container: this.$el,
        autoFit: true,
        padding: [50, 20, 50, 20],
        // renderer: 'svg',
        ...this.options,
        title: undefined
      });

      if (title) {
        const titleOpt = {
          type: 'text',
          position: ['50%', '0%'],
          content: title,
          offsetY: -30,
          style: {
            textAlign: 'center',
            fontSize: 18
          }
        };
        opt.options.annotations = opt.options.annotations ? [titleOpt, ...opt.options.annotations] : [titleOpt];
      }

      const chart = new Chart(opt); // chart.on('beforerender', () => {
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
    }

  },
  watch: {
    options: {
      deep: true,

      handler() {
        this.drawChart();
      }

    }
  },

  data() {
    return {
      chart: undefined
    };
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "antv-g2"
  });
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

// Import vue component

const install = function installVG4(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VG2', __vue_component__);
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
