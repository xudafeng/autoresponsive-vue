<template>
  <div id="waterfall" class="demo-con">
    <auto-responsive
      v-bind="options"
    >
      <div v-for="(item, index) in styleList" @click="clickItemHandle" :style="styleList[index]" class="item">{{ index }}</div>
    </auto-responsive>
  </div>
</template>
<script>
import Vue from 'vue';
import AutoResponsive from '../src/autoresponsive.vue';

import Utils from './utils';

const getItemStyle = function() {
  return {
    width: '150px',
    height: `${parseInt(Math.random() * 20 + 12, 10) * 10}px`,
    color: '#3a2d5b',
    cursor: 'pointer',
    borderRadius: '5px',
    boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset',
    backgroundColor: '#5c439b',
    borderColor: '#796b1d',
    fontSize: '80px',
    lineHeight: '100px',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '1px 1px 0px #816abe'
  };
};

export default {
  name: 'waterfall',
  components: {
    'auto-responsive': AutoResponsive
  },
  props: ['containerWidth'],
  data() {
    return {
      styleList: [],
      options: {
        itemMargin: 10,
        containerWidth: this.containerWidth,
        containerHeight: null,
        itemClassName: 'item',
        transitionDuration: '.8',
        transitionTimingFunction: 'easeIn'
      }
    };
  },
  beforeMount() {
    const list = [];
    let number = 10;

    while (number--) {
      list.push(getItemStyle());
    }
    this.styleList = list;
  },
  mounted() {
    window.addEventListener('resize', () => {
      const simplestElem = document.querySelector('#waterfall');
      this.options.containerWidth = Utils.width(simplestElem);
    }, false);
  },
  methods: {
    clickItemHandle(e) {
      const nodes = e.target.parentNode.childNodes;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === e.target) {
          const style = this.styleList[i];
          style.width = style.width === '310px' ? '150px' : '310px';
          Vue.set(this.styleList, 0, style);
        }
      }
    }
  }
};
</script>
<style lang="less">
.demo-con {
  margin: 40px 0 20px 0;
}
</style>
