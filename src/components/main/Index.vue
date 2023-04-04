<template>
  <div>

    <div class="text">
      温馨提示：你有以下客户未成功闭环，请及时跟进

    </div>
    <el-table :header-cell-style="{
      textAlign: 'center',
      height: '20px'
    }" :data="tableData" height="380" border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="主号" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="常用号码" width="180">
      </el-table-column>
      <el-table-column prop="address" label="详细地址" width="350">
      </el-table-column>
      <el-table-column prop="address" label="备注" width="350">
      </el-table-column>

      <el-table-column label="跟进" width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">操作</el-button>
        </template>
      </el-table-column>


    </el-table>

    <div class="text">
      温馨提示：你有以下潜在客户需开发，请及时跟进

    </div>
    <el-table :header-cell-style="{
      textAlign: 'center',
      height: '20px'
    }" :data="tableData" height="380" border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="90">
      </el-table-column>
      <el-table-column prop="phone" label="号码" width="120">
      </el-table-column>

      <el-table-column prop="address" label="详细地址" width="250">
      </el-table-column>
      <el-table-column prop="balance1" label="套餐消费" width="90">
      </el-table-column>
      <el-table-column prop="name" label="运营商" width="90">
      </el-table-column>
      <el-table-column prop="name" label="家庭成员①" width="150">
      </el-table-column>
      <el-table-column prop="name" label="家庭成员②" width="150">
      </el-table-column>
      <el-table-column prop="name" label="家庭成员③" width="150">
      </el-table-column>

      <el-table-column label="地图定位" width="90">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="备注" width="250">
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
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
      }, {
        name: '王小虎',
        phone: '11111111111',
        address: '上海市普陀区金沙江路 1518 弄',
        time1: '3月1日',
        balance1: 10.3,
      }, {
        name: '王小虎',
        phone: '11111111111',
        address: '上海市普陀区金沙江路 1518 弄',
        time1: '3月1日',
        balance1: 10.3,
      }, {
        name: '王小虎',
        phone: '11111111111',
        address: '上海市普陀区金沙江路 1518 弄',
        time1: '3月1日',
        balance1: 10.3,
      }, {
        name: '王小虎',
        phone: '11111111111',
        address: '上海市普陀区金沙江路 1518 弄',
        time1: '3月1日',
        balance1: 10.3,
      }, {
        name: '王小虎',
        phone: '11111111111',
        address: '上海市普陀区金沙江路 1518 弄',
        time1: '3月1日',
        balance1: 10.3,
      }, {
        name: '王小虎',
        phone: '11111111111',
        address: '上海市普陀区金沙江路 1518 弄',
        time1: '3月1日',
        balance1: 10.3,
      }, {
        name: '王小虎',
        phone: '11111111111',
        address: '上海市普陀区金沙江路 1518 弄',
        time1: '3月1日',
        balance1: 10.3,
      }, {
        name: '王小虎',
        phone: '11111111111',
        address: '上海市普陀区金沙江路 1518 弄',
        time1: '3月1日',
        balance1: 10.3,
      }, {
        name: '王小虎',
        phone: '11111111111',
        address: '上海市普陀区金沙江路 1518 弄',
        time1: '3月1日',
        balance1: 10.3,
      }, {
        name: '王小虎',
        phone: '11111111111',
        address: '上海市普陀区金沙江路 1518 弄',
        time1: '3月1日',
        balance1: 10.3,
      },]

    };
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
  margin-top: 0px;
  padding: 0px;
  line-height: 0px;
}

.text {
  background-color: rgb(66, 152, 250);
  text-align: left;
  height: 10px;
  line-height: 10px;
  font-size: 15px;
  color: rgb(255, 255, 255);
  margin-top: 5px;
}
</style>