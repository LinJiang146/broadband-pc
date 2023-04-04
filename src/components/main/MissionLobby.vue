<template >
  <div>
    <el-row class="filter">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="任务列表" name="first">收支明细</el-tab-pane>
        <el-tab-pane label="任务分类" name="second">提现审核</el-tab-pane>
      </el-tabs>
    </el-row>


    <div v-show="activeName == 'first'">
      <div class="filter">

        <el-col :span="3">
          <el-select clearable v-model="filter.status" placeholder="完成情况">
            <el-option label="待领取" value="待领取">
            </el-option>
            <el-option label="进行中" value="进行中">
            </el-option>
            <el-option label="已完成" value="已完成">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select clearable v-model="filter.type" :onchange="filter.mission == null" placeholder="任务类型">
            <el-option v-for="item in missionType" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select clearable v-model="filter.mission" placeholder="任务分类">
            <el-option v-for="item in walletItemList" v-if="item.type == filter.type" :label="item.description"
              :value="item.description">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select clearable v-model="filter.enable" placeholder="是否启用">
            <el-option label="启用" :value="1">
            </el-option>
            <el-option label="禁用" :value="0">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select clearable v-model="filter.isRoutine" placeholder="是否常规任务">
            <el-option label="常规任务" :value="1">
            </el-option>
            <el-option label="非常规任务" :value="0">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select clearable v-model="filter.userId" placeholder="选择指派">
            <el-option v-for="item in userList" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>

        <el-button type="primary" @click="getMissionList()">查询</el-button>
      </div>

      <el-table :header-cell-style="{
        textAlign: 'center',
        height: '20px'
      }" :data="missionList" height="650" border style="width: 100%">
        <el-table-column prop="customerName" label="客户姓名" width="90">
        </el-table-column>
        <el-table-column prop="phone" label="客户电话" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="250">
        </el-table-column>
        <el-table-column label="查看地图" width="90">
          <template slot-scope="scope">
            <el-button v-if="scope.row.lat" @click="customerInMap(scope.row)" type="primary" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="任务类型" width="150">
          <template slot-scope="scope">
            {{ missionType2Str(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="任务描述" width="120">
        </el-table-column>
        <el-table-column prop="userName" label="指派" width="120">
        </el-table-column>
        <el-table-column prop="amount" label="奖励" width="120">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="status" label="常规任务" width="120">
          <template slot-scope="scope">
            {{ scope.row.isRoutine == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="操作" width="120">
          <template slot-scope="scope">
            <el-button v-if="scope.row.enable == 1" @click="enableMission(scope.row.id)" size="small">禁用
            </el-button>
            <el-button v-if="scope.row.enable == 0" @click="enableMission(scope.row.id)" type="primary" size="small">启用
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="footer">
        <el-popover placement="right" width="400" trigger="click">
          <el-form ref="form" :model="missionForm" label-width="80px">
            <el-form-item clearable label="客户号码">
              <el-input v-model="missionForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="任务类型">
              <el-select v-model="missionForm.type" @change="missionForm.walletItemId = null" placeholder="">
                <el-option v-for="item in missionType" :key="item.key" :label="item.value" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务分类">
              <el-select v-model="missionForm.walletItemId" placeholder="请选择任务分类">
                <el-option v-for="item in walletItemList" v-show="missionForm.type == item.type && item.enable == 1"
                  :label="item.description" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="指派员工">
              <el-select clearable v-model="missionForm.userId" placeholder="未选择时员工可自行接取任务">
                <el-option v-for="user in userList" :label="user.name" :value="user.id"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="常规任务">
              <el-switch :active-value="1" :inactive-value="0" v-model="missionForm.isRoutine"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addMission()">发布任务</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference" type="primary">发布任务</el-button>

        </el-popover>

      </div>
    </div>


















    <el-row v-show="activeName == 'second'">
      <div class="filter">

        <el-col :span="5">
          <el-select clearable v-model="itemFilter.packageId" placeholder="套餐指定">
            <el-option v-for="item in packageList" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select clearable v-model="itemFilter.type" :onchange="filter.mission == null" placeholder="任务类型">
            <el-option v-for="item in missionType" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select clearable v-model="itemFilter.enable" placeholder="是否启用">
            <el-option label="启用" :value="1">
            </el-option>
            <el-option label="禁用" :value="0">
            </el-option>
          </el-select>
        </el-col>

        <el-button type="primary" @click="getWalletItemList()">查询</el-button>

      </div>
      <el-col :span="24">
        <el-table height="600px" :data="walletItemList" style="width: 100%">
          <el-table-column prop="description" label="描述栏" width="270">
          </el-table-column>
          <el-table-column label="类型" width="150">
            <template slot-scope="scope">
              {{ missionType2Str(scope.row.type) }}
            </template>
          </el-table-column>
          <el-table-column label="套餐指定" width="150">
            <template slot-scope="scope">
              {{ scope.row.packageId ? package2Str(scope.row.packageId) : "无" }}
            </template>
          </el-table-column>
          <el-table-column label="金额" width="90">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作(修改后在右表新增的数据中应用，旧数据不会改变)" width="250">
            <template slot-scope="scope">

              <el-button size="small" type="primary" @click="updateWalletItem(scope.row)">提交</el-button>

              <el-button v-if="scope.row.enable == 1" @click="enableMissionItem(scope.row.id)" size="small">禁用
              </el-button>
              <el-button v-if="scope.row.enable == 0" @click="enableMissionItem(scope.row.id)" type="primary"
                size="small">启用
              </el-button>

            </template>
          </el-table-column>
        </el-table>

      </el-col>
      <el-col>
        <div class="footer">
          <el-popover placement="right" width="400" trigger="click">
            <el-form ref="form" label-width="80px">
              <el-form-item clearable label="描述栏">
                <el-input v-model="missionItemForm.description"></el-input>
              </el-form-item>
              <el-form-item clearable label="金额">
                <el-input v-model="missionItemForm.amount"></el-input>
              </el-form-item>

              <el-form-item label="任务类型">
                <el-select v-model="missionItemForm.type" placeholder="">
                  <el-option v-for="item in missionType" :key="item.key" :label="item.value" :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item  label="套餐选择">
                <el-select clearable v-model="missionItemForm.packageId" placeholder="选填">
                  <el-option v-for="item in packageList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateWalletItem(missionItemForm)">添加任务类型</el-button>


              </el-form-item>

            </el-form>
            <el-button slot="reference" type="primary">添加任务分类</el-button>

          </el-popover>

        </div>
      </el-col>

    </el-row>

  </div>
</template>
<script>
import { dataConversionUtil } from '@/utils/data2Excel'

export default {
  data() {
    return {
      missionItemForm: { description: "", amount: null, packageId: null, type: 1 },
      missionForm: { walletItemId: null, phone: null, userId: null, isRoutine: 0, type: 1 },


      activeName: 'first',



      userList: [],
      walletItemList: [],
      packageList: [],
      missionList: [],





      filter: {
        status: "",
        userId: null,
        mission: null,
        isRoutine: null,
        enable: null,
        type: null
      },
      itemFilter: {
        packageId: null,
        enable: null,
        type: null
      },


      tableData: [],
      allDataTable: [],




      missionType: [{
        key: 1,
        value: "移网套餐开户"
      }, {
        key: 2,
        value: "融合宽带开户"
      }, {
        key: 3,
        value: "IPTV电视开户"
      }, {
        key: 4,
        value: "宽带+电视开户"
      }, {
        key: 5,
        value: "携号转网开户"
      }, {
        key: 6,
        value: "客户维系"
      }, {
        key: 7,
        value: "使用问题/故障上门维护"
      }, {
        key: 8,
        value: "装移宽带"
      }, {
        key: 9,
        value: "添加副卡"
      }],









      fileters: {
        packages: [],
        packageValue: "",

        status: ["开通", "欠费停机", "高额停机", "局方停机", "销户"],
        statusValue: "",
        //乡镇与村屯有级联关系
        townships: [],
        townshipValue: '',

        villages: [],
        villageValue: '',

        types: ["融合", "单卡", "电视+IPTV"],
        typeValue: '',
      }
    };
  },
  methods: {
    package2Str(id) {
      var str = ""
      this.packageList.forEach(e => {
        if (e.id == id) {
          str = e.name
        }
      })
      return str
    },

    missionType2Str(i) {
      var str = ""
      this.missionType.forEach(e => {
        if (e.key == i) {
          str = e.value
        }
      })
      return str
    },

    enableMission(id) {
      this.$api.delete("mission/enableMission", {
        id: id
      },
        response => {
          this.$message(response.data.data);
          this.getMissionList()
        });
    },
    enableMissionItem(id) {
      this.$api.delete("mission/enableMissionItem", {
        id: id
      },
        response => {
          this.$message(response.data.data);
          this.getWalletItemList()
        });
    },
    updateWalletItem(item) {


      if (item.description != null && item.description.length > 0 && !isNaN(parseFloat(item.amount)) && isFinite(item.amount)) {

        this.$api.post('mission/updateWalletItem', item, response => {
          if (response.data.code == 1) {
            this.getWalletItemList()
            this.$message.success(response.data.data);
          }
          else{
            this.$message.error(response.data.msg)
          }
        })
      } else {
        this.$message.error("填写有误")
      }

    },
    getMissionList() {
      this.$api.get("mission/list", this.filter, response => {
        if (response.data.code == 1) {
          this.missionList = response.data.data
        } else {
          this.$message.error(response.data.message);
        }
      })
    },
    addMission() {
      if (!this.missionForm.walletItemId) {
        this.$message.error('任务分类未选择');
        return;
      }
      if (this.missionForm.phone) {
        this.$api.get("broadband/getByPhone", { phone: this.missionForm.phone }, response => {
          if (response.data.code == 1) {
            this.missionForm.customerId = response.data.data.id

            this.$api.post("mission/addMission", this.missionForm, response => {
              if (response.data.code == 1) {
                this.$message.success(response.data.data);
                this.getMissionList()
              } else {
                this.$message.error(response.data.message);
              }
            })
          } else {
            this.missionForm.customerId = null
            this.$message.error('未找到该号码的客户');
          }
        })
      } else {
        this.$api.post("mission/addMission", this.missionForm, response => {
          if (response.data.code == 1) {
            this.$message.success(response.data.data);
            this.getMissionList()
          } else {
            this.$message.error(response.data.message);
          }
        })
      }
    },
    // getCustomerData() {
    //   this.$api.get('broadband/list', {
    //     content: '',
    //     sort: 0,
    //     select: 0,
    //   }, response => {
    //     setTimeout(
    //       () => {
    //         this.tableData = response.data.data
    //         //深度复制
    //         this.allDataTable = JSON.parse(JSON.stringify(response.data.data))
    //         var data = response.data.data
    //         for (var i = 0; i < data.length; i++) {
    //           this.addToList(data[i].packageName, this.fileters.packages)
    //           //构造乡镇与村屯从属关系
    //           if (data[i].township) {

    //             if (this.getIndex(data[i].township, "value", this.fileters.townships) == -1) {
    //               this.fileters.townships.push({ villages: [data[i].village], value: data[i].township })
    //             }
    //             else {
    //               for (var n = 0; n < this.fileters.townships.length; n++) {
    //                 if (this.fileters.townships[n].value == data[i].township) {
    //                   this.addToList(data[i].village, this.fileters.townships[n].villages)
    //                 }
    //               }
    //             }
    //           }





    //         }
    //       }
    //       , 100
    //     )

    //   })
    // },
    // click(id) {
    //   document.getElementById(id).click();
    // },
    // addToList(v, list) {
    //   for (var i = 0; i < list.length; i++) {
    //     if (v == list[i]) return;
    //   }
    //   list.push(v)
    // },
    // isInList(v, list) {
    //   for (var i = 0; i < list.length; i++) {
    //     if (v == list[i]) return true;
    //   }
    //   return false
    // },
    // customerInMap(customer) {
    //   this.$router.push({
    //     path: '/index/map',
    //     query: {
    //       lat: customer.lat,
    //       lng: customer.lng,
    //       filter: this.filter
    //     }
    //   })
    // },

    // loadExcel() {
    //   var tableHeader = [
    //     ['序号', '姓名', '主卡号码', '套餐', '发展人', '地址', '入网时间', '状态', '余额', '设备号码'],
    //   ]
    //   var dataList = []
    //   this.tableData.forEach((item, index) => {
    //     dataList.push([index + 1, item.name, item.phone, item.packageName, item.createUser, item.address, item.createTime, item.status, item.balance, item.broadbandNumbe]);
    //   })
    //   dataConversionUtil.dataToExcel('客户信息', tableHeader, dataList)
    //   this.$message.success('导出成功!');
    // },
    // uploadCustomerExcel() {
    //   this.$uploadFile("excel", "common/getCustomerFromExcel")
    // },
    // filterTable() {
    //   var i = this.getIndex(this.fileters.townshipValue, "value", this.fileters.townships)
    //   if (i >= 0 && this.fileters.townships[i].villages != this.fileters.villages) {
    //     this.fileters.villages = this.fileters.townships[i].villages
    //     this.fileters.villageValue = ""
    //   }

    //   this.tableData = [];
    //   for (var i = 0; i < this.allDataTable.length; i++) {
    //     if (this.fileters.statusValue && this.allDataTable[i].status != this.fileters.statusValue) continue;
    //     if (this.fileters.packageValue && this.allDataTable[i].packageName != this.fileters.packageValue) continue;
    //     if (this.fileters.typeValue && this.allDataTable[i].type != this.fileters.typeValue) continue;
    //     if (this.fileters.townshipValue && this.allDataTable[i].township != this.fileters.townshipValue) continue;
    //     if (this.fileters.villageValue && this.allDataTable[i].village != this.fileters.villageValue) continue;
    //     this.tableData.push(this.allDataTable[i])

    //   }


    // },
    // getIndex(v, name, list) {
    //   for (var i = 0; i < list.length; i++) {
    //     if (list[i][name] == v) return i;
    //   }
    //   return -1;
    // },

    customerInMap(customer) {
      this.$router.push({
        path: '/index/map',
        query: {
          lat: customer.lat,
          lng: customer.lng,
          filter: this.filter
        }
      })
    },


    getUserList() {
      this.$api.get('user/list', {
        sort: 1
      }, response => {
        if (response.data.code == 1) {
          this.userList = response.data.data
        } else {
          // this.$alert(response.data.message, '错误', {
          //     confirmButtonText: '确定'
          // });
        }
      })
    },
    getWalletItemList() {
      this.$api.get('mission/getWalletItemList', this.itemFilter, response => {
        if (response.data.code == 1) {
          this.walletItemList = response.data.data
        } else {
          // this.$alert(response.data.message, '错误', {
          //     confirmButtonText: '确定'
          // });
        }

      })
    },
    getPackageList() {
      this.$api.get('package/alllist', {
      }, response => {
        if (response.data.code == 1) {
          this.packageList = response.data.data
        } else {
          // this.$alert(response.data.message, '错误', {
          //     confirmButtonText: '确定'
          // });
        }

      })
    }
  },
  mounted() {
    this.getUserList()
    this.getWalletItemList()
    this.getMissionList()
    this.getPackageList()
    //   this.getCustomerData();
  },
  watch: {
    // filter: {
    //   //immediate: true, //当这个属性为true时，页面刚渲染就运行handler函数
    //   //handler 什么时候调用呢
    //   //handler接收两个参数，一个是这个状态参数改变前的值，另一个是改变后的旧值
    //   handler(newValue, preValue) {
    //     this.getCustomerData()
    //   }
    // }
    fileters: {
      deep: true,
      handler(newValue, preValue) {
        this.filterTable()
        console.log(1)
      }
    },
    // 'fileters.townshipValue':{
    //   handler(newValue, preValue) {

    //   }
    // }
  }


}
</script>
<style scoped>
.el-select {
  margin-left: 30px;
  margin-right: 20px;
}

.el-table {
  margin-top: 0px;
  padding: 0px;
  line-height: 20px;
}
</style>