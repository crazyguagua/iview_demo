<template>
    <div class="reg-body">
        <login-header active-button="audit"></login-header> 
    </div>
</template>

<script>
    import loginHeader from '../components/LoginHeader';
    export default{
        name:'reg',
        components:{
            loginHeader
        }
    }
</script>
<style lang="less">
    .reg-body{
        background: linear-gradient(#56657D, #798EB1);
        position:absolute;
        top:0;
        right:0;
        left:0;
        bottom:0;
    }
</style>