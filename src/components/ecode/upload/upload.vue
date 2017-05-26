<template>

    <div class="ecode-upload">
       <slot><el-button :type="theme" :icon="icon" @click="handleClick()">{{text}}</el-button></slot>
            <div :style="imgListStyle" class="imgList">
                <li v-for="file in files">
                    <a>
                         <i class="el-icon-document"></i>{{file.name}}
                         <i class="el-icon-close" @click="removeImage(file)"></i>
                    </a>
                </li>
            </div>
        <input type="file" ref="file" class="ecode-upload-file" @change="handleChange">
    </div>

</template>

<script>
    export default{
        name:'EcodeUpload',
        props:{
            disabled:{
                default:false,
                type:Boolean
            },
            single:{
                default:true,
                type:Boolean
            },
            text:String, //上传按钮文字
            icon:{
                type:String,
                default:'plus'
            },
            theme:{
                type:String,
                default:'primary' //按钮样式
            },
            justBase64:{
                type:Boolean,
                default:true  //v-model绑定的值是否只是base64字符串，而不是data:image/png;base64,
            }
        },
        data(){
            return {
                files:[]
            }
        },
        computed:{
            imgListStyle(){
                return {
                    display:this.single?'inline-block':'block'
                }
            }
        },
        methods:{
            //点击button触发file input 选择事件
            handleClick(){
                if(!this.disabled){
                    this.$refs.file.click();
                }
            },
            //选中文件后触发
            handleChange(ev){
                const files = ev.target.files;
                if (!files) return;
                const _this = this;
                if(this.single){
                    let output = [];  
       
                    for(let i = 0, f; f = files[i]; i++) {  
                        output.push({name:f.name,type:f.type,size:f.size});
                        if(f.type.indexOf('image') != -1) { // 非常简单的交验
                             let reader = new FileReader();
                            reader.onload = function(e) {
                                let base64 = e.target.result;
                                // console.log(base64);
                                //
                                if(_this.justBase64){
                                    base64 = base64.replace(/^data:image\/.+;base64,/,"")
                                }
                                _this.$emit('input',base64); //双向绑定
                            };
                            // 当图像文件加载后,转换成一个data:URL,传递到onload回调函数中
                            reader.readAsDataURL(f); 
                            

                        }
                       
                    }  
                    this.files = output;
                }
                this.$refs.file.value = null;
            },
            //删除文件触发
            removeImage(file){
                this.files.splice(this.files.indexOf(file),1);
            }
        }
    }
</script>

<style lang="less">
    .ecode-upload{
        margin:5px 0;
        .ecode-upload-file{
            display:none;
        }
        .imgList{
            margin-top:10px;
            li{
                line-height:1.2;
            }
        }
    }
    
</style>