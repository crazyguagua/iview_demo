<template>
    <div :class="wrapperCls">
        <slot></slot>
    </div>
</template>
<script>
    const prefix ='my-radio-group';
    import {findComponentsDownward} from '../../util/uiTool'
    export default{
        name:'myRadioGroup',
        props:{
            value:{
                type:[String,Number]
            },
            vertical:{
                type:Boolean,
                default:false
            }, // radio 纵向排列
            button:{
                //radio表现形式是button
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                cValue:this.value,
                prefix:`${prefix}`,
                wrapperPrefix:`${prefix}-wrapper`
            }
        },
        computed:{
            wrapperCls(){
               return [this.wrapperPrefix,
                {[`${this.prefix}-vertical`]:this.vertical,//纵向排列
                 [`${this.prefix}-button`]:this.button //展现形式是按钮
                
                }]
            }
        },
        methods:{
            updateValue(){ //更新子组件的选中状态
                //向下找组件
               let children =  findComponentsDownward(this,'myRadio');
               if(children){
                    children.forEach(child=>{
                        child.group = true; //告诉radio组件 他是有父组件 radioGroup的
                        child.cValue = this.cValue === child.cValueField; //保证其他的radio不选中
                    })
               }
            },
            change(data){
                //接收子组件 radio改变事件
                this.cValue = data.value;
                this.updateValue();
                this.$emit('input',this.cValue);
            
            }
        },
        mounted(){
            this.updateValue()
        }

    }
</script>
<style lang="less">
    /*纵向排列的radio样式*/
    .my-radio-group-vertical .my-radio{
        display:block;
    }
    /*radio的展现形式为按钮*/
    .my-radio-group-button .my-radio{
       padding:0 16px;
       border:1px solid #d7dde4;
       background:#fff;
    //    border:1px solid #39f;
       border-left:none;
       margin-right:0;
       word-spacing:0;/*去除display:inline-block的间距*/
    }
    .my-radio-group-button .my-radio:hover{
        color:#39f;
    }
    /*第一个子元素border-radius 第一个子元素有border-left*/
    .my-radio-group-button .my-radio:first-child{
        border-left:1px solid #d7dde4;
        border-top-left-radius:4px;
        border-bottom-left-radius:4px;
    }
    /*最后一个子元素有border-radius*/
    .my-radio-group-button .my-radio:last-child{
        border-top-right-radius:4px;
        border-bottom-right-radius:4px;
    }
    .my-radio-group-button .my-radio-span{
        display:none;
    }
    /*选中状态的radio*/
    .my-radio-group-button .my-radio-checked{
        border:1px solid #39f;
        color:#39f;
    }
    /*选中状态的radio 最后一个元素的border-left*/
    .my-radio-group-button .my-radio-checked:first-child{
        border-left:1px solid #39f;
    }
</style>

