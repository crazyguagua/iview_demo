<template>
<!-- label 不能有for="" 这样会导致点label 不触发input change事件-->
    <label  :class="[prefix]">
        <span :class="[prefix + '-input',{
            'is-focus':focus,
            'is-disabled':disabled,
            'is-checked':isChecked
        }]" >
            <span :class="[prefix + '-input-inner']"></span>
            <input v-if="trueVal||falseVal"
                :true-value="trueVal" :false-value="falseVal"
                 type="checkbox" :class="[prefix+'-input-origin']" @change="handleChange" :name="name"
                @focus="focus = true" @blur="focus = false"
                 :disabled="disabled"
                 v-model="model" 
                 :value="val"
             >
              <input v-else
                :value="val"
                :disabled="disabled"
                 type="checkbox" :class="[prefix+'-input-origin']" @change="handleChange" :name="name"
                @focus="focus = true" @blur="focus = false"
                 v-model="model" 
             >
        </span>
        <span :class="[prefix + '-label']" v-if="$slots.default || val">
            <slot></slot>
            <span v-if="!$slots.default">{{val}}</span>
        </span>
    </label>
</template>
<script>
    import emitter from '../../mixins/emitter.js'
    export default{
        name:'checkbox',
        mixins:[emitter],
        props:{
            disabled:Boolean,
            checked:Boolean,
            name:String,
            value:{},
            val:{},
            //选中时的值
            trueVal: [String, Number],
            //未选中时的值
            falseVal: [String, Number],
            //默认选中
            checked:Boolean
        },
        data(){
            return{
                prefix:'my-checkbox',
                focus:false,
                selfModel:false
            }
        },
        computed:{
            model:{
                get(){
                    return this.isGroup?this.store:(this.value!=undefined?this.value:this.selfModel)
                },
                set(val){
                    
                     if (this.isGroup) {
                        this.dispatch('checkboxGroup', 'input', [val]);
                    } else if (this.value !== undefined) {
                        this.$emit('input', val);
                        this.$emit('on-change',val)
                    } else {
                        this.selfModel = val;
                    }
                }
            },
            store(){
               
                return this._checkboxGroup?this._checkboxGroup.value:this.value
            },
            isGroup(){
                let $parent = this.$parent;
                while($parent){
                    if($parent.$options.name == 'checkboxGroup'){
                        this._checkboxGroup = $parent;
                        return true
                    }else{
                        $parent = $parent.$parent;
                    }
                }
                return false;
            },
            isChecked() {

                if ({}.toString.call(this.model) === '[object Boolean]') {
                return this.model;
                } else if (Array.isArray(this.model)) {
                return this.model.indexOf(this.val) > -1;
                } else if (this.model !== null && this.model !== undefined) {
                return this.model === this.trueLabel;
                }
            }
        },
        methods:{
            handleChange(evt){
                this.$emit('change', evt);
                if (this.isGroup) {
                this.$nextTick(_ => {
                    this.dispatch('checkboxGroup', 'change', [this._checkboxGroup.value]);
                });
                }
            },
            add2Store(){
                if(Array.isArray(this.model)&& this.model.indexOf(this.val) == -1){
                    this.model.push(this.val)
                }else{
                    this.model = this.trueLabel ||true
                }
            }
        },
        mounted(){
        },
        created(){
            this.checked&& this.add2Store()
        }
    }
</script>
<style lang="less">
        //如果后面有checkbox需要margin-left
        .my-checkbox+.my-checkbox{
            margin-left:15px;
        }
        .my-checkbox{
            color: #1f2d3d;
            position: relative;
            cursor: pointer;
            display: inline-block;
            white-space: nowrap;
            &-label{
                padding-left:5px;
            }
            &-input{
                white-space: nowrap;
                cursor: pointer;
                outline: none;
                display: inline-block;
                line-height: 1;
                position: relative;
                vertical-align: middle;
               
                &-inner{
                    display: inline-block;
                    position: relative;
                    border: 1px solid #bfcbd9;
                    border-radius: 4px;
                    box-sizing: border-box;
                    width: 18px;
                    height: 18px;
                    background-color: #fff;
                    z-index: 1;
                    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
                }
            }
            &-input.is-checked .my-checkbox-input-inner{
                    background-color: #20a0ff;
                    border-color: #0190fe;
                    
            }
            &-input .my-checkbox-input-inner:after{
                content:'';
                width: 3px;
                height: 7px;
                border: 2px solid #fff;
                border-left: 0;
                border-top: 0;
                position: absolute;
                right: 4px;
                top: 2px;
                transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
                transform-origin: center;
                transform: rotate(45deg) scaleY(0);
            }
            &-input.is-checked .my-checkbox-input-inner:after{
                transform: rotate(45deg) scaleY(1.2); 
            }
            &-input.is-focus .my-checkbox-input-inner{
                    border-color: #20a0ff;
            }
            &-input.is-disabled .my-checkbox-input-inner{
                    background-color: #d1dbe5;
                    border-color: #d1dbe5;
            }
           &-input.is-disabled .my-checkbox-input-inner:after{
               cursor:not-allowed;
               border-color:#fff;
           }
            &-input-origin{
                    opacity: 0;
                    outline: none;
                    position: absolute;
                    left:0;
                    top:0;
                    width:100%;
                    height:100%;
            }
        }
</style>