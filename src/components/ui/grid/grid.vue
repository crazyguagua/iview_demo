<template>
    <div :class="wrapperCls" :style="styles">
     <div :class="gridCls">
          <div :class="slotCls" ref="title">
             <slot name="toolbar"></slot>
         </div>
        <div :class="headerCls" ref="header">
                <TableHeader :columns="clonedColumns" v-if="showHeader"  :styleObj="tableStyle" :prefix="prefix">
                </TableHeader>
        </div>
        <div :class="[prefix+'-body']" :style="bodyStyle" ref="body" v-if="!((nodataText && data.length==0) ||(noFilteredDataText&& rebuildData.length==0))">
            <TableBody :styleObj="tableStyle" :prefix="prefix" :data="data" :columns="clonedColumns">
            </TableBody>
        </div>
        <div :class="[prefix+'-nodata']" v-if="((nodataText && data.length==0) ||(noFilteredDataText&& rebuildData.length==0))">
            <table cellspacing="0" cellpadding="0" border="0">
             <tr>
                 <td :style="{'height':bodyStyle.height}">
                    <span v-html="nodataText" v-if="data.length==0"></span>
                     <span v-html="noFilteredDataText" v-if="data.length>0&&rebuildData.length==0"></span>
                 </td>
             </tr>
            </table>
        </div>
     </div>
      
       
       
    </div>
</template>
<script>
    import TableHeader from './tableHeader'
     import TableBody from './tableBody'
    import {oneOf,getStyle,getScrollBarSize,deepCopy} from '../../util/uiTool'
    const  prefix= 'grid'
    export default{
        props:{
            data:{
                type:Array,
               default(){
                   return [];
               }
            },
            
            showHeader:{
                type:Boolean,
                default:true
            },
            styleObj:Object,
            columns:Array,
            height:{
                type:[Number,String]
            },
            width:{
                type:[Number,String]
            },
           
            //没有数据时候的文字或html
            nodataText:{
                type:String,
                default:'未查询到数据'
            },
            noFilteredDataText :{
                 type:String,
                default:'暂无筛选结果'
            },
            //column render 上下文
            content:Object
        },
        components:{
            TableHeader,TableBody
        },
        data(){
            return{
                 tableWidth: 0,
                bodyHeight:0,
                bodyRealHeight: 0,
                prefix:prefix,
                scrollBarWidth: getScrollBarSize(),
                 //排序和过滤用到的
                rebuildData :[],
                clonedColumns:this.copyColumns()

            }
            
        },
        computed:{
            wrapperCls(){
                return [
                     `${prefix}-wrapper`,
                ]
            },
             slotCls(){
                return [`${prefix}-slot`]
            },
            headerCls(){
                return [`${prefix}-header`]
            },
            gridCls(){
                return [`${prefix}`]
            },
            styles(){

               let style = {};
                if (this.height) {
                    const height = (this.isLeftFixed || this.isRightFixed) ? parseInt(this.height) + this.scrollBarWidth : parseInt(this.height);
                    style.height = `${height}px`;
                }
                if (this.width) style.width = `${this.width}px`;
                return style;
            },
            tableStyle(){
               
                 let style = {};
                if (this.tableWidth !== 0) {
                    let width = '';
                    if (this.bodyHeight === 0) {
                        width = this.tableWidth;
                    } else {
                        if (this.bodyHeight > this.bodyRealHeight) {
                            width = this.tableWidth;
                        } else {
                            width = this.tableWidth - this.scrollBarWidth;
                        }
                    }
//                    const width = this.bodyHeight === 0 ? this.tableWidth : this.tableWidth - this.scrollBarWidth;
                    style.width = `${width}px`;
                }
                return style;
            },
            bodyStyle(){

                let style={};
                if(this.bodyHeight!==0){
                    let height = this.bodyHeight + this.scrollBarWidth;
                    style.height = `${height}px`
                }
                return style;
            },
            currentContent(){
                return this.content?this.content:this.$parent;
            }
        },
        //挂载后设置表格宽度
        mounted(){
            this.handleResize();
            this.fixHeader();
            window.addEventListener('resize',this.handleResize,false);
            this.copyData();
        },
        beforeDestroy(){
            window.removeEventListener('resize',this.handleResize,false)
        },
        methods:{
            handleResize(){
                this.$nextTick(()=>{
                   const allWidth =  !this.columns.some(cell => !cell.width);
                   //如果每列设置宽度
                   if(allWidth){
                       this.tableWidth =  this.columns.map(cell=>cell.width).reduce((a,b)=>a+b);
                   }else{
                       this.tableWidth = parseInt(getStyle(this.$el,'width'))-1
                   }
                })
            },
            //设置table body的高度
            fixHeader(){
                if(this.height){
                    this.$nextTick(()=>{
                      const titleHeight =   parseInt(getStyle(this.$refs.title,'height'))||0;
                      const headerHeight = parseInt(getStyle(this.$refs.header,'height'))||0;
                      this.bodyHeight = this.height - titleHeight-headerHeight;
                    })
                }else{
                    this.bodyHeight =0;
                }
            },
            copyData(){ 
               this.rebuildData =  deepCopy(this.data); 
            },
            copyColumns(){
                let clonedColumns = deepCopy(this.columns);
                clonedColumns.forEach((column,index)=>{
                    column._index = index;
                    column.index = index;
                    column._width = column.width?column.width:'';
                    column.sortType='normal';
                    column.filterVisible = false;
                    column.filtered = false;
                    column.filterChecked=[]
                })
                return clonedColumns;
            }
        },
        watch:{
            height(){
                this.fixHeader();
            }
        }

    }
</script>
<style lang="less">
        .grid-wrapper{
                position: relative;
                border: 1px solid #d7dde4;
                border-bottom: 0;
                border-right: 0;
        }
        .grid{
                width: inherit;
                height: 100%;
                max-width: 100%;
                overflow: hidden;
                color: #657180;
                font-size: 12px;
                background-color: #fff;
                box-sizing: border-box;
                &-body{
                    overflow:auto;
                }
                & table{
                        table-layout: fixed;
                }
                &-nodata td{
                    text-align:center;
                }
                &-nodata table{
                    width:100%;
                }
                & th,& td{
                     min-width: 0;
                    height: 48px;
                    box-sizing: border-box;
                    text-align: left;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                    border-bottom: 1px solid #e3e8ee;
                }
               
        }
        .grid:before{
            height:1px;
            width:100%;
            position:absolute;
            left:0;
            bottom:0;
        }
        .grid:after{
            width:1px;
            height:100%;
            position:absolute;
            right:0;
            top:0;
        }
        .grid:before,.grid:after{
            background-color: #d7dde4;
             content:'';
        }
       
</style>