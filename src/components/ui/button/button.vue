<template>
    <button :class="classes" :type="btnType">
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </button>
</template>
<script>
const prefix ='btn'
import {oneOf} from '../../util/uiTool';
    export default{
        props:{
            type:{
                validator(value){
                    return oneOf(value,['default','primary','success','info','warning','danger','inverse','purple','pink','black','violet'])
                }
            },
            shape:{
                validator(){
                    return oneOf(['rounded','circle','outline'])
                }
            },
            btnType:{
                default:'button',
                validator(value){
                    return oneOf(value,['button','submit','reset'])
                }
            }
        },
        data(){
            return {
                showSlot:true
            }
        },
        computed:{
            classes(){
                return [prefix,{
                    [` ${prefix}-${this.type} `]:!!this.type,
                    [` ${prefix}-${this.disabled} `]:!!this.disabled,
                    [` ${prefix}-${this.shape} `]:!!this.shape,
                }];
            }
        },
        mounted() {
            this.showSlot = this.$refs.slot.innerHTML.replace(/\n/g, '').replace(/<!--[\w\W\r\n]*?-->/gmi, '') !== '';
        }
    }
</script>
<style lang="less">
    .btn{
            display: inline-block;
            padding: 6px 12px;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 4px;
            &:active,&:focus{
                outline: 0;
            }
    }
    .btn-default {
        color: #333;
        background-color: #fff;
        border-color: #ccc;
        &:hover{
                color: #333;
                background-color: #e6e6e6;
                border-color: #adadad;
        }
    }

</style>