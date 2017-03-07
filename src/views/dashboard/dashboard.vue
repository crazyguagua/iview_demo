<template>
    <div class="dashboard">
        <ContentHeader :title="title" >
             <BreadCrumb slot="breadcrumb">
                <BreadCrumbItem :to="{path:'/'}">首页</BreadCrumbItem>
                <BreadCrumbItem>我的工作台</BreadCrumbItem>
            </BreadCrumb>
        </ContentHeader>
        <div>
            <my-row>
             <my-col>1</my-col>
              <my-col>2</my-col>
               <my-col>3</my-col>
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

</style>