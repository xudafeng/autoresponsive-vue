<template>
  <header>
    <div class="container header">
      <div class="title">
        <h1>AutoR<em>e</em>sponsiv<em>e</em> Vu<em>e</em></h1>
      </div>
      <div class="description">
        <h1>
          <div class="first">Magic</div>
          <p>Responsive Layout Library For Vue</p>
        </h1>
        <iframe class="github-btn" :src="`//ghbtns.com/github-btn.html?user=xudafeng&repo=${pkg.name}&type=watch&count=true`" title="Star on GitHub"></iframe>
        <a :href="`//www.npmjs.com/${pkg.name}`">
          <span class="version">v{{pkg.version}}</span>
        </a>
      </div>
    </div>
    <Ribbon
      v-bind="ribbon"
    ></Ribbon>
  </header>
</template>
<script>
const pkg = require('../package');

export default {
  name: 'customHeader',
  data() {
    return {
      pkg,
      ribbon: {
        text: 'Fork me on GitHub',
        linkUrl: pkg.repository.url,
        fixed: true,
        flat: true,
        classPrefix: pkg.name
      }
    };
  }
};
</script>
<style lang="less">
header {
  background-color: #fff;
  overflow: hidden;
  cursor: default;
  border-bottom: 1px solid #ddd;
  user-select: none;
  h1 em {
    color: #5fb783;
    font-style: normal;
  }
}
.header {
  position: relative;
  padding-bottom: 60px;
  .title {
    padding: 20px 0 30px 0;
  }
  .first {
    color: #5fb783;
    font-size: 150px;
    font-weight: bold;
    line-height: 1.2em;
    display: block;
    float: left;
    padding-right: 50px;
  }
  .logo {
    width: 600px;
    position: absolute;
    bottom: -272px;
    right: -84px;
    opacity: 0.8;
  }
  .description {
    position: relative;
    z-index: 99999;
    p {
      font-size: 50px;
      padding-top: 26px;
      padding-right: 40px;
      text-rendering: optimizeLegibility;
      font-weight: normal;
      line-height: 1.2em;
    }
  }
  .version {
    color: #333;
  }
  .github-btn {
    overflow: hidden;
    z-index: 999;
    border: 0;
    position: absolute;
    top: 0;
    right: 40px;
    width: 100px;
    height: 20px;
  }
}

@media only screen and (max-width: 500px) {
  .header {
    padding-bottom: 10px;
    .logo {
      display: none!important;
    }
    .first {
      font-size: 100px;
      padding: 0;
      float: none;
    }
    .title {
      font-size: 10px;
      padding: 10px 0;
    }
    .description {
      position: static!important;
      p {
        padding: 0!important;
        font-size: 40px;
      }
    }
  }
  .autoresponsive-vue-ribbon {
    display: none;
  }
  .github-btn {
    position: fixed!important;
    top: 15px!important;
    right: 0px!important;
  }
}
</style>
