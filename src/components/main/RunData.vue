<template >
  <div>


    <el-table :header-cell-style="{
      textAlign: 'center',
      height: '20px'
    }" :data="tableData" height="650" border style="width: 100%">

      <el-table-column v-for="item in colName" fixed :prop="item" :label="item" width="90">
      </el-table-column>
      <el-table-column fixed prop="phone" label="主卡号码" width="120">
      </el-table-column>

      <el-table-column label="2022年12月10日采集数据">

        <el-table-column label="状态" width="80">
          开通
        </el-table-column>

        <el-table-column label="实时话费" width="80">
          100
        </el-table-column>
        <el-table-column label="余额" width="80">
          100
        </el-table-column>
      </el-table-column>


    </el-table>

    <div class="footer">

      操作提示：在电脑上登录BOSS工号，然后点右边运行按钮，返回首页或其他操作不影响跑数据　　　　　　　　　　　　

      <el-button type="primary" @click="click('excel')">上传客户excel文件</el-button>



      <input type="file" multiple name="myfile" id="excel" hidden="hidden" accept="xlsx/xls/*"
        @change="uploadCustomerExcel" />



      <input type="file" multiple name="myfile" id="json" hidden="hidden" accept="json/*" @change="uploadJSON()" />





    </div>
  </div>
</template>
<script>
import axios from 'axios';
import * as XLSX from 'xlsx';
export default {
  data() {
    return {
      filter: '1',
      tableData: [{
        name: '王小虎',
        phone: '11111111111',
        address: '上海市普陀区金沙江路 1518 弄',
        time1: '3月1日',
        balance1: 10.3,
        time2: '3月2日',
        balance2: 10.3,
        time3: '3月3日',
        balance3: 10.3,
        time4: '3月4日',
        balance4: 10.3,
        time5: '3月5日',
        balance5: 10.3,
      }],
      filelist: [],
      importData: [],
      colName: ["name", "phone"],
      data: []

    };
  },
  mounted() {
    this.getBillData()
  },
  methods: {
    click(id) {
      document.getElementById(id).click();
    },

    getBillData() {
      this.$api.get("/broadband/getBillList",
        {},
        response => {
          var data = response.data.data
          // for (var i = 0; i < data.length; i++) {
          //   for (var n = 0; n < data[i].billingList.length; i++) {
          //     data[i][data[i].billingList.date] = {
          //       status: data[i].billingList[n].status,
          //       phoneBills: data[i].billingList[n].phoneBills,
          //       balance: data[i].billingList[n].balance,
          //       cost: data[i].billingList[n].cost,
          //       arrears: data[i].billingList[n].arrears,
          //     }
          //   }
          // }
          this.data = data
          data["aaaa"] = {
            aaa: "aaa",
            bbb: "vvv"
          }
        }
      )
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
    uploadExcel() {
      const file = document.getElementById('excel').files[0]
      let fileReader = new FileReader()
      fileReader.onload = function (ev) {
        let workbook
        try {
          let data = ev.target.result
          workbook = XLSX.read(data, {
            type: 'binary'
          }) // 以二进制流方式读取得到整份excel表格对象
        } catch (e) {
          console.log('文件类型不正确', e)
          return
        }

        // 表格的表格范围，可用于判断表头是否数量是否正确
        let fromTo = ''
        // 遍历每张表读取
        for (let sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            fromTo = workbook.Sheets[sheet]['!ref']
            console.log(fromTo)
            this.importData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            break; // 如果只取第一张表，就取消注释这行
          }
        }
        console.log(this.importData)
      }
      fileReader.readAsBinaryString(file)
    },
    uploadCustomerExcel() {
      this.$uploadExcel("excel", "common/getCustomerFromExcel")
    }
  }

}
</script>
<style scoped>
.filter {
  background-color: white;
  text-align: left;
  margin-top: 0px;


}

.el-table {
  margin-top: 20px;
  padding: 0px;
  line-height: 20px;
}

.footer {
  background-color: white;
  height: 100px;
}

.but {
  color: #194aeb;
  margin-left: 20px;
  margin-right: 20px;
}
</style>