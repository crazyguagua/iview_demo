<template>
    <div class="dashboard">
        <ContentHeader :title="title" >
             <BreadCrumb slot="breadcrumb">
                <BreadCrumbItem :to="{path:'/'}">首页</BreadCrumbItem>
                <BreadCrumbItem>用户管理</BreadCrumbItem>
            </BreadCrumb>
        </ContentHeader>
        <div class="container">
            <Grid :columns="columns" :height="300" :data="data1">
                <div class="fixed-toolbar clearfix" slot="toolbar">
                    <div class="pull-left search">
                    <my-button @click.native="btnClk" type="success" size="large">新增</my-button>
                    <input  class="form-control"type="text" placeholder="用户名"/>
                    <my-button @click.native="btnClk" type="primary" size="large">查询</my-button>
                    </div>
                </div>
            </Grid>
        </div>
       
    </div>
</template>
<script>
    import ContentHeader from '../../components/ContentHeader';
    import {Grid} from '../../components/ui/grid';
    import {myButton} from '../../components/ui/button';
    import {
        BreadCrumb,
        BreadCrumbItem
    } from '../../components/ui/breadcrumb'
    export default {
        data() {
            return {
                title: '用户管理',
                data1:[{
                    userName:"coutinho",
                    realName:"库蒂尼奥",
                    gender:"男",
                    email:"coutinho@qq.com",
                    birth:"1990-02-12"
                },
                {
                    userName:"adam lanana",
                    realName:"拉拉纳",
                    gender:"男",
                    email:"lanana@qq.com",
                    birth:"1990-02-12"
                },
                {
                    userName:"giny wijnaldum",
                    realName:"维纳尔杜姆",
                    gender:"男",
                    email:"wijnaldum@qq.com",
                    birth:"1990-02-12"
                },{
                    userName:"emre can",
                    realName:"埃姆雷詹",
                    gender:"男",
                    email:"can@qq.com",
                    birth:"1990-02-12"
                },{
                    userName:"mane",
                    realName:"马内",
                    gender:"男",
                    email:"mane@qq.com",
                    birth:"1990-02-12"
                }],
                columns:[{
                    title:'用户名',
                    key:'userName'
                },{
                    title:'中文名',
                    key:'realName'
                },{
                    title:'性别',
                    key:'gender'
                },{
                    title:'邮箱',
                    key:'email'
                },
                {
                    title:'生日',
                    key:'birth'
                },{
                    title:'操作',
                    key:'op',
                    render (row, column, index) {
        
                        return `<my-button @click="btnClk(${index})" type="primary" size="large">修改</my-button>
                        `;
                    }
                }]
            }
        },
        components: {
            ContentHeader,
            BreadCrumb,
            BreadCrumbItem,
            Grid,
            myButton
        },
        methods:{
            btnClk:function(index){
                console.log(arguments);
            //    alert(index)
            }
        }
    }
</script>
<style lang="less">

</style>