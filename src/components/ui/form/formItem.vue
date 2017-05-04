<template>
    <div :class="classes">
        <label  :style="labelStyle" :class="[`${prefix}-label`]"><slot name="label"><span class="star" v-if="required">*</span>{{label}}</slot></label>
        <div :class="[`${prefix}-content`]" :style="contentStyle">
            <slot></slot>
        </div>
        <div v-if="showMsg" :class="[`${prefix}-err`]">
            error
        </div>
    </div>
</template>
<script>
    import emitter from '../../mixins/emitter'
    const prefix = 'my-form-item';
    export default{
        name:'myFormItem',
        mixins:[emitter],
        props:{
            label:{ //表单组件项的label
                type:String
            },
             labelWidth:{//label 的宽度
                 type:Number
             },
             showMsg:{//是否显示错误信息
                 type:Boolean,
                 default:true
             },
             rules:{
                type:[Array,Object]
             },
             itemKey:{//用于获取form 的rules 的key ,同时也是 form组件 model的key
                 type:String
             }
             
        },
        data(){
            return {
                prefix:prefix,
                errorState:false,
                cRules:[],
                required:false//是否是必填项  显示小星星
               
            }
        },
        computed:{
            classes(){
                return [`${prefix}`,{
                    [`${prefix}-error`]:this.errorState
                }];
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
        },
        mounted(){
            //通知form组件 本form-item 已经挂载
            this.dispatch('myForm','item-added',this);
            this.cRules = this.getRules();
            this.cRules.every(rule=>{
                if(rule.required) this.required = true
                return;
            })
            //判断rule
            if(this.cRules.length>0){
                this.$on('on-field-change',this.validateFormItem);
                this.$on('on-field-blur',this.validateFormItem)
            }
        },
        methods:{
            validateFormItem(triggerType){
                var validateRule = this.getRuleByTriggerType(triggerType);
                
                if(validateRule&&validateRule.validator){
                    debugger;
                    validateRule.validator(value);
                }
            },
            getRuleByTriggerType(type){
                return this.cRules.filter(rule =>rule.trigger === type);
            },
            getRules(){//获取formItem的校验规则
                var rules =  this.rule || this.form.rules[this.itemKey];
                return rules||[];
            }
        }

    }
</script>
<style lang="less">
    .my-form-item {
        & .star{
            color:#f30;
            margin-right:4px;
            line-height:1;
            font-size:12px;
        }
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

