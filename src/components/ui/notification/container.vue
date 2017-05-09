<template>
    <div :class="classes">
        <notification v-for="notice in notices" :iconCls="notice.iconCls" :message="notice.message">
        
        </notification>
    
    </div>
</template>
<script>
    import notification from './notification';
    const prefix='my-notice'
    export default{
        props:{
            prefix: {
                type: String,
                default: prefix
            }
        },
        computed:{
            classes(){
                return [`${this.prefix}`]
            }
        },
        data(){
            return {
                notices:[]
            }
        },
        methods:{
            add(notice){
                this.notices.add(notice);
            }
        }
        
    }
</script>
<style lang="less">
    .my-notice{
        font-size: 12px;
        position: fixed;
        z-index: 1010;
        width: 100%;
        top: 16px;
        left: 0;
    }
</style>
