<template>
    <button :class="classes" :type="btnType" :disabled="disabled">
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
                validator(value){
                    return oneOf(value,['rounded','circle','outline'])
                }
            },
            size:{
                validator(value){
                    return oneOf(value,['small','large'])
                }
            },
            long:{
                type:Boolean,
                default:false
            },
            btnType:{
                default:'button',
                validator(value){
                    return oneOf(value,['button','submit','reset'])
                }
            },
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
                    [`${prefix}-${this.size}`]:!!this.size,
                    [`${prefix}-long`]:this.long
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
    .btn.disabled, .btn[disabled], fieldset[disabled] .btn {
        cursor: not-allowed;
        filter: alpha(opacity=65);
        -webkit-box-shadow: none;
        box-shadow: none;
        opacity: .65;
    }
    .btn-primary, .btn-primary:hover, .btn-success, .btn-success:hover, .btn-warning, .btn-warning:hover, .btn-danger, .btn-danger:hover, .btn-inverse, .btn-inverse:hover, .btn-purple, .btn-purple:hover, .btn-pink, .btn-pink:hover, .btn-black, .btn-black:hover, .btn-violet, .btn-violet:hover {
        color: #fff;
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
    .btn-primary {
        background-color: #428bca;
        border-color: #3b7cb4;
        &:active,&:focus,&:hover{
                background-color: #3a95e4;
                    border-color: #3b7cb4;
                
        }
    }
    .btn-success {
        background-color: #37a000;
        border-color: #318d01;
         &:active,&:focus,&:hover{
                background-color: #45c203;
                border-color: #318d01;
         }
        
    }
    .btn-info {
    background-color: #62d0f1;
    border-color: #51b3d1;
        color: #fff;
         &:active,&:focus,&:hover{
            background-color: #53d4fa;
    border-color: #51b3d1;
         }
            
}
.btn-warning {
    background-color: #FFB61E;
    border-color: #E1A21E;
     &:active,&:focus,&:hover{
                background-color: #ffc751;
    border-color: #E1A21E;
         }
}
.btn-danger {
    background-color: #E5343D;
    border-color: #BF2D35;
     &:active,&:focus,&:hover{
                  background-color: #e7575e;
    border-color: #BF2D35;
         }
}
.btn-inverse {
    background-color: #3b3e47;
    border-color: #292d3b;
     &:active,&:focus,&:hover{
                   background-color: #2f3239;
    border-color: #292d3b;
         }
}
.btn-purple {
    background-color: #5b69bc;
    border-color: #4c59a7;
     &:active,&:focus,&:hover{
                   background-color: #4a59b4;
    border-color: #4c59a7;
         }
}

.btn-pink {
    background-color: #ff8acc;
    border-color: #db6fac;
     &:active,&:focus,&:hover{
                    background-color: #ff70c1;
    border-color: #db6fac;
         }
}

.btn-black {
    background-color: #000;
    border-color: #000;
     &:active,&:focus,&:hover{
                    background-color: #222;
    border-color: #6B6B6B;
         }
}
.btn-violet {
    background-color: #8E23E0;
    border-color: #6C13B1;
     &:active,&:focus,&:hover{
                   background-color: #a13eee;
                border-color: #6C13B1;

         }
}
.btn-large{
    padding: 6px 15px 7px;
    font-size: 14px;
    border-radius: 4px;
}
.btn-rounded{
        border-radius: 2em;
}
.btn-small{
        padding: 2px 7px;
    font-size: 12px;
    border-radius: 3px;
}
.btn-long{
    width: 100%;
}
</style>