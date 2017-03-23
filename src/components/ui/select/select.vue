<template>
    <div class="my-select" :class="[{'my-select-open':isOpen}]" @click="open">
        <div class="my-select-selection">
            <div class="my-select-selection-render">
            10条/每页
            </div>
            <span class="arrow">
                <i class="iconfont icon-arrow-down"></i>
            </span>
        </div>
    </div>
</template>
<script>
    export default{
        name:'mySelect',
        componentName:'mySelect',
        data(){
            return{
                isOpen:false
            }
        },
        methods:{
            open(){
                this.isOpen = !this.isOpen;
            }
        }
    }
</script>
<style lang="less">
    .my-select{
            height:32px;
            line-height:32px;
            background-color: #fff;
            border-radius: 4px;
            border: 1px solid #d9d9d9;
        &-open .arrow i:before{
            transform:rotate(180deg);
        }
        &:hover{
            border-color: #49a9ee;
        }
        &-selection{
                position: relative;
                cursor: pointer;
                &-render{
                    margin:0 7px;
                    padding-right: 14px;
                }
        }
        & .arrow{
            text-align:center;
             top:50%;
              margin-top:-8px;
               right:5px;
             position:absolute;
        }
        & .arrow i:before{
            transition:transform .2s ease;
            line-height:18px;
            width:16px;
            height:16px;
            display:block;
           
        }
    }
</style>