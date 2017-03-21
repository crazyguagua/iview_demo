<template>
    <transition name="fade">
    <div :class="classes" v-show="show" :style="outerStyles">
        <div :class="innerClasses" :style="styles">
        </div>
    </div>
    </transition>
</template>
<script>
    const prefix ='loading-bar'
    export default{
        props:{
            height:{
                type:Number,
                default:2
            },
            color:{
                type:String,
                default:'primary'
            },
            failedColor:{
                type:String,
                default:'error'
            }
        },
        data(){
            return{
                show:true,
                status:'success',
                //百分比
                percentage:10
            }
        },
        computed:{
            classes(){
                return [
                    `${prefix}`
                ]
            },
            outerStyles(){
                return {
                    'height':`${this.height}px`
                }
            },
            innerClasses(){
                return [
                    `${prefix}-inner`,{
                        [`${prefix}-inner-color-primary`]:this.color==='primary'&& this.status==='success',
                        [`${prefix}-inner-failed-color`]:this.failedColor === 'error' && this.status === 'error'
                    }
                ]
            },
            //计算百分比，自定义color
            styles(){
                let style={
                    width:`${this.percentage}%`,
                    height:`${this.height}px`
                }
                //如果是自定义颜色
                if(this.color!=='primary' && this.status==='success'){
                    this.style.background=this.color;
                }
                if(this.failedColor!=='error'&& this.status==='error'){
                     this.style.background=this.failedColor;
                }
                return style;
            }
        },
        methods:{
            update(){
                debugger;
                this.percentage+= Math.random()*3 ;
            }
        }
    }
</script>
<style lang="less">
    .loading-bar{
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 2000;
        &-inner{
            transition:width .2s linear;
            &-color-primary{
                background:#2a6aab;
            }
        }
    }
</style>