<template>
        <ul :class="ulCls">
            <span :class="[`${prefix}-total`]" v-if="showTotal">
                <slot>共{{total}}条</slot>
            </span>
            <li title="上一页":class="[`${prefix}-item-pre`,{[`${prefix}-item-disabled`]:currentPage==1}]" 
            @click="pagePre()">
             <a><i class="iconfont icon-arrow_left"></i></a>
            </li>
            <!--<li @click="goPage(num)" :title="num" v-for="num in pageCount" 
            :class="[liCls,{[`${prefix}-item-active`]:currentPage==num}]">
                <a>{{num}}</a>
            </li>-->
            <!--第一页永远都显示 -->
            <li title="1":class="[`${prefix}-item`,{[`${prefix}-item-active`]:currentPage==1}]" 
            @click="goPage(1)">
             <a>1</a>
            </li>
            <!--显示当前页的前两页 -->
            <!-- 显示前5页的按钮-->
            
            <!-- 向前5页按钮-->
            <li title="向前5页" :class="[`${prefix}-item`,`${prefix}-item-pre-jump`]"
             v-if="currentPage-5>=0"  @click="pre5Clk">
                <a><i class="iconfont icon-double29"></i></a>
               
            </li>
              <!--当前页上二页-->
            <li :title="currentPage-2":class="[`${prefix}-item`]" v-if="currentPage-2>1" 
                @click="goPage(currentPage-2)">
             <a>{{currentPage-2}}</a>
            </li>
             <!--当前页上一页-->
            <li :title="currentPage-1":class="[`${prefix}-item`]" v-if="currentPage-1>1"
                @click="goPage(currentPage-1)">
             <a>{{currentPage-1}}</a>
            </li>
             <!--当前页-->
            <li :title="currentPage":class="[`${prefix}-item`,`${prefix}-item-active`]" v-if="currentPage>1"
                @click="goPage(currentPage)">
             <a>{{currentPage}}</a>
            </li>
            
            <!--当前页下一页-->
             <li :title="currentPage+1":class="[`${prefix}-item`]" v-if="currentPage+1<pageCount"
                @click="goPage(currentPage+1)">
             <a>{{currentPage+1}}</a>
            </li>
             <!--当前页下二页-->
             <li :title="currentPage+2":class="[`${prefix}-item`]" v-if="currentPage+2<pageCount"
                @click="goPage(currentPage+2)">
             <a>{{currentPage+2}}</a>
            </li>
            
             <!-- 下5页按钮-->
            <li title="向后5页" :class="[`${prefix}-item`,`${prefix}-item-pre-jump`]" 
            v-if="currentPage+5<=pageCount"  @click="next5Clk">
                <a><i class="iconfont icon-double30"></i></a>
               
            </li>
            <!-- 最后一页 -->
            <li :title="currentPage+2":class="[`${prefix}-item`]" v-if="currentPage < pageCount"
               @click="goPage(pageCount)">
             <a>{{pageCount}}</a>
            </li>
            <li title="下一页" :class="[`${prefix}-item-next`,{[`${prefix}-item-disabled`]:currentPage==pageCount}]" @click="pageNext">
            <a><i class="iconfont icon-arrow_right"></i></a>
            </li>
            <li :class="[`${prefix}-jump`]" v-if="jump">
                  <span>跳至</span>
                    <input type="text" @keyup.enter="enterKeyPress">
                    <span>页</span>
            </li>
            <li :class="[`${prefix}-sizer`]" v-if="showSizer">
                <mySelect>
                    <myOption v-for="pageSize in pageSizers" :value="pageSize" :label="pageSize"></myOption>
                </mySelect>
            </li>
          
        </ul>
</template>
<script>
    const prefix='myPage'
    const reg_num=/^\d+$/;
    import {mySelect,myOption} from '../select'
    export default{
        name:'page',
        componentName:'page',
        components:{
            mySelect,
            myOption
        },
        props:{
            total:{
                type:Number,
                default:0
            },//总记录数
            current:{//当前页数
                type:Number,
                default:1
            },
            pageSize:{
                type:Number,
                default:10
            },
            showTotal:{
                type:Boolean,
                default:false
            },
            //显示页数下拉框
            showSizer:{
                type:Boolean,
                default:false
            },
            //直接跳转
            jump:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                prefix:prefix,
                currentPage:this.current,
                pageSizers:[10,20,30,40]
            }
        },
        computed:{
            ulCls(){
                return [`${prefix} clearfix`]
            },
            liCls(){
                return [`${prefix}-item`]
            },
            pageCount(){
                return Math.ceil(this.total/this.pageSize);
            }
        },
        methods:{
            //下一页
            pageNext(){
                if(this.currentPage == this.pageCount){
                    return false;
                }
                this.currentPage++;
                this.$emit('on-page-change',{
                    pageSize:this.pageSize,
                    currentPage:this.currentPage
                })
            },
            //上一页
            pagePre(){
                if(this.currentPage==1){
                    return false;
                }
                this.currentPage--;
                 this.$emit('on-page-change',{
                    pageSize:this.pageSize,
                    currentPage:this.currentPage
                })
            },
            //指定页
            goPage(page){
                if(this.currentPage!=page){
                    this.currentPage = page;
                    this.$emit('on-page-change',{
                        pageSize:this.pageSize,
                        currentPage:this.currentPage
                    })
                }
                
            },
            //向后5页
            next5Clk(){
               let cPage = this.currentPage+5;
                if(cPage>0){
                    this.goPage(cPage)
                }else{
                    this.goPage(1)
                }
            },
            //向前5页
            pre5Clk(){
                let cPage = this.currentPage-5;
                if(cPage>0){
                    this.goPage(cPage)
                }else{
                    this.goPage(1)
                }
                
            },
            //跳转输入框回车键事件
            enterKeyPress(evt){
                let val = evt.currentTarget.value;
                if(reg_num.test(val)&&val<=this.pageCount){
                    //如果是数字，直接跳转
                    this.goPage(parseInt(val))    
                }else{
                    evt.currentTarget.value = 1;
                }
            }
        }
    }
</script>
<style lang="less">
    .myPage{
        margin:5px 0;
        &-total{
            float:left;
            height:32px;
            line-height:32px;
            margin-right:8px;
        }
        &-item{
               height: 32px;
                margin-right: 4px;
                background-color: #fff;
                user-select: none;
                border: 1px solid #d7dde4;
                border-radius: 4px;
                &-active{
                      background-color: #39f;
                      border-color: #39f;
                }
                &-active a,&-active a:hover{
                      
                        color:#fff;
                }
        }
        &-sizer{
             float:left;
        }
        &-item:hover{
            border-color: #39f;
        }
        &-jump{
            height:32px;
            line-height:32px;
            float:left;
            margin-left:15px;
            margin-right:5px;
            min-width:32px;
            & input{
                    width:36px;
                    display:inline-block;
                    height: 24px;
                    line-height: 1.5;
                    padding: 4px 7px;
                    font-size: 12px;
                    border: 1px solid #d7dde4;
                    cursor: text;
                    transition: border .2s ease-in-out;
                    border-radius: 4px;
                    outline:none;
                    &:hover{
                            border-color: #5cadff;
                    }
                    &:focus{
                            border-color: #5cadff;
                            outline: 0;
                            box-shadow: 0 0 0 2px rgba(51,153,255,.2);
                    }
            }
        }
    
    }
    .myPage-item,.myPage-item-pre,.myPage-item-next{
        float:left;
        text-align:center;
        min-width: 32px;
        line-height: 32px;
        cursor: pointer;
        transition: all .2s ease-in-out;
        border: 1px solid #d7dde4;
        border-radius: 4px;
    }
    .myPage-item-pre,.myPage-item-next{
        background-color:#fff;
    }
    .myPage-item-pre{
        margin-right:8px;
    }
    .myPage-item-next{
        margin-left:8px;
    }
    .myPage-item-disabled{
        cursor:not-allowed;
        background-color: #fff;
        & a{
             color:#ccc;
        }
       
        &:hover{
            border-color: #d7dde4;
        }
    }
    .myPage-item-pre-jump:after,.myPage-item-next-jump:after{
            content: "•••";
            display: block;
            letter-spacing: 1px;
            color: rgb(204, 204, 204);
            text-align: center;
    }
    .myPage-item-pre-jump:hover:after,.myPage-item-next-jump:hover:after{
           display:none;
    }
    .myPage-item-pre-jump i,.myPage-item-next-jump i{
        display:none;
    }
    .myPage-item-pre-jump:hover i,.myPage-item-next-jump:hover i{
        display:block;
    }

</style>