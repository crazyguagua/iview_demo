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
            <li title="向前5页" :class="[`${prefix}-item`,`${prefix}-item-pre-jump`]" v-if="currentPage-2>1">
                <a><i class="iconfont icon-double29"></i></a>
            </li>
            <!-- 当前页-->
            <li :title="currentPage-2":class="[`${prefix}-item`]" v-if="currentPage-2>1" 
                @click="goPage(currentPage-2)">
             <a>{{currentPage-2}}</a>
            </li>
            <li :title="currentPage-1":class="[`${prefix}-item`]" v-if="currentPage-1>1"
                @click="goPage(currentPage-1)">
             <a>{{currentPage-1}}</a>
            </li>
            <li :title="currentPage":class="[`${prefix}-item`]" v-if="currentPage>1"
                @click="goPage(currentPage)">
             <a>{{currentPage}}</a>
            </li>
            
            <!--当前页向前一页-->
             <li :title="currentPage+1":class="[`${prefix}-item`]" v-if="currentPage+1<pageCount"
                @click="goPage(pageCount)">
             <a>{{currentPage+1}}</a>
            </li>
             <!--当前页向前二页-->
             <li :title="currentPage+2":class="[`${prefix}-item`]" v-if="currentPage+2<pageCount"
                @click="goPage(pageCount+2)">
             <a>{{currentPage+2}}</a>
            </li>
            
             <!-- 向后5页按钮-->
            <li title="向后5页" :class="[`${prefix}-item`,`${prefix}-item-pre-jump`]" v-if="currentPage+5<pageCount">
                <a><i class="iconfont icon-double30"></i></a>
            </li>
            <!-- 最后一页 -->
            <li :title="currentPage+2":class="[`${prefix}-item`]" v-if="currentPage < pageCount"
               >
             <a>{{pageCount}}</a>
            </li>
            <li title="下一页" :class="[`${prefix}-item-next`,{[`${prefix}-item-disabled`]:currentPage==pageCount}]" @click="pageNext">
            <a><i class="iconfont icon-arrow_right"></i></a>
            </li>
        </ul>
</template>
<script>
    const prefix='myPage'
    export default{
        name:'page',
        componentName:'page',
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
            }
        },
        data(){
            return {
                prefix:prefix,
                currentPage:this.current
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
                this.currentPage = page;
                 this.$emit('on-page-change',{
                    pageSize:this.pageSize,
                    currentPage:this.currentPage
                })
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
        &-item:hover{
            border-color: #39f;
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