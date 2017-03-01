<template>
    <div class="dashboard">
        <ContentHeader :title="title" >
             <BreadCrumb slot="breadcrumb">
                <BreadCrumbItem :to="{path:'/'}">首页</BreadCrumbItem>
                <BreadCrumbItem>用户管理</BreadCrumbItem>
            </BreadCrumb>
        </ContentHeader>
       
    </div>
</template>
<script>
    import ContentHeader from '../../components/ContentHeader';
    import {
        BreadCrumb,
        BreadCrumbItem
    } from '../../components/ui/breadcrumb'
    export default {
        data() {
            return {
                title: '用户管理'
            }
        },
        components: {
            ContentHeader,
            BreadCrumb,
            BreadCrumbItem
        }
    }
</script>
<style lang="less">

</style>