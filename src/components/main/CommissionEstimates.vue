<template>
  <div>
    <el-row>
      <div class="filter">

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


        <el-button type="primary" @click="click('json')">上传客户状态余额文件</el-button>
        <el-button type="primary" @click="loadExcel()">导出数据</el-button>
        <input type="file" multiple name="myfile" id="json" hidden="hidden" accept="json/*" @change="uploadJSON()" />
      </div>
    </el-row>

    <el-table :header-cell-style="{
      textAlign: 'center',
      height: '20px'
    }" :data="tableData" height="650" border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="90">
      </el-table-column>
      <el-table-column prop="phone" label="主卡号码" width="120">
      </el-table-column>
      <el-table-column prop="packageName" label="套餐" width="120">
      </el-table-column>
      <el-table-column prop="broadbandNumber" label="宽带用户" width="120">
      </el-table-column>
      <el-table-column prop="creatUserName" label="发展人" width="120">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
      </el-table-column>

      <el-table-column prop="phoneBills" label="当月话费" width="120">
      </el-table-column>


      <el-table-column label="佣金预估" width="120">
        <template slot-scope="scope">
          {{ commission(scope.row) }}
        </template>
      </el-table-column>

      <el-table-column label="端口费预估" width="120">
        <template slot-scope="scope">
          {{ scope.row.status == "开通" ? 15.2 : 0 }}
        </template>

      </el-table-column>

      <el-table-column label="合计预估" width="120">
        <template slot-scope="scope">
          {{ Number(commission(scope.row)) + (scope.row.status == "开通" ? 15.2 : 0) }}
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      温馨提示：{{ 1 }}账单合计预估{{ 2 }}元,公司下发对账单为{{ 3 }}元。数据差额{{ 4 }}元
    </div>
  </div>
</template>
<script>
import { dataConversionUtil } from '@/utils/data2Excel'
export default {
  data() {
    return {


      policy: "星计划",
      dates: [],
      selectedDate: "",
      tableData: [],
      allDataTable: [],
      fileters: {
        packages: [],
        packageValue: "",

        status: ["正常在网", "欠费停机", "高额停机", "局方停机", "销户"],
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
    getBillDate() {

      this.$api.get('bill/getBillDate', {
      }, response => {
        this.dates = response.data.data
        this.selectedDate = this.dates[this.dates.length - 1]
        this.getCusBillData()
      })
    },
    getCusBillData() {
      this.$api.get('bill/getCusBillData', {
        date: this.selectedDate
      }, response => {
        this.tableData = response.data.data
      })
    },
    commission(row) {
      if (this.policy == "星计划") {
        return ((row.phoneBills - row.grants) * 0.47).toFixed(2)
      }
      if (this.policy == "合伙人") {
        return (row.phoneBills * 0.565).toFixed(2)
      }
    },


    addToList(v, list) {
      for (var i = 0; i < list.length; i++) {
        if (v == list[i]) return;
      }
      list.push(v)
    },
    isInList(v, list) {
      for (var i = 0; i < list.length; i++) {
        if (v == list[i]) return true;
      }
      return false
    },
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
    filterTable() {
      var i = this.getIndex(this.fileters.townshipValue, "value", this.fileters.townships)
      if (i >= 0 && this.fileters.townships[i].villages != this.fileters.villages) {
        this.fileters.villages = this.fileters.townships[i].villages
        this.fileters.villageValue = ""
      }

      this.tableData = [];
      for (var i = 0; i < this.allDataTable.length; i++) {
        if (this.fileters.statusValue && this.allDataTable[i].status != this.fileters.statusValue) continue;
        if (this.fileters.packageValue && this.allDataTable[i].packageName != this.fileters.packageValue) continue;
        if (this.fileters.typeValue && this.allDataTable[i].type != this.fileters.typeValue) continue;
        if (this.fileters.townshipValue && this.allDataTable[i].township != this.fileters.townshipValue) continue;
        if (this.fileters.villageValue && this.allDataTable[i].village != this.fileters.villageValue) continue;
        this.tableData.push(this.allDataTable[i])

      }


    },
    getIndex(v, name, list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i][name] == v) return i;
      }
      return -1;
    },
    click(id) {
      document.getElementById(id).click();
    },
    uploadJSON() {
      const selectedFile = document.getElementById('json').files[0]
      // 读取文件名
      const name = selectedFile.name
      // 读取文件大小
      const size = selectedFile.size
      // FileReader对象，h5提供的异步api，可以读取文件中的数据。
      const reader = new FileReader()
      // readAsText是个异步操作，只有等到onload时才能显示数据。
      reader.readAsText(selectedFile)
      reader.onload = r => {
        //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
        console.log(r.currentTarget.result);
        this.$api.post("/bill/addBillList",
          JSON.parse(r.currentTarget.result),
          response => {
            this.$alert(response.data.data, '提示', {
              confirmButtonText: '确定',
            });
          }
        )

      }
    },

  },
  mounted() {

    this.getBillDate()
  },
  watch: {

    fileters: {
      deep: true,
      handler(newValue, preValue) {
        this.filterTable()
        console.log(1)
      }
    },
    selectedDate: {
      handler(newValue, preValue) {
        this.getCusBillData()
      }
    }
    // 'fileters.townshipValue':{
    //   handler(newValue, preValue) {

    //   }
    // }
  }


}
</script>
<style scoped>
.filter {
  background-color: white;
  text-align: left;
  margin-top: 0px;


}

.el-select {
  margin-left: 30px;
  margin-right: 20px;
}

.el-table {
  margin-top: -20px;
  padding: 0px;
  line-height: 20px;
}

.footer {
  background-color: white;
  height: 100px;
}
</style>