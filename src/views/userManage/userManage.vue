<template>
    <div class="dashboard">
        <ContentHeader :title="title" >
             <BreadCrumb slot="breadcrumb">
                <BreadCrumbItem :to="{path:'/'}">首页</BreadCrumbItem>
                <BreadCrumbItem>用户管理</BreadCrumbItem>
            </BreadCrumb>
        </ContentHeader>
        <div class="container">
            <div class="fixed-toolbar clearfix" slot="toolbar">
                    <div class="pull-left search">
                    <my-button @click="btnClk(1)" type="purple" size="large">新增</my-button>
                    <input  class="form-control"type="text" placeholder="用户名"/>
                    <my-button @click="btnClk(2)" type="primary" size="large">查询</my-button>
                    </div>
                    <div class="pull-left search">
                   <CheckBoxGroup v-model="checked">
                        <CheckBox val="0">启用</CheckBox> 
                        <CheckBox val="1">禁用</CheckBox> 
                        <CheckBox  val="2" >disabled</CheckBox>
                   </CheckBoxGroup>
                          
                    </div>
                   
                </div>
            <Grid :columns="columns" border  :data="data1" highlightRow>
                
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
    import {CheckBoxGroup,CheckBox} from '../../components/ui/checkbox'
    export default {
        data() {
            return {
                title: '用户管理',
                data1:[],
                checked:['0','1'],
                columns:[{
                    type:'index',
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
            CheckBox
        },
        methods:{
            btnClk:function(index){
               
            },
            load(){
               let self = this;
               this.$http.post('api', {
                   	"pageInfo":{
                        "currentPage":"1",
                        "limit":"8"
                    }
               }).then(function(m) {
                    let data = m.data;
                    if (data.retCode == 1) {
                        self.data1 = data.obj.list;
                    } else {
                        
                    }
                }).catch(function(error) {
                    console.error(error);
                    // _this.errorMsg = "网络异常，登陆失败！"
                })
            }
        },
        mounted(){
            this.load();
        }
    }
</script>
<style lang="less">

</style>