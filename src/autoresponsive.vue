<template>
  <div ref="container" :class="`${prefixClassName}-container`" :style="containerStyle">
    <slot></slot>
  </div>
</template>
<script>
import {
  GridSort
} from 'autoresponsive-core';

import pkg from '../package';
import AnimationManager from './animation';

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
  computed: {
    containerStyle() {
      return {
        position: 'relative'
      };
    }
  },
  created() {
    this.animationManager = new AnimationManager();
    this.fixedContainerHeight = typeof this.containerHeight === 'number';
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
      Object.assign(s, style);
    },
    updateChildren() {
      this.sortManager = new GridSort({
        containerWidth: this.containerWidth,
        gridWidth: this.gridWidth
      });
      this.sortManager.init();

      let containerHeight = this.verticalDirection === 'bottom' || this.fixedContainerHeight ? this.containerHeight : 0;

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

        if (this.fixedContainerHeight) {
          container.style.height = `${containerHeight}px`;
        } else {
          if (calculatedPosition[1] + childHeight > containerHeight) {
            containerHeight = calculatedPosition[1] + childHeight;
            container.style.height = `${containerHeight}px`;
          }
        }

        const options = Object.assign({}, this.$props, {
          position: calculatedPosition,
          size: {
            width: childWidth,
            height: childHeight
          },
          containerHeight: containerHeight
        });

        const calculatedStyle = this.animationManager.generate(options);

        this.mixItemInlineStyle(calculatedStyle);

        Object.assign(node.style, calculatedStyle);

        this.onItemDidLayout(node);

        if (i + 1 === children.length) {
          this.onContainerDidLayout();
        }
      }
    }
  }
};
</script>
