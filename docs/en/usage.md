## Usage

### Import

``` javascript
import AutoResponsive from 'autoresponsive-vue';

Vue.use(AutoResponsive);
```

### Simplest

Simplest example：

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

The completion of a waterfall layout becomes very easy.

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

- [Sample1](./examples)
