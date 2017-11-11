## Usage

### 引入

``` javascript
import AutoResponsive from 'autoresponsive-vue';

Vue.use(AutoResponsive);
```

### Simplest

简单的例子：

``` javascript
<template>
  ...
  <auto-responsive
    v-bind="options"
  >
    <div v-for="item in data" :style="style" class="item">{{ item }}</div>
  </auto-responsive>
  ...
</template>
<script>
  ...
  data() {
    return {
      data: [],
      options: {
        ...
      }
    }
  }
  ...
</script>
```

### Waterfall

实现一个流式布局变得非常容易

``` javascript
<template>
  ...
  <auto-responsive
    v-bind="options"
  >
    <div v-for="item in data" :style="style" class="item">{{ item }}</div>
  </auto-responsive>
  ...
</template>
<script>
  ...
  data() {
    return {
      data: [],
      options: {
        ...
      }
    }
  }
  ...
</script>
```

## Examples

- [示例1](./examples)

## Related Edition

- [React 版本](//github.com/xudafeng/autoresponsive-react)
- [ReactNative 版本](//github.com/xudafeng/autoresponsive-react-native)
