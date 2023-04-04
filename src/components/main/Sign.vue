
<template>
    <div class="login" clearfix>
        <div class="login-wrap">
            <el-row type="flex" justify="center">
                <el-form ref="loginForm" :model="user" status-icon label-width="80px">
                    <h3>注册</h3>
                    <hr>
                    <el-form-item prop="username" label="渠道名称">
                        <el-input v-model="user.shopName" placeholder="请输入用户名" prefix-icon></el-input>
                    </el-form-item>
                    <el-form-item prop="username" label="负责人">
                        <el-input v-model="user.name" placeholder="请输入用户名" prefix-icon></el-input>
                    </el-form-item>
                    <el-form-item prop="username" label="电话号码">
                        <el-input v-model="user.phone" placeholder="请输入用户名" prefix-icon></el-input>
                    </el-form-item>
                    <el-form-item prop="username" label="营业地址">
                        <el-input v-model="user.address" placeholder="请输入用户名" prefix-icon></el-input>
                    </el-form-item>
                    <el-form-item label-width="90px" label="代理商类型">
                        <el-radio-group v-model="user.type">
                            <el-radio label="纯发展型"></el-radio>
                            <el-radio label="投资发展型"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item prop="username" label="推介人">
                        <el-input v-model="introducer" placeholder="选填" prefix-icon></el-input>
                    </el-form-item>

                    <el-form-item prop="username" label="验证码">
                        <el-col :span="12">
                            <el-input v-model="captcha" placeholder="请输入验证码" prefix-icon></el-input>

                        </el-col>
                        <el-col :span="12">
                            <el-button class="captcha-button" type="primary" icon="el-icon-thumb"
                                @click="">获取验证码</el-button>

                            <img class="captcha" src="../../assets/abc.jpg">
                        </el-col>
                    </el-form-item>
                    <el-row>

                    </el-row>

                    <el-form-item>
                        <el-button class="sign-button" type="primary" icon="el-icon-upload" @click="login()">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
    </div>
</template>
   
<script>
export default {
    name: "login",
    data() {
        return {
            user: {
                shopName: '渠道1',
                name: '韦店长',
                type: '代理商',
                phone: '11111111111',
                address: '广西桂平',
                type: '纯发展型'
            },
            introducer: '',
            captcha: ''
        };
    },
    created() { },
    methods: {
        login() {
            this.$api.get('common/login', {
                username: this.user.username,
                password: this.user.password
            }, response => {
                console.log(response.data)
                if (response.status >= 200 && response.status < 300) {
                    if (response.data.type == 2) {
                        this.$router.push({
                            path: '/business/shops',
                            query: {
                                name: response.data.name
                            }
                        })
                    }
                    if (response.data.type == 3) {
                        this.$router.push({
                            path: '/customer/shops',
                            query: {
                                name: response.data.name
                            }
                        })
                    }

                } else {
                    console.log(response.message)
                }
            })
        }
    }
};
</script>
   
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.captcha {
    width: 120px;
}

.captcha-button {
    float: right;
}

.sign-button {
    font-size: 30px;
}

.login {
    width: 100%;
    height: 800px;
    /* background: url("../assets/images/bg1.png") no-repeat; */
    background-size: cover;
    overflow: hidden;
}

.login-wrap {
    /* background: url("../assets/images/login_bg.png") no-repeat; */
    background-size: cover;
    width: 500px;
    height: 800px;
    margin: 70px auto;
    overflow: hidden;
    padding-top: 10px;
    line-height: 40px;
    font-size: 10px;
}

#password {
    margin-bottom: 5px;
}

h3 {
    color: #020202b8;
    font-size: 24px;
}

hr {
    background-color: rgb(255, 255, 255);
    margin: 20px auto;
}

a {
    text-decoration: none;
    color: rgb(255, 255, 255);
    font-size: 15px;
}

a:hover {
    color: rgb(255, 255, 255);
}

.el-button {
    width: 80%;
    margin-left: -50px;
}
</style>