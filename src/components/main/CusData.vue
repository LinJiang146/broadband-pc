<template >
  <div>
    <el-row>
      <div class="filter">

        <!-- 筛选条件：
    <el-radio class="filter-item" v-model="filter" label="0" border>所有客户</el-radio>
    <el-radio v-model="filter" label="1" border>正常在网</el-radio>
    <el-radio v-model="filter" label="2" border>欠费停机</el-radio>
    <el-radio v-model="filter" label="3" border>高额停机</el-radio>
    <el-radio v-model="filter" label="4" border>已销户</el-radio> -->


        <el-select v-model="fileters.statusValue" clearable placeholder="状态">
          <el-option v-for="item in fileters.status" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>

        <el-select v-model="fileters.packageValue" clearable placeholder="套餐">
          <el-option v-for="item in fileters.packages" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>

        <el-select v-model="fileters.typeValue" clearable placeholder="客户类型">
          <el-option v-for="item in fileters.types" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>

        <el-select v-model="fileters.townshipValue" clearable placeholder="乡镇">
          <el-option v-for="item in fileters.townships" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
        </el-select>

        <el-select v-model="fileters.villageValue" clearable placeholder="村屯">
          <el-option v-for="item in fileters.villages" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>



        <el-button type="primary" @click="loadExcel()">导出数据</el-button>


      </div>
    </el-row>

    <el-table :header-cell-style="{
      textAlign: 'center',
      height: '20px'
    }" :data="tableData" height="650" border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="90">
      </el-table-column>
      <el-table-column prop="phone" label="常用号码" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="主卡号码" width="120">
      </el-table-column>
      <el-table-column prop="packageName" label="套餐" width="120">
      </el-table-column>
      <el-table-column prop="createUser" label="发展人" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="入网时间" width="120">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120">
      </el-table-column>
      <el-table-column prop="balance" label="余额" width="120">
      </el-table-column>
      <el-table-column prop="createDate" label="宽带用户" width="120">
      </el-table-column>
      <el-table-column prop="broadbandNumber" label="设备号码" width="120">
      </el-table-column>
      <el-table-column prop="createDate" label="贡献值" width="120">
      </el-table-column>
      <el-table-column prop="township" label="所属乡镇" width="120">
      </el-table-column>
      <el-table-column prop="village" label="村屯" width="120">
      </el-table-column>
      <el-table-column prop="address" label="详细地址" width="250">
      </el-table-column>
      <el-table-column label="查看地图" width="90">
        <template slot-scope="scope">
          <el-button @click="customerInMap(scope.row)" type="primary" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="phone1" label="副卡①" width="120">
      </el-table-column>
      <el-table-column prop="phone1" label="副卡①备注" width="120">
      </el-table-column>
      <el-table-column prop="phone2" label="副卡②" width="120">
      </el-table-column>
      <el-table-column prop="phone2" label="副卡②备注" width="120">
      </el-table-column>
      <el-table-column prop="phone3" label="副卡③" width="120">
      </el-table-column>
      <el-table-column prop="phone3" label="副卡③备注" width="120">
      </el-table-column>
    </el-table>


    <div class="footer">
      <el-col span="16">
        温馨提示：重要数据，谨防泄露，电脑无操作10秒，将返回首页　　　　　　　　　　　　　　　　　　　
        <el-button type="primary" @click="click('excel')">上传客户excel文件</el-button>

        <input type="file" multiple name="myfile" id="excel" hidden="hidden" accept="xlsx/xls/*"
          @change="uploadCustomerExcel" />
      </el-col>
      <el-col span="8">
        <el-pagination @size-change="sizePage" @current-change="goCurrentPage" :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" small layout="total, sizes, pager, jumper" :total="customerCount">
        </el-pagination>
      </el-col>



    </div>

  </div>
</template>
<script>
import { dataConversionUtil } from '@/utils/data2Excel'

export default {
  data() {
    return {

      //分页相关
      currentPage: 1,
      pageSize: 10,
      page: "",
      customerCount:0,


      

      tableData: [],
      allDataTable: [],
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
    getCustomerCount(){
      this.$api.get("broadband/count",{
        content: '',
        sort: 0,
        select: 0,
      },response=>{
        if(response.data.code==1){
          this.customerCount = response.data.data
        }
      })
    },
    goCurrentPage(current) {
      this.currentPage = current
      this.getCustomerData()
    },
    sizePage(size) {
      this.pageSize = size
      this.getCustomerData()
    },
    getCustomerData() {
      this.$api.get('broadband/list', {
        content: '',
        sort: 0,
        select: 0,
        current: this.currentPage,
        size: this.pageSize
      }, response => {
        setTimeout(
          () => {
            this.tableData = response.data.data
            //深度复制
            this.allDataTable = JSON.parse(JSON.stringify(response.data.data))
            var data = response.data.data
            for (var i = 0; i < data.length; i++) {
              this.addToList(data[i].packageName, this.fileters.packages)
              //构造乡镇与村屯从属关系
              if (data[i].township) {

                if (this.getIndex(data[i].township, "value", this.fileters.townships) == -1) {
                  this.fileters.townships.push({ villages: [data[i].village], value: data[i].township })
                }
                else {
                  for (var n = 0; n < this.fileters.townships.length; n++) {
                    if (this.fileters.townships[n].value == data[i].township) {
                      this.addToList(data[i].village, this.fileters.townships[n].villages)
                    }
                  }
                }
              }





            }
          }
          , 100
        )

      })
    },
    click(id) {
      document.getElementById(id).click();
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
        ['序号', '姓名', '主卡号码', '套餐', '发展人', '地址', '入网时间', '状态', '余额', '设备号码'],
      ]
      var dataList = []
      this.tableData.forEach((item, index) => {
        dataList.push([index + 1, item.name, item.phone, item.packageName, item.createUser, item.address, item.createTime, item.status, item.balance, item.broadbandNumbe]);
      })
      dataConversionUtil.dataToExcel('客户信息', tableHeader, dataList)
      this.$message.success('导出成功!');
    },
    uploadCustomerExcel() {
      this.$uploadFile("excel", "common/getCustomerFromExcel")
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
    }

  },
  mounted() {
    this.getCustomerData();
    this.getCustomerCount();
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
  margin-top: 0px;
  padding: 0px;
  line-height: 20px;
}

.footer {
  background-color: white;
  height: 100px;
}
</style>