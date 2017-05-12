<template>
    <label :class="labelCls">
        <span :class="radioCls">
            <span :class="innerCls"></span>
            <input type="radio" :class="inputCls" @change="handleChange"
                :checked="cValue" :disabled="disabled"
            >
        </span>
        <slot></slot>
    </label>


</template>

<script>
     const prefix ='my-radio';
     export default{
            props:{
                value:{
                    type:Boolean,
                    default:false
                },
                disabled:{
                    //是否是禁用状态
                    type:Boolean,
                    default:false
                }
            },
            computed:{
                labelCls(){
                    return [`${prefix}`]
                },
                radioCls(){
                    return [`${prefix}-span`,{[`${prefix}-span-checked`]:this.cValue===true}]
                },
                innerCls(){
                    return [`${prefix}-inner`]
                },
                inputCls(){
                    return [`${prefix}-input`]
                }
            },
            data(){
                return {
                    cValue:false
                }
            },
            methods:{
                handleChange(e){
                    let checked = e.target.checked;
                    if(this.disabled ===true){
                        return false;
                    }
                    debugger;
                    this.cValue = checked;
                    //绑定到外层 v-model
                    this.$emit('input',checked);
                    //触发表单校验
                    
                }
            },
            watch:{
                value(val){
                    this.cValue = val
                }
            }

     }
</script>

<style lang="less">

        .my-radio{
                white-space: nowrap;
                cursor:pointer;
                margin-right:8px;

            &-span{


            }
            &-inner{
                display:inline-block;
                width:14px;
                height:14px;
                border-radius:50%;
                background-color: #fff;
                border: 1px solid #d7dde4;
                position:relative;
                &:after{
                    content:' ';
                    top:3px;
                    left:3px;
                    background:#39f;
                    width:8px;
                    height:8px;
                    position:absolute;
                    border-radius:50%;
                    transform:scale(0);
                    opacity:0;
                }
            }
            
            &-input{
                position:absolute;
                opacity:0;
            }
            /** 选中状态 */
            
            .my-radio-span-checked{
                  .my-radio-inner{
                      border: 1px solid #39f;
                  } 
                  .my-radio-inner:after{
                      transform:scale(1);
                      opacity:1;
                      transition:all .2s ease-in-out;
                  } 
            }
        }
        
</style>