<template>
  <div id="app">
    <router-view/>
    
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  components: {
    
  },
}
</script>

<style>
.el-tabs__item.is-top{
  top: -30px;
}
.el-tabs__nav.is-top{
  height: 60px;
}
.el-tab-pane{
  display: none;
}
.footer {
  background-color: white;
  height: 100px;
}
.filter {
  background-color: white;
  text-align: left;
  margin-top: 0px;
  
}

#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
