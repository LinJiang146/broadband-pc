<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="11" class="data">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label-width="220px" label="移网取数对比日应更接近日期:">
            <el-col :span="4">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label-width="220px" label="消费取数对比日应更接近日期:">
            <el-col :span="4">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label-width="220px" label="出账数据列为异常条件为低于:">
            <el-col :span="4">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label-width="220px" label="固网出账为0时是否列入异常">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>

          <el-form-item label-width="250px" label="固网出账为0时满足以下条件列为异常">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="条件1" name="type"></el-checkbox>
              <el-checkbox label="条件2" name="type"></el-checkbox>
              <el-checkbox label="条件3" name="type"></el-checkbox>
              <el-checkbox label="条件4" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label-width="100px" label="发展日期在">
            <el-col :span="8">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-radio-group v-model="form.resource">
                <el-radio label="前"></el-radio>
                <el-radio label="后"></el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>

          <el-form-item label-width="220px" label="本网移网佣金号码增加">
            <el-button type="primary" @click="">增加号码</el-button>
            <el-button type="primary" @click="">已增加号码</el-button>
          </el-form-item>



          <el-form-item>
            <el-button type="primary" @click="onSubmit">完成</el-button>
          </el-form-item>
        </el-form>



      </el-col>
      <el-col :span="8" class="data">

        <el-table :header-cell-style="{
          textAlign: 'center',
          height: '20px'
        }" :data="tableData" height="450" border style="width: 100%">
          <el-table-column prop="name" label="姓名" width="90">
          </el-table-column>
          <el-table-column prop="phone" label="号码" width="120">
          </el-table-column>

          <el-table-column prop="address" label="原因" width="250">
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" class="data">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label-width="50px" label="号码">
            <el-col :span="22">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label-width="50px" label="原因">
            <el-col :span="22">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>



          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加号码</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>


  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [
        {
          name: "aaa",
          phone: '1111111111',
          address: 'aaaabbbbbbb'
        }, {
          name: "aaa",
          phone: '1111111111',
          address: 'aaaabbbbbbb'
        }, {
          name: "aaa",
          phone: '1111111111',
          address: 'aaaabbbbbbb'
        },
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
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
  margin-top: 0px;
  padding: 0px;
  line-height: 20px;
}

.footer {
  background-color: white;
  height: 100px;
}

.data {
  background-color: rgb(163, 206, 255);
  color: #000;
  white-space: pre-wrap;
  font-size: 17px;
  line-height: 2;
  margin-left: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>