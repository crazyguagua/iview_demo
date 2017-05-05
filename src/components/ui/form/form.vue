<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
    import {oneOf} from '../../util/uiTool'
    const prefix = 'my-form'
    export default{
        name:'myForm',
         props:{
             labelWidth:{//label 的宽度
                 type:Number
             },
             labelPosition:{ //form-item的对齐方式
                type:String,
                default:'left',
                validator(val){
                    return oneOf(val,['left','right','top'])
                }
             },
             rules:{}, //校验规则
             model:{ //表单字段

             }
        },
        data(){
            return {
                fields:[]
            }
        },
        computed:{
            classes(){
                return [`${prefix}`,{
                    [`${prefix}-label-${this.labelPosition}`]:this.labelPosition
                }];
            }
        },
        created(){
            this.$on('item-added',(item)=>{
                //获得子组件的引用
                this.fields.push(item);
            })

            this.$on('item-removed',(item)=>{
               
                this.fields.splice(this.fields.indexOf(item),1);
            })
        },
        methods:{
            //对整个表单进行校验
            validate(callback){
                let valid = true;
                let count =0;
                this.fields.forEach(item=>{
                    item.validateFormItem('',errors=>{
                        if(errors) valid = false;
                        //在form组件外调用
                        if(typeof callback === 'function' && this.fields.length==(++count)){
                            callback(valid);
                        }
                    })
                })
            }
        }
    }
</script>
<style lang="less">
    .my-form{
       
    }
    .my-form-label-left .my-form-item-label {
        text-align:left;
    }
    .my-form-label-top .my-form-item-label{
           float: none;
            padding: 0 0 10px;
            display: inline-block;
            text-align: left;
    }
</style>
