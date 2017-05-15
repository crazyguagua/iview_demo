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
            name:'myRadio',
            props:{
                value:{
                    type:Boolean,
                    default:false
                },
                valueField:{
                    type:[String,Number]
                },
                disabled:{
                    //是否是禁用状态
                    type:Boolean,
                    default:false
                }
            },
            computed:{
                labelCls(){
                    return [`${prefix}`,{[`${prefix}-checked`]:this.cValue===true}]
                },
                radioCls(){
                    return [`${prefix}-span`]
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
                    cValue:false,
                    group:false,//外层是否有radioGroup,radioGroup在挂载时判断
                    cValueField:null
                }
            },
            methods:{
                handleChange(e){
                    let checked = e.target.checked;
                    if(this.disabled ===true){
                        return false;
                    }
                    this.cValue = checked;
                    //绑定到外层 v-model
                    this.$emit('input',checked);
                   
                    //判断是否有父组件 radioGroup

                    //如果有radioGroup则在radioGroup里面触发form表单校验
                    if(this.group){
                       this.$parent.change({
                           value:this.cValueField,
                           checked:checked
                       });
                    }else{
                         //如果没有radioGroup 直接触发表单校验 
                        this.$emit('on-change',checked)
                        this.dispatch('myFormItem','on-field-change','change');
                    }
                }
            },
            watch:{
                value(val){
                    this.cValue = val
                }
            },
            mounted(){
                this.cValueField = this.valueField||this.$slots.default[0].text;
            }

     }
</script>

<style lang="less">

        .my-radio{
                white-space: nowrap;
                cursor:pointer;
                margin-right:8px;
                display:inline-block;
                vertical-align:middle;

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
                vertical-align:middle;
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
            
            .my-radio-checked{
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