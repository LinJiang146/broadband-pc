<template >
  <div class="aside">
    <el-row class="tac">


      <el-col :span="24">


        <el-row :gutter="0">
          <el-col :span="24">
            <div class="grid-content bg-purple data">
              <div>
                {{ "渠道名称：" + user.shopName + "\n" }}
                {{ "负责人：" + user.name + "\n" }}
                {{ "电话：" + user.phone + "\n" }}
                {{ "代理商类型：" + user.type }}
              </div>
            </div>
          </el-col>

        </el-row>




        <el-row :gutter="0" class="button">
          <el-col :span="12">
            <div class="grid-content bg-purple buttonitem">
              <div>
                <el-button type="primary" @click="goto('operationalOverview')">运营概况</el-button><br></br>
                <el-button type="primary" @click="goto('cusData')">用户数据</el-button>


              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple buttonitem">
              <div>
                <el-button type="primary" @click="goto('map')">地图模式</el-button><br></br>
                <el-button type="primary" @click="goto('commission')">佣金出账</el-button>

              </div>
            </div>
          </el-col>
        </el-row>


        <el-row :gutter="0" class="button">
          <el-col :span="12">
            <div class="grid-content bg-purple buttonitem">
              <div>
                <el-button type="primary" @click="goto('userData')">员工管理</el-button><br></br>
                <el-button type="primary" @click="goto('walletManagement')">钱包管理</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple buttonitem">
              <div>
                <el-button type="primary" >闭环跟进</el-button><br></br>
                <el-button type="primary" >潜在客户</el-button>
              </div>
            </div>
          </el-col>
        </el-row>


        <el-row :gutter="0" class="button">
          <el-col :span="12">
            <div class="grid-content bg-purple buttonitem">
              <div>
                <el-button type="primary" @click="goto('missionLobby')">任务大厅</el-button><br></br>
                <el-button type="primary">宽带资源</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple buttonitem">
              <div>
                <el-button type="primary">新人校院</el-button><br></br>
                <el-button type="primary">配置中心</el-button>
              </div>
            </div>
          </el-col>
        </el-row>


        <el-row class="button" :gutter="0">
          <el-col :span="24">
            <div class="grid-content bg-purple text">
              <div>
                服务支撑：16677266888{{ "\n" }}
                本软件由XX公司开发维护{{ "\n" }}
                欢迎您提出宝贵意见{{ "\n" }}
                后续将不断完善功能{{ "\n" }}
                <el-button type="primary">购买付费版</el-button>
              </div>
            </div>
          </el-col>

        </el-row>
        <!-- <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu> -->
      </el-col>
    </el-row>
  </div>
</template>
<script>


export default {
  data() {
    return {
      user: {
        shopName: '渠道1',
        name: '韦店长',
        type: '代理商',
        phone: '11111111111'
      }

    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('userData'))
  },
  beforeDestroy() {
    
  },
  methods: {
    setUserData(data){
      
      this.user = data;
      console.log(this.user);
      console.log(data)
      console.log(111)
    },

    goto(path) {
      this.$router.push({
        path: '/index/' + path,
      })
    }
  }
}
</script>
<style scoped>
.button {
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.buttonitem {
  background-color: rgb(163, 206, 255);
  color: #000;
  white-space: pre-wrap;
  font-size: 17px;
  line-height: 1;
  padding-top: 15px;
  padding-bottom: 15px;
}

.data {
  background-color: rgb(163, 206, 255);
  color: #000;
  white-space: pre-wrap;
  font-size: 17px;
  line-height: 2;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding-top: 15px;
  padding-bottom: 15px;
}

.text {
  background-color: rgb(163, 206, 255);
  color: #000;
  white-space: pre-wrap;
  font-size: 17px;
  line-height: 2;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>