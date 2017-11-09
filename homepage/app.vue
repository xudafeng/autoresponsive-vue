<template>
  <layout>
    <article class="container">
      <div :class="loadingClass">
      {{ LoadingText }}
      </div>
      <div class="i18n-buttons">
        <div class="btn-group pull-right">
          <button type="button" :class="i18nButtonStyle('en')" @click="i18nClickHandler('en')">en</button>
          <button type="button" :class="i18nButtonStyle('zh')" @click="i18nClickHandler('zh')">zh</button>
        </div>
      </div>
      <div v-for="item in list">
        <markdown
           :source="item"
        >
        </markdown>
      </div>
    </article>
  </layout>
</template>
<script>
import Vue from 'vue';

import Layout from './layout.vue';
import Markdown from './markdown.vue';
import SimplestDemo from './simplest.vue';
import WaterfallDemo from './waterfall.vue';

import Utils from './utils';

const documentsList = [
  'usage',
  'option',
  'event'
];

const LoadingText = 'loading...';

export default {
  name: 'app',
  components: {
    layout: Layout,
    markdown: Markdown
  },
  data() {
    return {
      loadingClass: {
        loading: true,
        fadeOut: false
      },
      source: LoadingText,
      LoadingText,
      list: [],
      locale: Utils.getUrlParams('locale') || 'en'
    };
  },
  beforeMount() {
    this.getDocumentsData();
  },
  updated() {
    this.renderDemo();
  },
  mounted() {
    this.scrollToAnchor();
  },
  methods: {
    i18nClickHandler(locale) {
      if (this.locale && this.locale === locale) {
        return;
      }
      this.locale = locale;
      this.getDocumentsData();
    },
    i18nButtonStyle(locale) {
      return {
        btn: true,
        'btn-default': true,
        focus: this.locale === locale
      };
    },
    scrollToAnchor() {
      const hash = location.hash;
      if (hash) {
        location.href = location.href.split('#')[0] + hash;
      }
    },
    getDocumentsData() {
      this.list = [];
      let number = documentsList.length;
      documentsList.forEach(name => {
        Utils.ajax(`./docs/${this.locale}/${name}.md`, data => {
          this.list.push(data);
          number--;
          if (!number) {
            this.loadingClass.fadeOut = true;
          }
        });
      });
    },
    renderDemo() {
      this.simplest = this.simplest || new Vue({
        el: '#simplest',
        render: h => h(SimplestDemo)
      });

      this.waterfall = this.waterfall || new Vue({
        el: '#waterfall',
        render: h => h(WaterfallDemo)
      });
    }
  }
};
</script>
<style lang="less">
@import '../assets/base.less';

.fadeIn {
  opacity: 100!important;
}
.fadeOut {
  opacity: 0!important;
}
.loading {
  font-size: 20px;
  margin-top: 10px;
  height: 25px;
  -webkit-transition: opacity .8s ease;
  transition: opacity .8s ease;
}
.i18n-buttons {
  height: 40px;
}
.autoresponsive-vue-container {
  margin-top: 20px;
}
.autoresponsive-vue-ribbon a {
  background-color: #2c3e50!important;
}
</style>
