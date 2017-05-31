<template>
    <div>
        <login-header></login-header>
         <div class="login-container">
       
        <div class="login-title">
            <img src="../assets/images/Logo_96.png" alt="">
             <h1>车辆救援系统</h1>
        </div>
        <div class="login-panel">
            <div  novalidate class="loginform">
                <div class="form-input"><input v-model="formData.loginName" type="text" class="form-control"name="uname" placeholder="请输入用户名"></div>
                <div class="form-input"><input v-model="formData.password" type="password" class="form-control" name="pwd" placeholder="请输入密码"></div>
                <div class="form-input">
                    <input v-model="formData.verifyCode" type="text" class="form-control " name="pwd" placeholder="验证码">
                    <img :src="codeSrc" alt="" class="validate-code" v-if="validateCode!==''" @click="getValidateCode">
                </div>
                <div class="form-input">
                <el-alert
                :title="errorMsg"
                :type="type" v-if="errorMsg" />
                </div>
                <!--<div class="form-input">
                    <input type="text" class="form-control" placeholder="请输入验证码">
                </div>-->
                <div class="loginbar">
                    <!--<label for=""><input type="checkbox"><span>记住我</span></label>-->
                    <button class="btn btn-login" @click="doLogin()" :loading="isLoading"><span>登陆</span></button>
                </div>
                <div class="loginbar">
                    <!--<label for=""><input type="checkbox"><span>记住我</span></label>-->
                    <router-link :to="{ path: 'reg/select' }"><button class="btn btn-reg" ><span>注册</span></button></router-link>
                </div>
            </div>
           
        </div>
         <div class="copy-right-info">
            © 2016 江苏亿科达科技发展有限公司版权所有 |<a target="_blank" href="http://www.miitbeian.gov.cn" class="beian-info">苏ICP备11037465号-3</a> 
        </div>
    </div>
</div>
   
</template>
<script>
    import '../assets/login.css'
    import LoginHeader from '../components/LoginHeader'
    export default {
        components: {
            LoginHeader
        },
        mounted() {
            //获取验证码
            
            this.getValidateCode();
        },
        data() {
            return {
                formData: {},
                errorMsg: "",
                type: 'danger',
                validateCode:'',
                requestId:'',
                isLoading:false

            }
        },
        computed:{
            codeSrc(){
                return 'data:image/png;base64,'+this.validateCode;
            }
        },
        methods: {
            doLogin: function() {
                let _this = this;
                if(!this.formData.verifyCode){
                    this.type="warning";
                    this.errorMsg="请输入验证码"
                   
                    return;
                }
                if(!/^\d{4}$/.test(this.formData.verifyCode)){
                     this.type="warning";
                    this.errorMsg="请输入4位验证码"
                    return;
                }
                    
                this.isLoading = true;
                this.$store.dispatch('login',this.formData).then(() => {
                    this.loading = false;
                    this.$router.push('/dashboard');
                    // this.showDialog = true;
                }).catch(err => {
                    // console.log(this);
                    // this.$message.error(err);
                   
                    this.loading = false;
                    this.type="error";
                    this.errorMsg = err;
                    this.getValidateCode();
                });
                // this.$http.req('login', this.formData).then(function(m) {
                //     _this.isLoading = false;
                //     let data = m.data;
                //     if (data.retCode == 0) {
                //         _this.errorMsg = data.retMsg;
                //         _this.type = 'warning'
                //     } else {
                //         _this.$router.push('/dashboard');
                //     }
                // }).catch(function(error) {
                //     _this.isLoading = false;
                //     _this.errorMsg = "网络异常，登陆失败！"
                // })
            },
            getValidateCode(){
                let _this = this;
                this.$http.req('fetchVerifyCode').then(function(m) {
                        let data = m.data;
                        if (data.retCode !== 1) {
                            _this.errorMsg = data.retMsg;
                            _this.type = 'warning'
                        }else{
                            _this.formData.requestId = data.requestId;
                            _this.validateCode=data.verifyCodeBase64;
                        } 
                }).catch(function(error) {
                    _this.errorMsg = "网络异常，登陆失败！"
                })
            }
        }
    }
</script>

<style>

</style>