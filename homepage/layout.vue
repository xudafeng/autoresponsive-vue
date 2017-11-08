<template>
  <div class="layout">
    <customHeader></customHeader>
    <slot></slot>
    <customFooter></customFooter>
  </div>
</template>
<script>
import CustomHeader from './header.vue';
import CustomFooter from './footer.vue';

export default {
  name: 'Layout',
  provide: {
    eventBus: null
  },
  components: {
    CustomHeader,
    CustomFooter
  },
  props: {},
  data() {
    return {};
  }
};
</script>
<style lang="less">
@main_color1: #2c3e50;
::-webkit-scrollbar {
  width: 1px;
}
::-webkit-scrollbar-thumb {
  background: @main_color1;
}
/**
 * doc
 */
html {
  overflow-x: hidden;
}
body {
  padding: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-weight: 200;
  font-style: normal;
  line-height: 1;
  position: relative;
}
a {
  color: #42b983;
  text-decoration: none;
  line-height: inherit;
}
article {
  min-height: 100vh;
}
h1 {
  font-family: "Roboto", sans-serif;
  font-size: 2.75em;
  margin: 0;
}
header h1,
header h2 {
  color: @main_color1;
  font-weight: 300;
}
article h2,
article h3 {
  font-weight: 300;
}
article h3 {
  margin: 40px 0 20px 0;
}
article p {
  margin-top: 20px;
}
a:hover, a:focus {
  color: #f9c725;
  text-decoration: none;
}
a:active, a:hover {
  outline: 0;
}
.btn-group button {
  border-color: #42b983;
  color: #42b983;
  outline: 0;
  margin-bottom: 8px;
}
.btn-group button:hover,
.btn-group button:focus,
.btn-group button:active,
.btn-group .focus {
  color: #bbb!important;
  outline: 0!important;
}
.btn-default:focus,
.btn-default.focus {
  background-color: transparent;
}
</style>
