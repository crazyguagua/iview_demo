<template>
    <div :class="wrapperCls" :style="styles">
     <div :class="gridCls">
          <div :class="slotCls" ref="title">
             <slot name="toolbar"></slot>
         </div>
        <div :class="headerCls" ref="header">
                <TableHeader :obj-data="objData" 
                :columns="clonedColumns" :columns-width="columnsWidth" 
                v-if="showHeader" 
                 :styleObj="tableStyle" :prefix="prefix"
                  :columnsWidth="columnsWidth"  :data="rebuildData">
                </TableHeader>
        </div>
        <div :class="[prefix+'-body']" :style="bodyStyle" ref="body" v-if="!((nodataText && data.length==0) ||(noFilteredDataText&& rebuildData.length==0))">
            <TableBody :obj-data="objData" :columns-width="columnsWidth" :styleObj="tableStyle" :prefix="prefix" :data="rebuildData" :columns="clonedColumns">
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
    const  prefix= 'table'
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
            content:Object,
            //td,th默认不显示右边框
            border:{
                type:Boolean,
                default:false
            },
            //是否默认隔行变色
            stripe:{
                type:Boolean,
                default:false
            },
              //选中是否高亮
            highlightRow:{
                type:Boolean,
                default:false
            }
           
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
                clonedColumns:this.copyColumns(),
                 columnsWidth:{},
                 //保存每一列当前的状态用的数据
                 objData:{}

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
                return [`${prefix}`,{
                    [`${prefix}-border`]:this.border,
                    [`${prefix}-stripe`]:this.stripe
                }]
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

                   //设置每一列的宽度
                   this.$nextTick(()=>{
                       let columnsWidth ={};
                       let autoWidthIndex=-1;//默认都是自动宽度
                       if(allWidth) autoWidthIndex = this.clonedColumns.findIndex(column=> !column.width)
                       if(this.data.length>0){
                           const $td = this.$refs.body.querySelectorAll('tbody tr')[0].querySelectorAll('td');
                           for (let i = 0; i < $td.length; i++) {    // can not use forEach in Firefox
                                const column = this.clonedColumns[i];
                                let width = parseInt(getStyle($td[i], 'width'));
                                if (i === autoWidthIndex) {
                                    width = parseInt(getStyle($td[i], 'width')) - 1;
                                }
                                if (column.width) width = column.width;
                                this.clonedColumns[i]._width = width;
                                columnsWidth[column._index] = {
                                    width: width
                                };
                            }
                            this.columnsWidth = columnsWidth;
                       }
                   })
                   // get table real height,for fixed when set height prop,but height < table's height,show scrollBarWidth
                    this.bodyRealHeight = parseInt(getStyle(this.$refs.body, 'height'));
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
                let data =  deepCopy(this.data); 
                data.forEach((row,index)=>row._index = index);
                this.rebuildData = data;
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
            },
            //用于hover 选中，禁用，高亮
            makeObjData(){

                let data = {};
                this.data.forEach((row, index) => {
                    const newRow = deepCopy(row);// todo 直接替换
                    newRow._isHover = false;
                    if(newRow._disabled){
                        newRow._isDisabled = newRow._disabled;
                    }else{
                        newRow._isDisabled = false;
                    }
                    if (newRow._checked) {
                        newRow._isChecked = newRow._checked;
                    } else {
                        newRow._isChecked = false;
                    }
                    if (newRow._highlight) {
                        newRow._isHighlight = newRow._highlight;
                    } else {
                        newRow._isHighlight = false;
                    }
                    data[index] = newRow;
                });
                return data;
            },

            //移入移出
            handleMouseIn(_index){
                if(this.objData[_index]._isHover) return
                this.objData[_index]._isHover = true;
            },
            handleMouseOut(_index){
                if(!this.objData[_index]._isHover) return
                this.objData[_index]._isHover = false;
            },
            //单击选中，其他不选中
            handleClick(_index){
                if(!this.highlightRow||this.objData[_index]._isHighlight){
                    return;
                }
                let oldIndex = -1;
                for(var key in this.objData){
                    if( this.objData[_index]._isHighlight === true){
                        oldIndex = key;
                    }
                    this.objData[key]._isHighlight = false;
                }
                this.objData[_index]._isHighlight = true;
                var oldObj = oldIndex<0?null:this.rebuildData[oldIndex];
                //触发自定义事件，返回上一次选中的列，和这次选中的列
                this.$emit('on-select-change',this.rebuildData[_index],oldObj)

            },
            //处理全选
            selectAll(status){
                for(const data of this.rebuildData){
                    //如果是禁用的列，就不管
                    if(this.objData[data._index]._isDisabled){
                        continue;
                    }else{
                        this.objData[data._index]._isChecked = status;
                    }
                }
            }
        },
        watch:{
            height(){
                this.fixHeader();
            },
            data:{
                handler(){
                    this.copyData();
                    this.handleResize();
                    this.objData = this.makeObjData();
                },
                deep:true
            }
        }

    }
</script>
<style lang="less">
        .table-wrapper{
                position: relative;
                border: 1px solid #d7dde4;
                border-bottom: 0;
                border-right: 0;
        }
        .table{
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
                        box-sizing:border-box;
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
                &-border th,&-border td{
                    border-right: 1px solid rgb(227, 232, 238);
                }
                
               
        }
        .table:before{
            height:1px;
            width:100%;
            position:absolute;
            left:0;
            bottom:0;
        }
        .table:after{
            width:1px;
            height:100%;
            position:absolute;
            right:0;
            top:0;
        }
        .table:before,.table:after{
            background-color: #d7dde4;
             content:'';
        }
       .table-nodata td{
           text-align:center;
       }
</style>