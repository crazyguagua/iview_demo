<template>
    <div>
         <div class="breadcrumb-wrapper">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>注册</el-breadcrumb-item>
                    
                </el-breadcrumb>
            </div>
            <div class="choose-type">
                <h2>选择公司类型</h2>

                <div class="image-boxes clearfix">
                
                    <div class="image-box">
                        <router-link to="/reg/select/1"><a ><img src="../../assets/images/insurance.png"></img></a></router-link>
                        </br>
                        <span>保险公司</span>
                    </div>
                     <div class="image-box">
                        <router-link to="/reg/select/2"><a ><img src="../../assets/images/rescue.png"></img></a></router-link>
                        </br>
                        <span>救援公司</span>
                    </div>
                </div>
            </div> 
    </div>
    
</template>