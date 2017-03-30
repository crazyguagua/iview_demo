<template>
    <div class="my-select" :class="[{'my-select-open':isOpen}]" @click="open" v-clickoutside="handleClose">
        <div class="my-select-selection">
            <div class="my-select-selection-render">
            </div>
            <span class="arrow">
                <i class="iconfont icon-arrow-down"></i>
            </span>
           <input ref="reference" type="text" placeholder="请选择" readonly="readonly" autocomplete="off" class="input-inner">
        </div>
        <transition>
              <select-drop-down v-if="isOpen"  ref="popper">
                    <scrollBar  tag="ul">
                        <div>1232131321321312 <br>eeweeqweqwwq <br></div>
                
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
                isOpen:false
            }
        },
        methods:{
            open(){
                this.isOpen = !this.isOpen;
            },
            handleClose(){
                this.isOpen = false;
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
                width: 80%;
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