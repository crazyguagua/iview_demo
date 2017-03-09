<template>
    <div class="dashboard">
        <ContentHeader :title="title" >
             <BreadCrumb slot="breadcrumb">
                <BreadCrumbItem :to="{path:'/'}">首页</BreadCrumbItem>
                <BreadCrumbItem>用户管理</BreadCrumbItem>
            </BreadCrumb>
        </ContentHeader>
        <div class="container">
            <Grid>
                <div class="fixed-toolbar clearfix" slot="toolbar">
                    <div class="pull-left search">
                    <input  class="form-control"type="text" placeholder="用户名"/>
                    </div>
                </div>
            </Grid>
        </div>
       
    </div>
</template>
<script>
    import ContentHeader from '../../components/ContentHeader';
    import {Grid} from '../../components/ui/grid';

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
            BreadCrumbItem,
            Grid
        }
    }
</script>
<style lang="less">

</style>