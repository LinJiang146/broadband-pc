<template >
  <div>
    <el-row class="filter">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="出账数据" name="first">收支明细</el-tab-pane>
        <el-tab-pane label="佣金预估" name="second">提现审核</el-tab-pane>
      </el-tabs>
    </el-row>
    <div v-show="activeName=='first'">
      <el-row >
      <div class="filter" >

        <el-select v-model="selectedDate" placeholder="选择账期">
          <el-option v-for="date in dates" :key="date" :label="date" :value="date">
          </el-option>
        </el-select>

        <el-select v-model="policy" placeholder="选择政策">
          <el-option label="合伙人" value="合伙人">
          </el-option>
          <el-option label="星计划" value="星计划">
          </el-option>
        </el-select>

        <el-button type="primary" @click="loadExcel()">导出数据</el-button>




        <el-button type="primary" @click="click('commissionExcel')">导入移网账单</el-button>


        <el-button type="primary" @click="click('portFeesExcel')">导入端口费账单</el-button>
        <el-button type="primary" @click="exportExceptionsExcel()">异常数据导出</el-button>
        <el-popover placement="right" width="400" trigger="click">

          <el-row>
            <el-col :span="24">
              <el-checkbox v-model="portFees">端口费为0的用户</el-checkbox>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              固网佣金低于预计佣金的百分比
            </el-col>
            <el-col :span="6">
              <el-input v-model="fixedNet" placeholder="" width="100px">
              </el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              移网佣金低于预计佣金的百分比
            </el-col>

            <el-col :span="6">
              <el-input v-model="moveNet" placeholder="" width="100px">
              </el-input>
            </el-col>
          </el-row>

          <el-button type="primary" slot="reference">异常数据条件设置</el-button>
        </el-popover>



        <input type="file" multiple name="myfile" id="commissionExcel" hidden="hidden" accept="xlsx/xls/*"
          @change="uploadCommissionExcel" />
        <input type="file" multiple name="myfile" id="portFeesExcel" hidden="hidden" accept="xlsx/xls/*"
          @change="uploadPortFeesExcel" />


      </div>
    </el-row>

    <div class="table">


      <el-table :header-cell-style="{
      textAlign: 'center',
      height: '20px'
    }" :data="tableData" height="650">
        <el-table-column prop="name" label="姓名" width="90">
        </el-table-column>
        <el-table-column prop="phone" label="号码" width="120">
        </el-table-column>

        <el-table-column prop="broadNumber" label="宽带号" width="120">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="120">
        </el-table-column>
        <el-table-column prop="packageName" label="套餐" width="120">
        </el-table-column>





        <el-table-column prop="" label="" width="25">
        </el-table-column>
        <el-table-column label="账单详情">
          <el-table-column prop="amount1" label="移网" width="60">
          </el-table-column>
          <el-table-column prop="amount2" label="宽带" width="60">
          </el-table-column>
          <el-table-column prop="amount3" label="端口" width="60">

          </el-table-column>
          <el-table-column label="总额" width="60">
            <template slot-scope="scope">
              {{ scope.row.amount1 + scope.row.amount2 + scope.row.amount3 }}
            </template>
          </el-table-column>

        </el-table-column>






        <el-table-column prop="" label="" width="25">
        </el-table-column>

        <!-- <el-table-column

      prop="phone"
      label="首次佣金"
      width="120">
    </el-table-column> -->
        <el-table-column label="预测值">
          <el-table-column prop="balance" label="移网" width="60">
            <template slot-scope="scope">
              {{ commission(scope.row, "移网") }}
            </template>

          </el-table-column>
          <el-table-column prop="balance" label="宽带" width="60">
            <template slot-scope="scope">

              {{ commission(scope.row, "宽带") }}
            </template>

          </el-table-column>
          <el-table-column prop="balance" label="端口" width="60">
            <template slot-scope="scope">
              {{ scope.row.status == "开通" ? 15.2 : 0 }}
            </template>
          </el-table-column>
          <el-table-column label="总额" width="60">
            <template slot-scope="scope">
              {{ Number(commission(scope.row, "移网")) + Number(commission(scope.row, "宽带")) + (scope.row.status == "开通" ?
                15.2 : 0) }}

            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-row>
      </el-row>
    </div>
    </div>
    

    <CommissionEstimates v-show="activeName=='second'"></CommissionEstimates>

  </div>
</template>
<script>
import { dataConversionUtil } from '@/utils/data2Excel'
import CommissionEstimates from './CommissionEstimates.vue';
export default {
  components:{
    CommissionEstimates,
  },
  data() {
    return {

      activeName:"first",

      policy: "星计划",
      dates: [],
      selectedDate: "",
      filter: '1',
      tableData: [],
      allTableData: [],
      portFees: false,
      moveNet: 95,
      fixedNet: 95


    };
  },
  mounted() {
    this.getDate()

  },
  methods: {
    // getFromMap(phone,name){
    //   var bill = this.map.get(phone)
    //   if(bill){
    //     return bill[name]
    //   }
    //   return
    // },
    // getCommissionData() {
    //   this.$api.get('bill/getCusBillData', {
    //     date: this.selectedDate
    //   }, response => {
    //         const map = new Map();
    //     this.map = map
    //     for(var i = 0;i<response.data.data.length;i++){
    //       this.map.set(response.data.data[i].phone,response.data.data[i])
    //     }
    //   })
    // },
    getDate() {

      this.$api.get('commission/getFcDate', {
      }, response => {
        this.dates = response.data.data
        this.selectedDate = this.dates[this.dates.length - 1]

      })
    },
    getBillData() {
      this.$api.get('commission/getCommissionData', {
        date: this.selectedDate
      }, response => {
        this.allTableData = response.data.data
        this.updateTable()
      })
    },
    updateTable() {
      this.tableData = []
      for (var i = 0; i < this.allTableData.length; i++) {
        var index = this.allTableData[i].policy.indexOf(this.policy)
        if (index != -1 && index < this.allTableData[i].policy.length - 5) {
          this.tableData.push(this.allTableData[i])
        }
      }
    },
    commission(row, i) {
      if (this.policy == "星计划") {
        if (i == "移网") {
          return ((row.phoneBills - row.grants) * 0.47).toFixed(2)
        }
        return 0.00
      }
      if (this.policy == "合伙人") {
        if (i == "移网") {
          return (row.phoneBills * 0.302).toFixed(2)
        }
        else {
          return (row.phoneBills * 0.263).toFixed(2)
        }

      }
    },
    click(id) {
      document.getElementById(id).click();
    },
    uploadCommissionExcel() {
      this.$uploadFile("commissionExcel", "commission/commissionExcel")
    },
    uploadPortFeesExcel() {
      this.$uploadFile("portFeesExcel", "commission/portFeesExcel")
    },
    exportExceptionsExcel() {
      var data = []
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.portFees && this.tableData[i].amount3 <= 0.01) {
          data.push(this.tableData[i])
        } else if (this.tableData[i].amount1 < this.commission(this.tableData[i], "移网") * this.moveNet / 100) {
          data.push(this.tableData[i])
        } else if (this.tableData[i].amount2 < this.commission(this.tableData[i], "宽带") * this.fixedNet / 100) {
          data.push(this.tableData[i])
        }
      }
      var tableHeader = [
        ['序号', '姓名', '号码', "宽带号", '套餐', "移网", "宽带", "端口费", "总额", "预估移网", "预估宽带", "预估端口费", "预估总额"],
      ]
      var dataList = []
      data.forEach((item, index) => {
        dataList.push([index + 1, item.name, item.phone, item.broadNumber, item.packageName, item.amount1, item.amount2, item.amount3
          , item.amount1 + item.amount2 + item.amount3, this.commission(item, "移网"), this.commission(item, "宽带"), item.status == "开通" ? 15.2 : 0
          , Number(this.commission(item, "移网")) + Number(this.commission(item, "宽带")) + (item.status == "开通" ? 15.2 : 0)]);
      })
      dataConversionUtil.dataToExcel('异常数据', tableHeader, dataList)
      this.$message.success('导出成功!');

    },
    loadExcel() {
      var tableHeader = [
        ['序号', '姓名', '主卡号码', '套餐', '发展人', '状态', '当月话费', '佣金预估', '端口费预估', '合计预估'],
      ]
      var dataList = []
      this.tableData.forEach((item, index) => {
        dataList.push([index + 1, item.name, item.phone, item.packageName, item.createUser, item.status, item.phoneBills, this.commission(item), item.status == "开通" ? 15.2 : 0, Number(this.commission(item)) + (item.status == "开通" ? 15.2 : 0)]);
      })
      dataConversionUtil.dataToExcel('客户信息', tableHeader, dataList)
      this.$message.success('导出成功!');
    },

  },
  watch: {
    policy: {
      handler(newValue, preValue) {
        this.updateTable()
      }
    },
    selectedDate: {
      handler(newValue, preValue) {
        this.getBillData()
      }
    }
  }
}
</script>
<style scoped>
.el-select,
.el-button {
  margin-left: 30px;
  margin-right: 20px;
}

.table {

  margin-top: 0px;
  line-height: 20px;
}

.footer {
  background-color: white;
  height: 100px;
}
</style>