<template>
    <div class="dashboard">
        <ContentHeader :title="title" >
             <BreadCrumb slot="breadcrumb">
                <BreadCrumbItem :to="{path:'/'}">首页</BreadCrumbItem>
                <BreadCrumbItem>人员帐号管理</BreadCrumbItem>
            </BreadCrumb>
        </ContentHeader>
        <div class="right-content-container">
            <div class="fixed-toolbar clearfix" slot="toolbar">
                    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                        
                        <el-form-item label="所属部门"  >
                            <el-popover
                                ref="popover"
                                placement="bottom-start"
                                width="400"
                                trigger="click">
                                <el-tree 
                                    :data="regions"
                                    :props="props"
                                    :load="loadNode"
                                    lazy
                                    show-checkbox
                                    >
                                </el-tree>
                            </el-popover>
                            <el-input   v-popover:popover readonly v-model="searchForm.dept" :on-icon-click="showTree" icon="search"></el-input>
                        </el-form-item>
                        <el-form-item label="人员姓名">
                            <el-input v-model="searchForm.userName" placeholder="人员姓名"></el-input>
                        </el-form-item>
                         <el-form-item label="角色">
                             <el-select v-model="searchForm.roles" placeholder="角色">
                                <el-option :label="role.label" :value="role.value" v-for="role in roles"></el-option>
                            </el-select>
                         </el-form-select>
                        
                        <el-form-item>
                            <el-button type="primary" @click="query">查询</el-button>
                        </el-form-item>
                    </el-form>
                
                   
            </div>
           
            
            <div class="my-grid-toolbar">
                <span class="grid-title">人员帐号列表</span>
                <div class="btn-wrapper">
                    <el-button type="success" icon="plus">新增</el-button>
                </div>
            </div>
           <el-table
                :data="data1"
                border
                style="width: 100%">
                 <el-table-column
                prop="userName"
                label="帐号"
                >
                </el-table-column>
                <el-table-column
                prop="realName"
                label="姓名"
                >
                </el-table-column>
                 <el-table-column
                prop="email"
                label="邮箱"
                >
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建时间" >
                </el-table-column>
                <el-table-column
                    label="操作"
                    >
                    <template scope="scope">
                     <el-button @click="handleClick" type="text" size="small">修改</el-button>
                      <el-button @click="handleClick" type="text" size="small">删除</el-button>
                       <el-button @click="handleClick" type="text" size="small">禁用</el-button>
                        <el-button @click="handleClick" type="text" size="small">授权</el-button>
                        <el-button @click="handleClick" type="text" size="small">重置密码</el-button>
                      
                    </template>
                </el-table-column>
            </el-table>
            <div class="pageWrapper">
                <el-pagination
                @size-change="reload"
                @current-change="reload"
                :current-page="pageInfo.currentPage"
                :page-sizes="[10,20,30,40]"
                :page-size="pageInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="data1.length">
                </el-pagination>
            </div>
                
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
    //message 消息提示 组件
    import message from '../../components/ui/message';
    import {Radio,RadioGroup} from '../../components/ui/radio'
    // import loadingBar from '../../components/ui/loading'
    // console.log(loadingBar);
    // loadingBar.create();
    export default {
        data() {
            let _this = this;
            const validatorrepwd= function (rule, value, callback){
                if(value===""){
                        callback(new Error('请再次输入密码'));
                }else if(value!=_this.formData.pwd){
                        callback(new Error('两次输入密码不一致'));
                }else{
                    callback();
                }
            }
            const validatePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formData.repwd !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.userForm.validateField('repwd');
                    }
                    callback();
                }
            };
            return {
                title: '人员帐号管理',
                page:{
                    
                },
                userName:null,
                modalShow:false,
                pageInfo:{
                    pageSize:5,
                    currentPage:1
                },
                searchForm:{
                    userName:'',
                    dept:'',
                    roles:[]
                },
                roles:[
                    {value:0,label:'执勤民警'},
                     {value:1,label:'指挥室监管员'},
                      {value:2,label:'核算员'},
                       {value:3,label:'调度员'},
                        {value:4,label:'管理员'}
                ],
                formData:{
                    //这个对象必须要有默认值，否则form组件 清空清不掉 
                    email:'',userName:'',desc:'',repwd:''
                },
                showDeptTree:false,
                data1:[],
                userRule:{
                        //用户校验规则
                        userName:[ {required: true, min: 2, max: 12, message: '用户名长度在 2 到 12 个字符', trigger: 'blur' }],
                        email: [
                            { required: true, message: '邮箱不能为空', trigger: 'blur' },
                            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                        ],
                        repwd:[{
                            required: true,
                            trigger:'blur',
                            validator:validatorrepwd
                        }],
                        pwd:[{required:true,message:'密码不能为空',trigger:'blur'},{min:6,max:12, message: '密码长度在 6 到 12个字符', trigger: 'blur'},
                            {validator:validatePwd,trigger:'blur'}
                        ]
                },
                checked:['0','1'],
                checkedList:[],
                regions: [{
                    'name': 'region1'
                    }, {
                    'name': 'region2'
                }],
                props: {
                    label: 'name',
                    children: 'zones'
                },
                count: 1
               
            }
        },
        components: {
            ContentHeader,
            BreadCrumb,
            BreadCrumbItem,
            Grid,
            myButton,
            CheckBoxGroup,
            CheckBox,Page,MyModal,MyForm,MyFormItem,MyInput,Radio
        },
        methods:{
            addUser:function(index){
               this.modalShow = true;
            },
            showTree(){
                this.showDeptTree = true;
            },
            saveUser:function(){
                let _this = this;
                this.$refs['userForm'].validate((valid)=>{
                    if(valid){
                            this.$http.post('saveUser', this.formData).then(function(m) {
                                let data = m.data;
                                // console.log(data);
                                if(data.retCode === 1){
                                    _this.modalShow = false;
                                     _this.load(_this.pageInfo);
                                }
                            }).catch(function(error) {
                                console.error(error);
                            })
                    }
                })
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
                        message.info('操作成功');
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
            },
            handleClick(){

            },
            loadNode(node, resolve) {
                if (node.level === 0) {
                return resolve([{ name: 'region1' }, { name: 'region2' }]);
                }
                if (node.level > 3) return resolve([]);

                var hasChild;
                if (node.data.name === 'region1') {
                hasChild = true;
                } else if (node.data.name === 'region2') {
                hasChild = false;
                } else {
                hasChild = Math.random() > 0.5;
                }

                setTimeout(() => {
                var data;
                if (hasChild) {
                    data = [{
                    name: 'zone' + this.count++
                    }, {
                    name: 'zone' + this.count++
                    }];
                } else {
                    data = [];
                }

                resolve(data);
                }, 500);
            }
    
        },
      
        mounted(){
            this.load(this.pageInfo);
        }
    }
</script>
<style lang="less">
    .pageWrapper{
        padding:10px;
        float:right;
    }
    .my-grid-toolbar{
        background:#438EB9;
        height:45px;
        padding:0 10px;
        span.grid-title{
            line-height:45px;
            font-size:18px;
            color:#fff;
        }
        .btn-wrapper{
            float:right;
            line-height: 45px;
            box-sizing:border-box;
        }
    }
</style>