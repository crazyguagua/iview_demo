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
                    <my-button @click="addUser()" type="purple" size="large">新增</my-button>
                    <input  class="form-control"type="text" v-model="userName" placeholder="用户名"/>
                    <my-button @click="query" type="primary" size="large">查询</my-button>
                    </div>
                   <!-- <div class="pull-left search">
                   <CheckBoxGroup v-model="checkedList">
                        <CheckBox val="1" >启用</CheckBox> 
                        <CheckBox val="2" >禁用</CheckBox> 
                        <CheckBox val="3" checked disabled>disabled</CheckBox>
                   </CheckBoxGroup>
                          
                    </div>-->
                   
            </div>
           
             <my-modal v-model="showUserModal"  title="新增用户" size="small" >
                <div slot="body">
                    <my-form ref="userForm" :label-width="100" label-position="top" :model="formData" :rules="userRule">
                        <my-form-item label="用户名" item-key="userName"> 
                             <my-input placeholder="请输入用户名"   v-model="formData.userName" icon="icon-pen_1" >
                                <!--<span slot="prepend">http://</span>
                                <span slot="after">.com</span>-->
                             </my-input>
                             
                        </my-form-item>
                         <my-form-item label="邮箱" item-key="email"> 
                             <my-input placeholder="请输入邮箱"   v-model="formData.email"  >
                                <!--<span slot="prepend">http://</span>
                                <span slot="after">.com</span>-->
                             </my-input>
                             
                        </my-form-item>
                        <my-form-item label="描述" item-key="desc">
                            <my-input placeholder="请输入描述"  size="large" v-model="formData.desc" type="textarea" :rows="10" :autosize="{minRows: 2,maxRows: 5}"></my-input>
                        </my-form-item>
                    </my-form>
                </div>
                <div slot='footer'>
                    <my-button type="primary" @click="saveUser">保存</my-button>
                    <my-button @click="reset">重置</my-button>
                </div>
            </my-modal>
            
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
    import {MyModal} from '../../components/ui/modal'
    import {MyForm,MyFormItem} from '../../components/ui/form'
    import MyInput from '../../components/ui/input'
    // import loadingBar from '../../components/ui/loading'
    // console.log(loadingBar);
    // loadingBar.create();
    export default {
        data() {
            return {
                title: '用户管理',
                page:{
                    
                },
                userName:null,
                showUserModal:false,
                pageInfo:{
                    pageSize:5,
                    currentPage:1
                },
                formData:{email:'xxx@11.com'},
                data1:[],
                userRule:{
                        //用户校验规则
                        userName:[ { min: 3, max: 5, message: '用户名长度在 3 到 5 个字符', trigger: 'blur' }],
                         email: [
                            { required: true, message: '邮箱不能为空', trigger: 'blur' },
                            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                        ]
                },
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
            CheckBox,Page,MyModal,MyForm,MyFormItem,MyInput
        },
        methods:{
            addUser:function(index){
               this.showUserModal = true;
            },
            saveUser:function(){
                alert('save');
            },
            query:function(){
                this.load(this.pageInfo);
            },
            reset(){
                this.$refs['userForm'].reset();
            },
            load(page){
               let self = this;
               this.$http.post('api', {
                    "userName":this.userName,
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