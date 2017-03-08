<template>
    <div class="dashboard">
        <ContentHeader :title="title" >
             <BreadCrumb slot="breadcrumb">
                <BreadCrumbItem :to="{path:'/'}">首页</BreadCrumbItem>
                <BreadCrumbItem>我的工作台</BreadCrumbItem>
            </BreadCrumb>
        </ContentHeader>
       <div class="container">
             <my-row :gutter="20">
             <my-col :span="8"><div class="grid">1</div></my-col>
              <my-col :span="8"><div class="grid">1</div></my-col>
               <my-col :span="8"><div class="grid">1</div></my-col>
            </my-row>
            <my-row :gutter="20">
             <my-col :span="8"><div class="grid">8</div></my-col>
              <my-col :span="8"><div class="grid">8</div></my-col>
               <my-col :span="4"><div class="grid">4</div></my-col>
               <my-col :span="4"><div class="grid">4</div></my-col>
            </my-row>
             <my-row :gutter="20">
             <my-col :span="6" :offset="6" ><div class="grid">6 offset6</div></my-col>
             <my-col :span="6" :offset="6"><div class="grid">6 offset6</div></my-col>
            </my-row>
              <my-row >
             <my-col :span="3" :pull="2" :push="1" ><div class="grid">6 pull2 push1</div></my-col>
             <my-col :span="3" :pull="1" :push="2" ><div class="grid">6 pull1 push2</div></my-col>
            </my-row>
       </div>
           
        
    </div>
</template>
<script>
    import ContentHeader from '../../components/ContentHeader';
    import {
        myRow,
        myCol
    } from '../../components/ui/layout'
    import {
        BreadCrumb,
        BreadCrumbItem,
    } from '../../components/ui/breadcrumb'
    export default {
        data() {
            return {
                title: '我的工作台'
            }
        },
        components: {
            ContentHeader,
            BreadCrumb,
            BreadCrumbItem,
            myRow,
            myCol
        }
    }
</script>
<style lang="less">
    .grid {
        min-height: 34px;
        background: lightskyblue;
        text-align: center;
    }
</style>