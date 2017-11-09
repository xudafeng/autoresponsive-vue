<template>
  <div ref="container" :class="`${prefixClassName}-container`" :style="containerStyle">
    <slot></slot>
  </div>
</template>
<script>
const Common = require('autoresponsive-common');
const {
  Util,
  GridSort
} = Common;

const pkg = require('../package');
const AnimationManager = require('./animation');

export default {
  name: 'auto-responsive',
  props: {
    containerWidth: {
      type: Number,
      default: null
    },
    containerHeight: {
      type: Number,
      default: null
    },
    gridWidth: {
      type: Number,
      default: 10
    },
    prefixClassName: {
      type: String,
      default: pkg.name
    },
    itemClassName: {
      type: String,
      default: 'item'
    },
    itemMargin: {
      type: Number,
      default: 0
    },
    horizontalDirection: {
      type: String,
      default: 'left'
    },
    transitionDuration: {
      type: [String, Number],
      default: 1
    },
    transitionTimingFunction: {
      type: String,
      default: 'linear'
    },
    verticalDirection: {
      type: String,
      default: 'top'
    },
    closeAnimation: {
      type: Boolean,
      default: false
    },
    onItemDidLayout: {
      type: Function,
      default: () => {}
    },
    onContainerDidLayout: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      refContainerHeight: this.containerHeight
    };
  },
  computed: {
    containerStyle() {
      return {
        position: 'relative',
        height: `${this.refContainerHeight}px`
      };
    }
  },
  created() {
    this.animationManager = new AnimationManager();
    this.fixedContainerHeight = typeof this.refContainerHeight === 'number';
    this.sortManager = new GridSort({
      containerWidth: this.containerWidth,
      gridWidth: this.gridWidth
    });
  },
  mounted() {
    this.updateChildren();
  },
  updated() {
    this.updateChildren();
  },
  methods: {
    mixItemInlineStyle(s) {
      const itemMargin = this.itemMargin;
      let style = {
        display: 'block',
        float: 'left',
        margin: `0 ${itemMargin}px ${itemMargin}px 0`
      };

      if (this.containerWidth) {
        style = {
          position: 'absolute'
        };
      }
      Util.merge(s, style);
    },
    updateChildren() {
      this.sortManager.init();
      const container = this.$refs.container;
      var children = container.children;

      for (var i = 0; i < children.length; i++) {
        const node = children[i];
        const style = this.$slots.default[i].data.normalizedStyle;

        if (node.className &&
          this.itemClassName &&
          !~node.className.indexOf(this.itemClassName)) {
          return;
        }

        const childWidth = parseInt(style.width, 10) + this.itemMargin;
        const childHeight = parseInt(style.height, 10) + this.itemMargin;
        const calculatedPosition = this.sortManager.getPosition(childWidth, childHeight);

        if (!this.fixedContainerHeight) {
          if (calculatedPosition[1] + childHeight > this.refContainerHeight) {
            this.refContainerHeight = calculatedPosition[1] + childHeight;
          }
        }

        const options = Util.extend({}, this.$props, {
          position: calculatedPosition,
          size: {
            width: childWidth,
            height: childHeight
          },
          containerHeight: this.refContainerHeight
        });

        const calculatedStyle = this.animationManager.generate(options);

        this.mixItemInlineStyle(calculatedStyle);

        Util.merge(node.style, calculatedStyle);

        this.onItemDidLayout(node);

        if (i + 1 === children.length) {
          this.onContainerDidLayout();
        }
      }
    }
  }
};
</script>
