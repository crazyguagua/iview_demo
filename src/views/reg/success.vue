<template>

    <div class="success-div">
         <div class="breadcrumb-wrapper">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>注册成功</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        <div class="reg-form">
            <h2>注册成功</h2>
            <div class="message">
                <span>{{message}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default{

        data(){
            return {
                message:this.$route.params.message
            }
        }
    }
</script>
