<template>
    <div class="dashboard">
        <ContentHeader :title="title" >
             <BreadCrumb slot="breadcrumb">
                <BreadCrumbItem :to="{path:'/'}">首页</BreadCrumbItem>
                <BreadCrumbItem>用户管理</BreadCrumbItem>
            </BreadCrumb>
        </ContentHeader>
        <div class="right-content-container">
            <div class="fixed-toolbar clearfix" slot="toolbar">
                    <div class="pull-left search">
                    <my-button @click="btnClk(1)" type="purple" size="large">新增</my-button>
                    <input  class="form-control"type="text" placeholder="用户名"/>
                    <my-button @click="btnClk(2)" type="primary" size="large">查询</my-button>
                    </div>
                   <!-- <div class="pull-left search">
                   <CheckBoxGroup v-model="checkedList">
                        <CheckBox val="1" >启用</CheckBox> 
                        <CheckBox val="2" >禁用</CheckBox> 
                        <CheckBox val="3" checked disabled>disabled</CheckBox>
                   </CheckBoxGroup>
                          
                    </div>-->
                   
                </div>
            <Grid :columns="columns" border  :data="data1" highlightRow @on-selection-change="getSelection" >
                
            </Grid>
            <Page :total="page.totalItems" :page-size="pageInfo.pageSize" :current="pageInfo.currentPage"
             show-total
             @on-page-change="reload" jump show-sizer></Page>
        </div>
       
    </div>
</template>
<script>
    import ContentHeader from '../../components/ContentHeader';
    import {Grid} from '../../components/ui/grid';
    import {myButton} from '../../components/ui/button';
    import {Page} from '../../components/ui/page'
    import {
        BreadCrumb,
        BreadCrumbItem
    } from '../../components/ui/breadcrumb'
    import {CheckBoxGroup,CheckBox} from '../../components/ui/checkbox'
    // import loadingBar from '../../components/ui/loading'
    // console.log(loadingBar);
    // loadingBar.create();
    export default {
        data() {
            return {
                title: '用户管理',
                page:{
                    
                },
                pageInfo:{
                    pageSize:5,
                    currentPage:1
                },
                data1:[],
                checked:['0','1'],
                checkedList:[],
                columns:[{
                    type:'selection',
                    width:60,
                },{
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
                    key:'createTime',
                    render(row,column,index){
                        return "{{row[column.key]|dateformat}}"
                    }
                },{
                    title:'操作',
                    key:'op',
                    render (row, column, index) {
        
                        return `<button  class="btn  btn-warning  btn-small">修改</button>
                        <button  class="btn  btn-danger  btn-small">删除</button>`;
                    }
                }]
            }
        },
        components: {
            ContentHeader,
            BreadCrumb,
            BreadCrumbItem,
            Grid,
            myButton,
            CheckBoxGroup,
            CheckBox,Page
        },
        methods:{
            btnClk:function(index){
               
            },
            load(page){
               let self = this;
               this.$http.post('api', {
                   	"pageInfo":{
                        "currentPage":page.currentPage||this.pageInfo.currentPage,
                        "limit":page.pageSize||this.pageInfo.pageSize
                    }
               }).then(function(m) {
                    let data = m.data;
                    if (data.retCode == 1) {
                        self.data1 = data.obj.list;
                        self.page = data.obj.pageInfo;
                    } else {
                        
                    }
                }).catch(function(error) {
                    console.error(error);
                    // _this.errorMsg = "网络异常，登陆失败！"
                })
            },
            getSelection(){
                console.log(arguments)
            },
              reload(page){
                this.load(page);
            }
        },
      
        mounted(){
            this.load(this.pageInfo);
        }
    }
</script>
<style lang="less">

</style>