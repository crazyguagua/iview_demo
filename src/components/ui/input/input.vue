<template>
    <div :class="wrapperCls">
        <template v-if="type=='text'">
            <div>
                <slot name="prepend"></slot>
            </div>
            <i>
            </i>
            <input :type="type">
            <div>
                <slot name="after"></slot>
            </div>
        </template>
    </div>
</template>
<script>
import {oneOf} from '../../util/uiTool';
const prefix ='my-input'
    export default{
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
            readOnly:{
                type:Boolean,
                default:false
            },
            maxLength:{ //用户输入最大长度
                type:Number
            }

        },
        computed:{
            wrapperCls(){
                return [`${prefix}-wrapper`];
            }
        }
    }
</script>
<style lang="less">
    .my-input-wrapper{

        & input{
            display:inline-block;
            width:100%;
            heigh:32px;
            padding:4px 7px;
            color:#657180;
            border:1px solid #d7dde4;
            border-radius:4px;
        }
    }
</style>