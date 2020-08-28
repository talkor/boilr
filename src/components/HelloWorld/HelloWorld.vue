<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Welcome!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome to iBoiler'
    };
  },
  methods: {},
  components: {}
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
