<template>
    <div :class="classes">
        <label  :style="labelStyle" :class="[`${prefix}-label`]"><slot name="label">{{label}}</slot></label>
        <div :class="[`${prefix}-content`]" :style="contentStyle">
            <slot></slot>
        </div>
        
    </div>
</template>
<script>
    const prefix = 'my-form-item';
    export default{
        name:'myFormItem',
        props:{
            label:{ //表单组件项的label
                type:String
            },
             labelWidth:{//label 的宽度
                 type:Number
             }
        },
        data(){
            return {
                prefix:prefix
            }
        },
        computed:{
            classes(){
                return [`${prefix}`];
            },
            labelStyle(){
                let labelStyle ={};
                let labelWidth =this.labelWidth||this.form.labelWidth;
                labelStyle.width = `${labelWidth}px`
                return labelStyle;
            },
            contentStyle(){
                let labelStyle ={};
                if(this.form.labelPosition!=='top'){
                    let labelWidth =this.labelWidth||this.form.labelWidth;
                    labelStyle.marginLeft = `${labelWidth}px`
                }
                
                return labelStyle;
            },
            form(){
                let parent = this.$parent;
                while(parent.$options.name!='myForm'){
                    parent = parent.$parent; 
                }
                return parent;
            }
        }

    }
</script>
<style lang="less">
    .my-form-item {
        &:before{
            content:'';
            display:table;
        }
        margin-bottom:24px;
        vertical-align:top;

        &-label{
            float:left;
            font-size: 12px;
            color: #657180;
            box-sizing:border-box;
            padding:10px 12px 10px 0;
            text-align:right;
            line-height:1;
            vertical-align:middle;
        }
       
    }
</style>

