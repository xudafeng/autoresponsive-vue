<template>
  <div v-bind:class="classObject" v-html="html"></div>
</template>
<script>
const Markdown = require('marked');
const Highlight = require('highlight.js');

Markdown.setOptions({
  highlight: function(code) {
    return Highlight.highlightAuto(code).value;
  }
});

export default {
  name: 'markdown',
  props: ['source'],
  data() {
    return {
      classObject: {
        fadeIn: false,
        markdown: true
      }
    };
  },
  computed: {
    html() {
      return Markdown(this.source);
    }
  },
  mounted() {
    setTimeout(() => {
      this.classObject.fadeIn = true;
    }, 16);
  }
};
</script>
<style lang="less">
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: white;
  color: black;
}

.hljs-comment,
.hljs-quote {
  color: #800;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-section,
.hljs-title,
.hljs-name {
  color: #008;
}

.hljs-variable,
.hljs-template-variable {
  color: #660;
}

.hljs-string,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-regexp {
  color: #080;
}

.hljs-literal,
.hljs-symbol,
.hljs-bullet,
.hljs-meta,
.hljs-number,
.hljs-link {
  color: #066;
}

.hljs-title,
.hljs-doctag,
.hljs-type,
.hljs-attr,
.hljs-built_in,
.hljs-builtin-name,
.hljs-params {
  color: #606;
}

.hljs-attribute,
.hljs-subst {
  color: #000;
}

.hljs-formula {
  background-color: #eee;
  font-style: italic;
}

.hljs-selector-id,
.hljs-selector-class {
  color: #9B703F
}

.hljs-addition {
  background-color: #baeeba;
}

.hljs-deletion {
  background-color: #ffc8bd;
}

.hljs-doctag,
.hljs-strong {
  font-weight: bold;
}

.hljs-emphasis {
  font-style: italic;
}
.markdown {
  opacity: 0;
  -webkit-transition: opacity .8s ease;
  transition: opacity .8s ease;
  pre {
    font-size: 18px;
    line-height: 1.5em;
    background: #fcfcfc;
    border: 1px solid #eee;
    color: #525252;
  }
  hr {
    border-top: 1px dashed #412816;
    margin-top: 4em;
    margin-bottom: 4em;
  }
  h1, h2, h3 {
    cursor: pointer;
  }
  h2 {
    margin: 30px 0;
    color: #38495d;
    font-size: 34px;
  }
  h3 {
    font-size: 28px;
  }
  p {
    font-size: 20px;
    color: #34495e;
  }
  li {
   margin: 10px 0;
  }
}
</style>
