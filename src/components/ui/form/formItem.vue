<template>
    <div :class="classes">
        <label  :style="labelStyle" :class="[`${prefix}-label`]"><slot name="label">{{label}}<span class="star" v-if="required">*</span></slot></label>
        <div :class="[`${prefix}-content`]" :style="contentStyle">
            <slot></slot>
            <transition name="fade">
                <div v-if="showMsg && errorState==='error'" :class="{[`${prefix}-err`]:errorState==='error'}">
                    {{errorMessage}}
                </div>
            </transition>
        </div>
        
        
    </div>
</template>
<script>
    import emitter from '../../mixins/emitter';
    import AsyncValidator from 'async-validator';
    const prefix = 'my-form-item';
    function getPropByPath(obj, path) {
        let tempObj = obj;
        path = path.replace(/\[(\w+)\]/g, '.$1');
        path = path.replace(/^\./, '');

        let keyArr = path.split('.');
        let i = 0;

        for (let len = keyArr.length; i < len - 1; ++i) {
            let key = keyArr[i];
            if (key in tempObj) {
                tempObj = tempObj[key];
            } else {
                throw new Error('please transfer a valid prop path to form item!');
            }
        }
        return {
            o: tempObj,
            k: keyArr[i],
            v: tempObj[keyArr[i]]
        };
    }
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
                errorState:'success',
                errorMessage:'',//错误文字
                cRules:[],
                required:false//是否是必填项  显示小星星
               
            }
        },
        computed:{
            classes(){
                return [`${prefix}`,{
                    [`${prefix}-error`]:this.errorState=='error'
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
            },
            fieldValue:{
                cache: false,
                get(){
                    const model = this.form.model;
                    if (!model || !this.itemKey) { return; }

                    let path = this.itemKey;
                    if (path.indexOf(':') !== -1) {
                        path = path.replace(/:/, '.');
                    }
                    return getPropByPath(model, path).v;
                }
            }
        },
        mounted(){
            //保存formItem的初始值
            Object.defineProperty(this,'initValue', {
                    value: this.fieldValue
            });

            //通知form组件 本form-item 已经挂载
            this.dispatch('myForm','item-added',this);
            this.cRules = this.getRules();
            this.cRules.every(rule=>{
                if(rule.required) this.required = true
                return;
            })
            //判断rule
            if(this.cRules.length>0){
                //如果有校验规则，接收input 等控件的 field-change field-blur事件
                this.$on('on-field-change',this.validateFormItem);
                this.$on('on-field-blur',this.validateFormItem)
            }
        },
        beforeDestroy(){
            //通知form组件 本form-item 已经销毁
            this.dispatch('myForm','item-removed',this);
        },
        methods:{
            validateFormItem(triggerType,callback = function () {}){
                let validateRule = this.getRuleByTriggerType(triggerType);
                //如果有的字段没有校验，直接返回true
                if(!validateRule || validateRule.length==0){
                    callback();
                    return true;
                }
                let descriptor = {}
                descriptor[this.itemKey] = validateRule;
                let model = {};

                model[this.itemKey] = this.fieldValue;
                /*数据模型，可选项*/
                const validator = new AsyncValidator(descriptor);
                validator.validate(model, { firstFields: true }, errors => {
                    this.errorState = !errors ? 'success' : 'error';
                    this.errorMessage = errors ? errors[0].message : '';
                    callback(this.errorMessage);
                });
                
            },
            getRuleByTriggerType(type){ 
                //可以不指定trigger  因为form组件调用各个formItem组件的时候是不需要触发方式的
                //如果不指定type cRules不会过滤，如果指定了type 需要判断rule.trigger 
                return this.cRules.filter(rule =>!rule.trigger|| rule.trigger.indexOf(type) !== -1);
            },
            getRules(){//获取formItem的校验规则
                var rules =  this.rule || this.form.rules[this.itemKey];
                return rules||[];
            },
            resetField(){
                let model = this.form.model;
                let value = this.fieldValue;
                let path = this.itemKey;
                if (path.indexOf(':') !== -1) {
                    path = path.replace(/:/, '.');
                }

                let prop = getPropByPath(model, path);
                this.errorState ='success';
                this.errorMessage = '';//错误文字
                if (Array.isArray(value)) {
                    prop.o[prop.k] = [].concat(this.initialValue);
                } else {
                    prop.o[prop.k] = this.initialValue;
                }
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
        &-err{
            color: #f30;
        }
       
    }
</style>

