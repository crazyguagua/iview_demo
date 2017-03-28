<template>
    <div class="login-container">
        <div class="login-title">
            <h1>后台管理系统</h1>
        </div>
        <div class="login-panel">
            <div  novalidate class="loginform">
                <div class="form-input"><input v-model="formData.userName" type="text" class="form-control"name="uname" placeholder="请输入用户名"></div>
                <div class="form-input"><input v-model="formData.pwd" type="password" class="form-control" name="pwd" placeholder="请输入密码"></div>
                <!--<div class="form-input">
                    <input type="text" class="form-control" placeholder="请输入验证码">
                </div>-->
                <div class="loginbar">
                    <!--<label for=""><input type="checkbox"><span>记住我</span></label>-->
                    <button class="btn btn-login" @click="doLogin()"><span>登陆</span></button>
                </div>
                
            </div>
           
        </div>
         <Alert :message="errorMsg" :type="type" v-if="errorMsg"></Alert>
    </div>
</template>
<script>
    import '../assets/login.css'
    import Alert from '../components/ui/alert'
    export default {
        components: {
            Alert
        },
        mounted() {

        },
        data() {
            return {
                formData: {},
                errorMsg: "",
                type: 'danger'

            }
        },
        methods: {
            doLogin: function() {
                let _this = this;
                this.$http.post('login', this.formData).then(function(m) {
                    let data = m.data;
                    if (data.retCode == 0) {
                        _this.errorMsg = data.retMsg;
                        _this.type = 'warning'
                    } else {
                        _this.$store.commit('LOGIN_INFO',data.obj);
                        _this.$router.push('/dashboard');
                    }
                }).catch(function(error) {
                    console.error(error);
                    _this.errorMsg = "网络异常，登陆失败！"
                })
            }
        }
    }
</script>

<style>

</style>