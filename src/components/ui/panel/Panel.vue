<template>
    <div class="my-panel">
        <div class="header">
            <div class="header-title">
                <h4>{{title}}</h4>
            </div>
            <div class="dock-item">
                <ul class="tools">
                    <li><a href="javascript:void(0)"><i></i><span></span></a></li>
                    <li><a href="javascript:void(0)"><i></i><span></span></a></li>
                    <li><a href="javascript:void(0)"><i></i><span></span></a></li>
                </ul>
            </div>
        </div>
        <div class="body">
            
        </div>
    </div>
</template>

<script>
 export default{
     props:{
         title:{
             type:String,
              required: true
         }
     }
 }
</script>
<style lang="less">
    .my-panel {
        border: 1px solid #e1e6ef;
        margin-bottom: 20px;
        & .header{
                padding: 10px 15px;
                border-bottom: 1px solid transparent;
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
                position:relative;
                &:before{
                    content:'';
                    position:absolute;
                    left:0;
                    top:0;
                    border:5px solid transparent;
                    border-top:5px solid #37a000;
                    border-left:5px solid #37a000;
                    
                }
        }
    }
</style>