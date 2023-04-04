<template lang="">
    <div class="header">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">

    <div class="font">
        联通投资发展型代理商CRM系统—————免费版
        
    </div>
<!-- <div class = "exit">
        <router-link to="/login">退出登录</router-link>
        </div>
    <div class="username">
        <i class="el-icon-user"></i>
    {{name}}
  </div> -->
</el-menu>
  
    </div>
</template>



  
<script>
export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            name: 'aaaa'
        };
    },
    mounted() {
        this.name = this.$route.query.name
    }
    ,
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }

    }
}
</script>
<style scoped>
.header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: rgb(110, 156, 255);
}

.font {
    width: 100%;
    font-family: "PingFang SC";
    font-size: 25px;
    background-color: rgb(105, 174, 253);
}

.exit {
    float: right;
    color: rgb(235, 163, 8);
    border-right: 20px;
    border-left: 20px;
}

.username {
    float: right;
    color: rgb(255, 255, 254);

}
</style>