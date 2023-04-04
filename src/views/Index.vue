<template lang="">
    <div>
        <el-container>
  <el-header>
    <Header></Header>
  </el-header>
  <el-container>
    <el-aside width="300px" >
      <Aside></Aside>
    </el-aside>
    <el-main>
        <router-view/>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>
<script>
import Aside from '@/components/aside/Aside.vue'
import Header from '@/components/header/Header.vue'

export default {
  name: 'Index',
  components: {
    Aside,
    Header
  }
}
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: rgb(105, 174, 253);
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #f7f7f7;
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: rgb(185, 185, 185);
  text-align: center;
  line-height: 120px !important;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>