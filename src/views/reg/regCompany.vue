<template>
    <div class="reg-wrapper">
         <div class="breadcrumb-wrapper">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/reg/select' }">公司类型</el-breadcrumb-item>
                    <el-breadcrumb-item>注册</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
          <div class="reg-form">
            <h2>填写基本信息</h2>
            <div class="form-content">
                <el-form ref="regForm" :model="formData" :rules="rules" label-width="100px" label-position="left" required>
                <el-form-item label="邮箱" required prop="email">
                    <el-input v-model="formData.email" type="email"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" required prop="contactTel">
                   <el-input v-model="formData.contactTel" type="text"></el-input>
                </el-form-item>
                <el-form-item label="联系人" required prop="contactMan">
               
                        <el-input v-model="formData.contactMan"></el-input>
                    
                  
                </el-form-item>
                <el-form-item label="公司名称" required prop="orgName">
                   
                        <el-input v-model="formData.orgName"></el-input>
                   
                </el-form-item>
                <el-form-item label="公司简称" required prop="orgShortName">
                        <el-input v-model="formData.orgShortName"></el-input>
                </el-form-item>
                <el-form-item label="公司材料" required prop="yyzzFileBase64">
                    <ecode-upload text="营业执照" v-model="formData.yyzzFileBase64">
                        
                    </ecode-upload>
                    <ecode-upload text="组织机构代码证" v-model="formData.zzjgdmzFileBase64">
                        
                    </ecode-upload>
                    <ecode-upload text="税务登记证" v-model="formData.swdjzFileBase64">
                        
                    </ecode-upload>
                </el-form-item>
               <el-form-item label="验证码" required prop="verifyCode">
                    
                        <input v-model="formData.verifyCode" type="text" class="form-control " name="pwd" placeholder="" style="">
                        <img :src="codeSrc" alt="" class="validate-code" v-if="formData.requestId!==''" @click="getValidateCode" >
                
               </el-form-item>
                    <el-button type="primary" @click="onSubmit('regForm')" style="width:100%;margin-left:0;">立即注册</el-button>
           
                </el-form>
            
            </div>
            
          </div>  
    </div>
</template>

<script>
  import EcodeUpload from '../../components/ecode/upload'
  export default {
    components:{
        EcodeUpload
    },
    data() {
      return {
        formData: {
          email: '',
          contactMan: '',
          contactTel: '',
          orgName: '',
          orgShortName: '',
          type:this.$route.params.type,
          yyzzFileBase64:[],
          requestId:''
        },
       validateCode:'',
        rules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'change' },
            { type:'email', message: '邮箱格式错误', trigger: 'change' }
          ],
          contactMan: [
            { required: true, message: '请输入联系人', trigger: 'change' }
          ],
          contactTel: [
            {  required: true, message: '请输入联系人电话', trigger: 'change' }
          ],
          orgName: [
            { required: true, message: '请输入公司名称', trigger: 'change' }
          ],
          orgShortName: [
            { required: true, message: '请输入公司简称', trigger: 'change' }
          ],
          verifyCode:[{
              required:true,message:'请输入验证码',trigger:'change'
          }]
        }
      
      }
    },
    mounted() {
            //获取验证码 
            this.getValidateCode();
    },
    computed:{
            codeSrc(){
                return 'data:image/png;base64,'+this.validateCode;
            }
    },
    methods: {
      onSubmit(formName) {
          
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this;
            this.$http.post('service/api',  {"cmd" : "orgRegist" ,params:this.formData}).then(function(m) {
                    let data = m.data;
                    if (data.retCode !== 1) {
                        // _this.errorMsg = data.retMsg;
                        // _this.type = 'warning'
                        this.$message.error(data.retMsg);
                    }else{
                        //调到结果页面
                        _this.$router.push('/success');
                    } 
            }).catch(function(error) {
               this.$message.error('网络异常');
            })
          } else {
            return false;
          }
        });
      },
      getValidateCode(){
            let _this = this;
            this.$http.post('service/api',  {"cmd" : "fetchVerifyCode" }).then(function(m) {
                    let data = m.data;
                    if (data.retCode !== 1) {
                        _this.errorMsg = data.retMsg;
                        _this.type = 'warning'
                    }else{
                     
                      _this.formData.requestId = data.requestId;
                        _this.validateCode=data.verifyCodeBase64;
                    } 
            }).catch(function(error) {
                _this.errorMsg = "网络异常，登陆失败！"
            })
        }
    }
  }
</script>
<style lang="less">
    .reg-wrapper{
        background:#fff;
    }
    .reg-form{
        h2{
            height:55px;
            border-bottom:1px solid #dee5e7;
            line-height:55px;
            font-size:20px;
            padding-left:20px;
            font-weight:300;
        }
        .form-content{
            padding:20px;
        }
        .validate-code{
            position:absolute;
            right:3px;
            top:3px;
            cursor:pointer;
        }
    }
</style>