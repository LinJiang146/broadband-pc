
<template>
    <div>
        <Header></Header>
        <div class="login" clearfix>

            <div class="login-wrap">
                <el-row type="flex" justify="center">
                    <el-form ref="loginForm" :model="user" status-icon label-width="80px">
                        <h1>欢迎使用</h1>
                        <h3>服务支撑：16677266888</h3>
                        <hr>
                        <el-form-item label="账号">
                            <el-input v-model="user.username"></el-input>


                        </el-form-item>
                        <el-form-item label="密码">

                            <el-input v-model="user.username" show-password></el-input>

                        </el-form-item>
                        <el-form-item>

                            <el-button class="loginbutton" type="primary" size="medium" icon="el-icon-upload"
                                @click="login()">登 录</el-button>
                        </el-form-item>

                        <el-form-item>

                            <router-link to="/sign" class="sign">注册账号</router-link>

                        </el-form-item>

                    </el-form>
                </el-row>
            </div>
        </div>
    </div>
</template>
   
<script>
import Header from '@/components/header/Header.vue'
export default {
    components: {
        Header
    },
    name: "login",
    data() {
        return {
            user: {
                username: "admin",
                password: "123456"
            }
        };
    },
    created() { },
    methods: {
        login() {
            this.$api.post('/user/login',
                this.user
                , response => {
                    if (response.data.code == 1) {
                        localStorage.setItem("userData", JSON.stringify(response.data.data))
                        this.$router.replace({
                            path: '/index/Commission',
                            query: {
                            }
                        })

                    } else {


                    }
                })
        }
    }
};
</script>
   
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loginbutton {
    font-size: 30px;
}

.sign {
    color: rgb(52, 95, 238);
    margin-top: -50px;
    margin-left: 30%;
}

.login {
    width: 100%;
    height: 900px;
    /* background: url("/assets/images/bg1.png") no-repeat; */
    background-size: cover;
    overflow: hidden;
}

.login-wrap {
    /* background: url("../assets/images/login_bg.png") no-repeat; */
    background-size: cover;
    width: 600px;
    height: 900px;
    margin: 215px auto;
    overflow: hidden;
    padding-top: 10px;
    line-height: 40px;
}

#password {
    margin-bottom: 5px;
}

h1 {
    color: #000000b8;
    font-size: 48px;
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