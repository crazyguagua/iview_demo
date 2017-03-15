<template>
    <div :class="classes" ref="cell">
       <span v-html="row[column.key]"></span>
        <template >
        </template>
    </div>
</template>
<script>
import Vue from 'vue';
    export default{

        props:{
            prefix:String,
            column:{
                type:Object,
                default:{}
            },
            row:{
                type:Object,
                default:{}
            },
            naturalIndex: Number, 
            index:Number
        },
        data(){
            return{
                content:this.$parent.$parent.currentContent
            }
        },
        computed:{
            classes(){
                return [`${this.prefix}-cell`]
            },
            renderType(){
                let renderType='';
                if(this.column.type == 'index'){
                    renderType = 'index'
                }else if(this.column.type =='selection'){
                    //checkbox
                    renderType = 'selection'
                }
                else if(typeof this.column.render == "function"){
                    renderType ='render'
                }else{
                    renderType ='normal'
                }
                return renderType;
            }
        },
        methods:{
            compile(){
               //编译自定义cell
               let self = this;
                if(this.column.render){
                    //编译上下文
                    const $parent = this.content;
                    const tpl = this.column.render(this.row,this.column,this.index);
                    let div = document.createElement('div');
                    div.innerHTML = tpl;
                    this.$el.innerHTML ='';
                    //拷贝上下问的method
                    let methods={};
                    Object.keys($parent).forEach(key=>{
                        const fn = $parent[key];
                        if(typeof fn == 'function' && fn.name=='boundFn'){
                            methods[key] = fn;
                        }
                    });
                    // console.log(method);
                    let res = Vue.compile(div.outerHTML);
                   const component =  new Vue({
                        render:res.render,
                        staticRenderFns:res.staticRenderFns,
                        methods:methods,
                        data(){
                            return{
                                column:self.column,
                                row:self.row
                            }
                        }
                    })
                   
                    console.log('===================');
                    
                    const cell = component.$mount();
                    console.log(cell)
                    this.$refs.cell.appendChild(cell.$el)
                }
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.compile();
            })
        }
    }
</script>
<style lang="less">
    .grid-cell{
        padding-left: 18px;
        padding-right: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        box-sizing: border-box;
    }
    
</style>