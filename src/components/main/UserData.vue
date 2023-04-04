<template >
    <div>

        <el-table :header-cell-style="{
            textAlign: 'center',
            height: '20px'
        }" :data="tableData" height="650" border style="width: 100%">
            <el-table-column prop="name" label="姓名" width="90">
            </el-table-column>
            <el-table-column prop="username" label="账号" width="150">
            </el-table-column>
            <el-table-column prop="phone" label="号码" width="150">
            </el-table-column>
            <el-table-column prop="permission" label="权限" width="240">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.permission" placeholder="">
                        <el-option label="最高权限" :value="0">
                        </el-option>
                        <el-option label="高级权限" :value="1">
                        </el-option>
                        <el-option label="普通权限" :value="2">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="revenueStatus" label="收入方式" width="240">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.revenueStatus" placeholder="请选择">
                        <el-option label="任务收入" :value="0">
                        </el-option>
                        <el-option label="分成收入" :value="1">
                        </el-option>
                    </el-select>
                </template>

            </el-table-column>
            <el-table-column prop="status" label="状态" width="120">
            </el-table-column>
            <el-table-column prop="balance" label="余额" width="120">
            </el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="getPassword(scope.row)">更新</el-button>
                    <el-button type="primary" size="small" @click="enableUser(scope.row.id)">{{ scope.row.status ? "封禁" :
                        "解封" }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="输入密码进行确认" :visible.sync="passwordVisible">
            <el-form label-width="80px">
                <el-form-item label="密码">
                    <el-input show-password v-model="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="updataUser()">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <div class="footer">







        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            passwordVisible:false,
            password:"",
            tableData: [],
            userForm:{}
        };
    },
    mounted() {
        this.getUserData()
    },
    methods: {
        getUserData() {
            this.$api.get('user/allList', {
            }, response => {
                this.tableData = response.data.data
            })
        },

        enableUser(id) {
            this.$api.get("/user/enable", { id: id }, response => {
                if (response.data.code == 1) {
                    this.getUserData()
                    this.$message.success(response.data.data)
                }
                else {
                    this.$message.error(response.data.msg)
                }
            })
        },
        updataUser(){
            var user = this.userForm
            this.$api.get("user/update",{
                id:user.id,
                permission:user.permission,
                revenueStatus:user.revenueStatus,
                password:this.password
            },response=>{
                if(response.data.code == 1){
                    this.password = ""
                    this.$message.success(response.data.data)
                }
                else{
                    this.$message.error(response.data.msg)
                }
            })
        },
        getPassword(row){
            this.passwordVisible = true
            this.userForm = row
        }





    },
    mounted() {
        this.getUserData()

    },
    watch: {

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