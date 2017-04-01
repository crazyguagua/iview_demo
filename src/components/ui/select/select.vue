<template>
    <div class="my-select" :class="[{'my-select-open':isOpen}]" @click="open" v-clickoutside="handleClose">
        <div class="my-select-selection">
            <div class="my-select-selection-render">
            </div>
            <span class="arrow">
                <i class="iconfont icon-arrow-down"></i>
            </span>
           <input ref="reference" type="text" placeholder="请选择" readonly="readonly" autocomplete="off" 
           class="input-inner"
           :style="{ 'max-width': inputWidth - 42 + 'px'}"
           >
        </div>
        <transition>
              <select-drop-down v-if="isOpen"  ref="popper" :input-width="inputWidth">
                    <scrollBar  tag="ul">
                       <slot></slot>
                    </scrollBar>
                
              </select-drop-down>
        </transition>
    </div>
</template>
<script>
    import selectDropDown from './select-dropdown'
     import clickoutside from '../../../directives/clickoutside';
     import scrollBar from '../scrollbar'
    export default{
        name:'mySelect',
        componentName:'mySelect',
        components:{
            selectDropDown,
            scrollBar
        },
        directives: {
            clickoutside
        },
        data(){
            return{
                isOpen:false,//是否弹出
                hoverIndex:-1, //当前hover的索引，
                options:[],//保存子组件options的索引,
                inputWidth:0//输入框的宽度
            }
        },
        methods:{
            open(){
                this.isOpen = !this.isOpen;
            },
            handleClose(){
                this.isOpen = false;
            }
        },
        mounted(){
            //获得select组件输入框的宽度
           this.$nextTick(()=>{
                if(this.$refs.reference){
                     this.inputWidth = this.$refs.reference.getBoundingClientRect().width;
                }
           })
           
        },
        watch:{
            'inputWidth'(){
                // console.log(arguments);
            }
        }
    }
</script>
<style lang="less">
    .my-select{
            height:32px;
            line-height:32px;
            background-color: #fff;
            border-radius: 4px;
            border: 1px solid #d9d9d9;
        & .input-inner{
                background-color: #fff;
                background-image: none;
                border-radius: 4px;
                border: none;
                box-sizing: border-box;
                color: #1f2d3d;
                display: block;
                font-size: inherit;
                height: 30px;
                line-height: 1;
                outline: none;
                padding: 3px 10px;
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                width: 100%;
                position: relative;
        }
        &-open .arrow i:before{
            transform:rotate(180deg);
        }
        &:hover{
            border-color: #49a9ee;
        }
        &-selection{
                position: relative;
                cursor: pointer;
                width:100%;
                &-render{
                    margin:0 7px;
                    padding-right: 14px;
                }
        }
        & .arrow{
            text-align:center;
             top:50%;
              margin-top:-8px;
               right:5px;
             position:absolute;
        }
        & .arrow i:before{
            transition:transform .2s ease;
            line-height:18px;
            width:16px;
            height:16px;
            display:block;
        }
    }
</style>