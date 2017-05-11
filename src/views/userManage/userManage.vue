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
                    <el-form-item label="审批人">
                        <el-input v-model="searchForm.user" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <el-select v-model="searchForm.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item><el-form-item>
                        <el-button type="primary" @click="query">查询</el-button>
                    </el-form-item>
                </el-form>
                   
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
                title: '用户管理',
                page:{
                    
                },
                userName:null,
                modalShow:false,
                pageInfo:{
                    pageSize:5,
                    currentPage:1
                },
                searchForm:{

                },
                formData:{
                    //这个对象必须要有默认值，否则form组件 清空清不掉 
                    email:'',userName:'',desc:'',repwd:''
                },
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
            CheckBox,Page,MyModal,MyForm,MyFormItem,MyInput,Radio
        },
        methods:{
            addUser:function(index){
               this.modalShow = true;
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
            }
        },
      
        mounted(){
            this.load(this.pageInfo);
        }
    }
</script>
<style lang="less">

</style>