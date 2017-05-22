<template>

    <div class="success-div">
        <h2>注册成功</h2>
        <div class="message">
            <span>{{message}}</span>
        </div>
    </div>
</template>

<script>
    export default{

        data(){
            return {
                message:this.$route.message
            }
        }
    }
</script>
