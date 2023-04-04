<template>
    <div>
        <el-row class="filter">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="收支明细" name="1">收支明细</el-tab-pane>
                <el-tab-pane label="提现审核" name="2">提现审核</el-tab-pane>
                <el-tab-pane label="历史提现" name="3">审核记录</el-tab-pane>
                <el-tab-pane label="收益排行" name="4">收益排行</el-tab-pane>
            </el-tabs>
        </el-row>

        <el-row :gutter="20" v-show="activeName == '1'">
            <el-col :span="24">
                <div class="filter">
                    <el-col :span="3">
                        <el-select v-model="type" clearable placeholder="选择类型">
                            <el-option label="收入" value="收入">
                            </el-option>
                            <el-option label="支出" value="支出">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="status" clearable placeholder="选择状态">
                            <el-option label="冻结" :value="0">
                            </el-option>
                            <el-option label="正常" :value="1">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select clearable v-model="userId" placeholder="选择收款人">
                            <el-option v-for="item in userList" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="content" clearable placeholder="搜索收款人或描述栏"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-date-picker v-model="startTime" clearable type="datetime" placeholder="开始日期时间">
                        </el-date-picker>
                    </el-col>
                    <el-date-picker v-model="endTime" clearable type="datetime" placeholder="结束日期时间">
                    </el-date-picker>
                    <el-button type="primary" @click="getPaymentsList()">查询</el-button>
                    
                    <el-button type="primary" @click="checkBalance()">矫正余额</el-button>

                </div>

                <el-table height="600px" :data="paymentsTable" style="width: 100%">
                    <el-table-column prop="type" label="类型" width="90">
                    </el-table-column>
                    <el-table-column prop="phone" label="号码" width="150">
                    </el-table-column>
                    <el-table-column label="日期" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.dateTime.slice(0, 10) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.dateTime.slice(11, 19) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" label="描述栏" width="500">
                    </el-table-column>
                    <el-table-column prop="userName" label="收款人" width="120">
                    </el-table-column>
                    <el-table-column prop="amount" label="金额" width="90">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.status == 1" @click="enablePayment(scope.row.id)"
                                type="danger">冻结</el-button>
                            <el-button v-if="scope.row.status == 0" @click="enablePayment(scope.row.id)">解冻</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

        </el-row>

        <el-row v-show="activeName == '2'">
            <el-col :span="24">
                <el-table height="600px" :data="withdrawalsList1">
                    <el-table-column label="提现审核">
                        <el-table-column prop="description" label="提现明细" width="300">
                        </el-table-column>
                        <el-table-column prop="dateTime" label="提款时间" width="100">
                        </el-table-column>
                        <el-table-column label="提款人" width="100">
                            <template slot-scope="scope">
                                {{ id2User(scope.row.userId).name }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="amount" label="提现款" width="100">
                        </el-table-column>
                        <el-table-column label="当前余额" width="100">
                            <template slot-scope="scope">
                                {{id2User(scope.row.userId).balance }}
                            </template>
                            
                        </el-table-column>
                        <el-table-column label="备注/驳回原因" width="180">
                            <template slot-scope="scope">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="scope.row.remark">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="240">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="{ click('img'); withdrawals=scope.row }">完成打款</el-button>
                                <el-button type="danger"
                                    @click="deleteWithdrawals(scope.row.id, scope.row.remark)">驳回</el-button>
                            </template>
                        </el-table-column>
                    </el-table-column>

                </el-table>

            </el-col>
            <input type="file" id="img" hidden="hidden" @change="payWithdrawals(withdrawals)" accept="image/*">
        </el-row>
        <el-row v-show="activeName == '3'">
            <el-col :span="24">
                <el-table height="600px" :data="withdrawalsList2">
                    <el-table-column label="历史提现">
                        <el-table-column prop="description" label="提现明细" width="300">
                        </el-table-column>
                        <el-table-column prop="dateTime" label="申请时间" width="100">
                        </el-table-column>
                        <el-table-column prop="processDateTime" label="打款时间" width="100">
                        </el-table-column>
                        <el-table-column label="提款人" width="100">
                            <template slot-scope="scope">
                                {{ id2User(scope.row.userId).name }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="amount" label="提现款" width="100">
                        </el-table-column>
                        <el-table-column prop="remark" label="备注/驳回原因" width="180">
                        </el-table-column>
                        <el-table-column label="状态" width="120">
                            <template slot-scope="scope">
                                {{ scope.row.status == 1 ? '已打款' : '已驳回' }}
                            </template>
                        </el-table-column>
                        <el-table-column label="查看" width="240">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.status == 1" type="primary"
                                    @click="{ imgVisible = true; getImg(scope.row.billingImg) }">查看打款凭证</el-button>
                            </template>
                        </el-table-column>
                    </el-table-column>

                </el-table>

            </el-col>
            <input type="file" id="img" hidden="hidden" @change="payWithdrawals(withdrawals)" accept="image/*">
        </el-row>

        <el-row :gutter="90" v-show="activeName == '4'">
            <el-col :span="5" v-for="i in 4">
                <el-table height="300px">
                    <el-table-column label="今日收益排行榜">
                        <el-table-column label="姓名" width="120">

                        </el-table-column>
                        <el-table-column label="金额" width="120">

                        </el-table-column>
                    </el-table-column>

                </el-table>
            </el-col>

        </el-row>
        <el-dialog title="打款凭证" :visible.sync="imgVisible" width="50%">
            <img :src="img" :style="{
                width: '100%'
            }">
        </el-dialog>
    </div>
</template>
<script>
import uploadFile from '@/api/uploadFile';
import downloadImg from '@/api/downloadImg'
export default {
    data() {
        return {




            activeName: '1',

            imgVisible: false,

            userList: [],

            img: '',

            content: "",
            type: "",
            startTime: null,
            endTime: null,
            status: null,
            userId: null,

            allPaymentsList: [],
            //未处理的提款
            withdrawalsList1: [],
            //已处理的提款
            withdrawalsList2: [],
            paymentsTable: [],
            withdrawals: {},
            balanceList: {}

        };
    },
    mounted() {
        
        this.getPaymentsList()
        this.getWithdrawalsList()
    },
    methods: {
        checkBalance() {
            this.$api.get('wallet/checkBalance', {},
                response => {
                    if (response.data.code == 1) {
                        this.$message.success(response.data.data)
                    }
                    else {
                        this.$message.error(response.data.msg)
                    }
                })
        },
        getImg(fileName) {
            downloadImg(fileName, 'common/download', (img) => {
                console.log(img)
                this.img = img
            })
        },
        deleteWithdrawals(id, remark) {

            this.$api.delete('wallet/deleteWithdrawals', {
                WithdrawalsId: id,
                remark: remark
            }, response => {
                if (response.data.code == 1) {
                    this.$message.success(response.data.data);
                    this.getWithdrawalsList()
                } else {
                    this.$message.error(response.data.msg);
                }
            })
        },
        payWithdrawals(withdrawals) {
            uploadFile('img', 'common/uploadImg', (response) => {
                var fileName = response.data.data
                this.$api.get('wallet/payWithdrawals', {
                    WithdrawalsId: withdrawals.id,
                    billingImg: fileName,
                    remark: withdrawals.remark
                }, response => {
                    if (response.data.code == 1) {
                        this.$message.success(response.data.data);
                        this.getWithdrawalsList()
                        this.getUserList()
                    } else {
                        this.$message.error(response.data.msg);
                    }
                })
            })
        },

        getBalance() {
            this.$api.get('wallet/getPaymentsList', {
            }, response => {
                this.allPaymentsList = response.data.data
            })
            this.withdrawals.forEach(item => {
                ///////////////////////////////
                ////////////////////////////////
                ///////////////////////////////
                //////////////////////////////
            })
        },


        getPaymentsList() {
            this.$api.get('wallet/getPaymentsList', {
                startTime: this.dateToString(this.startTime),
                endTime: this.dateToString(this.endTime),
                type: this.type,
                content: this.content,
                status: this.status,
                userId: this.userId
            }, response => {
                this.paymentsTable = response.data.data
                this.getUserList()
            })
        },
        getUserList() {
            this.$api.get('user/allList', {
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
        id2User(id) {
            var user = {}
            this.userList.forEach(item => {
                if (id == item.id) {
                    user = item;
                }
            })
            return user
        },

        getWithdrawalsList() {
            this.$api.get('wallet/getWithdrawals', {
            }, response => {
                if (response.data.code == 1) {
                    var list = response.data.data
                    var list1 = []
                    var list2 = []
                    list.forEach(item => {
                        if (item.status == 0) {
                            list1.push(item)
                        } else {
                            list2.push(item)
                        }
                    })
                    this.withdrawalsList1 = list1
                    this.withdrawalsList2 = list2
                } else {

                }
            })
        },

        dateToString(date) {
            if (date != null) {
                var y = date.getFullYear();
                var M = date.getMonth() + 1;
                var d = date.getDate();
                var H = date.getHours();
                var m = date.getMinutes();
                var s = date.getSeconds();
                return y + '-' + (M < 10 ? ('0' + M) : M) + '-' + (d < 10 ? ('0' + d) : d) + " " + (H < 10 ? ('0' + H) : H) + ":" + (m < 10 ? ('0' + m) : m) + ":" + (s < 10 ? ('0' + s) : s);

            }

        },

        enablePayment(id) {
            this.$api.delete("wallet/enablePayment", {
                id: id
            },
                response => {
                    if (response.data.code == 1) {
                        this.$message.success(response.data.data);
                        this.getPaymentsList()
                    }
                    else {
                        this.$message.error(response.data.msg)
                    }
                });
        },


        click(id) {
            document.getElementById(id).click();
        }
    },

    watch: {

        // 'fileters.townshipValue':{
        //   handler(newValue, preValue) {

        //   }
        // }
    }
}
</script>
<style scoped>
.el-table {

    padding: 0px;
    line-height: 20px;
}
</style>