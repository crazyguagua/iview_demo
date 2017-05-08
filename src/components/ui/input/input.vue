<template>
    <div :class="wrapperCls">
        <template v-if="type=='text'">
            <div class="prepend" v-if="prepend">
                <slot name="prepend"></slot>
            </div>
            <div class="input-wrapper">
                <i class="iconfont input-icon" :class="iconCls" v-if="this.icon" @click="handleIconClick">
                </i>
                <input :value="currentValue" :autofocus="autofocus" :maxlength="maxlength" :type="type" :readOnly="readOnly" :disabled="disabled" :placeholder="placeholder" :class="inputCls" class="input"
                @focus="handleFocus" @blur="handleBlur" @input="handleInput" @change="handleChange" @keyup.enter="handlerEnterKeyPressed"
                >
            </div>
           
            <div class="after" v-if="after">
                <slot name="after"></slot>
            </div>
        </template>
        <template v-if="type==='textarea'">
            <textarea :maxlength="maxlength" ref="textarea" class="input" :style="textareaStyles" cols="30" :rows="rows" :placeholder="placeholder" :readOnly="readOnly" :disabled="disabled"
            @focus="handleFocus" @blur="handleBlur" @input="handleInput" @change="handleChange" @keyup.enter="handlerEnterKeyPressed"
            >
            
            </textarea>
        </template>
    </div>
</template>
<script>
import {oneOf,calcTextareaHeight} from '../../util/uiTool';
import emitter from '../../mixins/emitter';
const prefix ='my-input'
    export default{
        mixins:[emitter],
        props:{
            size:{ //输入框的尺寸
                type:String,
                validator(val){
                    return oneOf(val,['large','small'])
                }
            },
            type:{ //输入框的类型 文本，密码，大文本
                type:String,
                default:'text',
                validator(val){
                    return oneOf(val,['text','textarea','password'])
                }
            },
            placeholder:{ //输入提示字符串
                type:String
            },
            disabled:{//是否禁用
                type:Boolean,
                default:false
            },
            readOnly:{ //是否只读
                type:Boolean,
                default:false
            },
            maxlength:{ //用户输入最大长度
                type:Number
            },
            size:{//输入框尺寸
                type:String,
                default:'default',
                validator(val){
                    return oneOf(val,['default','small','large']);
                }
            },
            number:{//是否控制输入框的值为数字型
                type:Boolean,
                default:false
            },
            icon:{
                //输入框小图标
                type:String
            },
            rows:{//文本域默认的行数
                type:Number
            },
            autofocus:{
                type:Boolean,
                default:false
            },
            autosize:{
                type: [Boolean, Object],
                 default: false
            },
             value: {
                type: [String, Number]
            }

        },
        data(){
            return {
                textareaStyles:{},
                prefix:prefix,
                prepend:false,
                after:false,
                currentValue:this.value
            }
        },
        computed:{
            wrapperCls(){
                return [`${prefix}-wrapper`,{
                    [`${prefix}-group-wrapper`]:(this.prepend||this.after)
                }];
            },
            inputCls(){
                return [`input-${this.size}`]
            },
            iconCls(){
                return [`${this.icon}`,`input-icon-${this.size}`]
            }
        },
        watch:{
            value (val) {
                debugger;
                this.setCurrentValue(val);
            }
        },
        methods:{
            handlerEnterKeyPressed(){
                //处理回车键
                // alert('enter key pressed');
            },
            handleFocus(e){
                console.log('focus');
            },
            handleBlur(e){
                console.log('blur');
                this.dispatch('myFormItem','on-field-blur','blur');
            },
            handleInput(e){
                let value = e.target.value;
                if(this.number)  value = Number.isNaN(Number(value)) ? value : Number(value);
                this.setCurrentValue(value);
                this.$emit('input',value); //双向绑定到外部的 v-model
            },
            handleChange(e){
                //触发form-item
                // debugger;
                // this.setCurrentValue();
                
            },
            handleIconClick(e){
                //点击icon触发事件
                // alert('icon click');
                this.$emit('icon-click',e);
            },
            resizeTextArea(){
                const autosize = this.autosize;
                if (!autosize) {
                    return false;
                }

                const minRows = autosize.minRows;
                const maxRows = autosize.maxRows;
                this.textareaStyles = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
            },
            setCurrentValue(value){
               
                if(value !== this.currentValue){
                    this.currentValue = value;
                    this.dispatch('myFormItem','on-field-change','change');
                }
               
            }
        },
        mounted(){
            if(this.type == "textarea"){
               this.resizeTextArea();
            }
            if(this.$slots.prepend){
                this.prepend = true;
            }
            if(this.$slots.after){
                this.after = true;
            }
        }
    }
</script>
<style lang="less">
    .my-input-wrapper{
        position:relative;
        & .input{
            display:inline-block;
            width:100%;
            height:32px;
            padding:4px 7px;
            color:#657180;
            border:1px solid #d7dde4;
            border-radius:4px;
            transition:border .2s;
            background-color: #fff;
            background-image: none;
            cursor:text;
            outline:none;
        }
        & .input-wrapper{
            position:relative;
            width:100%;
        }
        & textarea{
                max-width: 100%;
                height: auto;
                vertical-align: bottom;
                font-size: 14px;
        }
        & .input:hover, & .input:focus{
            border:1px solid  #5cadff;
        }
        & .input:focus{
            box-shadow:0 0 0px 1px rgba(51,153,255,.2)
        }
        & .input-large{
                font-size: 14px;
                padding: 6px 7px;
                height: 36px;
        }
        & .input-small{
                padding: 1px 7px;
                height: 24px;
                border-radius: 3px;
        }

        & .input-icon{
            font-size: 16px;
            text-align: center;
            color: #9ea7b4;
            position: absolute;
            right: 0;
            z-index: 3;
        }
        & .input-icon-small{
             height:24px;
             width:24px;
            line-height:24px;
        }
        & .input-icon-default{
             height:32px;
             width:32px;
            line-height:32px;
        }
        & .input-icon-large{
            height:36px;
            width:32px;
            line-height:36px;
        }
    }
    .my-input-group-wrapper{
        display: table;
        width: 100%;
        border-collapse: separate;
        position: relative;
        font-size: 12px;
        top: 1px;
        & .input,& .prepend,& .after{
             display:table-cell;
            vertical-align:middle;
               
        }
        & .prepend,& .after{
                padding: 4px 7px;
                font-size: inherit;
                font-weight: 400;
                line-height: 1;
                color: #657180;
                text-align: center;
                background-color: #eee;
                border: 1px solid #d7dde4;
                border-radius: 6px;
                 width: 1px;
                white-space: nowrap;
        }
        & .prepend{
            border-top-right-radius:0;
            border-bottom-right-radius:0;
        }
         & .after{
            border-top-left-radius:0;
            border-bottom-left-radius:0;
        }
        & .input{
            border-radius:0;
        }   
    }

    /*form error 边框红色*/
    .my-form-item-error .input,.my-form-item-error .input:hover,.my-form-item-error .input:focus{
        border:1px solid #f30;
    }
</style>