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
                type:[Number,String],
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
                show:false,
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
                    style.backgroundColor=this.color;
                }
                if(this.failedColor!=='error'&& this.status==='error'){
                     style.backgroundColor=this.failedColor;
                }
                return style;
            }
        },
        methods:{
            updateStatus(config){
                //这里只能用in 判断，如果用 config。show不能判断show为false的情况
               if('percentage' in config)this.percentage = config.percentage;
               if('status' in config)this.status=config.status;
               if('show' in config)this.show = config.show;
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
            &-failed-color{
                background:#f5601e;
            }
        }
    }
</style>