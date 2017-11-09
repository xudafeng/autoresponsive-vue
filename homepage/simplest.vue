<template>
  <div :id="elementId">
    <div class="btn-group">
      <button v-for="item in buttons" @click="clickHandler(item)" type="button" class="btn btn-default">{{ item }}</button>
    </div>
    <auto-responsive
      v-bind="options"
      ref="autoresponsive"
    >
      <div v-for="item in arrayList" :style="style" class="item">{{ item }}</div>
    </auto-responsive>
  </div>
</template>
<script>
import Utils from './utils';
import AutoResponsive from '../src/autoresponsive.vue';

const style = {
  height: '100px',
  width: '100px',
  cursor: 'default',
  color: '#514713',
  borderRadius: '5px',
  boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
  backgroundColor: '#a28f27',
  borderColor: '#796b1d',
  fontSize: '80px',
  lineHeight: '100px',
  textAlign: 'center',
  fontWeight: 'bold',
  textShadow: '1px 1px 0px #ab9a3c'
};

const buttons = [
  'margin',
  'append',
  'remove',
  'sort',
  'horizontal',
  'vertical'
];

const elementId = 'simplest';

export default {
  name: elementId,
  components: {
    'auto-responsive': AutoResponsive
  },
  props: {
    containerWidth: {
      type: Number,
      default: () => {
        const simplestElem = document.querySelector(`#${elementId}`);
        return Utils.width(simplestElem);
      }
    }
  },
  data() {
    return {
      style,
      buttons,
      arrayList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      frame: 30,
      elementId,
      options: {
        itemMargin: 10,
        horizontalDirection: 'left',
        verticalDirection: 'top',
        containerWidth: this.containerWidth,
        containerHeight: null,
        itemClassName: 'item',
        transitionDuration: '.8',
        transitionTimingFunction: 'easeIn',
        onItemDidLayout: this.onItemDidLayout,
        onContainerDidLayout: this.onContainerDidLayout
      }
    };
  },
  mounted() {
    window.addEventListener('resize', () => {
      const simplestElem = document.querySelector(`#${elementId}`);
      this.options.containerWidth = Utils.width(simplestElem);
    }, false);
  },
  methods: {
    onItemDidLayout(e) {
      console.log(`onItemDidLayout`);
    },
    onContainerDidLayout(e) {
      console.log(`onContainerDidLayout`);
    },
    clickHandler(type) {
      switch (type) {
        case 'margin':
          this.options.itemMargin = this.options.itemMargin === 10 ? 20 : 10;
          break;
        case 'append':
          if (this.arrayList.length !== 30) {
            this.arrayList.push(this.frame++);
          }
          break;
        case 'remove':
          this.arrayList.shift();
          break;
        case 'sort':
          this.arrayList = this.arrayList.reverse();
          break;
        case 'horizontal':
          this.options.horizontalDirection = this.options.horizontalDirection === 'left' ? 'right' : 'left';
          break;
        case 'vertical':
          if (this.options.verticalDirection === 'top') {
            this.options.containerHeight = parseInt(this.$refs.autoresponsive.$el.style.height, 10);
            this.options.verticalDirection = 'bottom';
          } else {
            this.options.containerHeight = null;
            this.options.verticalDirection = 'top';
          }
          break;
      }
    }
  }
};
</script>
<style lang="less">
#simplest {
  margin: 40px 0 20px 0;
}
</style>
