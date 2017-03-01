<template>
    <div class="login-container">
        <div class="login-title">
            <h1>后台管理系统</h1>
        </div>
        <div class="login-panel">
            <div  novalidate class="loginform">
                <div class="form-input"><input type="text" class="form-control"name="uname" placeholder="请输入用户名"></div>
                <div class="form-input"><input type="password" class="form-control" name="pwd" placeholder="请输入密码"></div>
                <div class="loginbar">
                    <label for=""><input type="checkbox"><span>记住我</span></label>
                    <button class="btn btn-login" @click="doLogin"><span>登陆</span></button>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
    import '../assets/login.css'
    export default {
        methods: {
            doLogin: function() {
                this.$router.push({
                    path: '/home/dashboard'
                });
            }
        }
    }
</script>

<style>

</style>