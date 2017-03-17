<template>
    <table cellspacing="0" cellpadding="0" border="0" :style="styles">
   <colgroup>
        <col v-for="(column, index) in columns" :width="setCellWidth(column, index, true)">
    </colgroup>
    <thead>
        <tr>
        <th v-for="(column ,index ) in columns">
            <div :class="cellClasses">
              <template v-if="column.type =='selection'">
                <CheckBox v-model="column.checked" :value="isChecked" @on-change="selectAll"></CheckBox>
              </template>
              <template v-else>
                 <span v-html="renderHtml(column,index)"></span>
              </template>
               
            </div>
        </th>
    </tr>
    </thead>
    
    </table>
</template>
<script>
import mixin from './mixin'
import {CheckBox} from '../checkbox'
    export default{
        mixins:[mixin],
        components:{
            CheckBox
        },
        props:{
            columns:Array,
            styleObj: Object,
            prefix:String,
            columnsWidth: {
                type:Object
            },
            objData:Object,
            data: Array,    // rebuildData
        },
        methods:{
            renderHtml(column,index){
                if('renderHeader' in column){
                    return column.renderHeader(column,index,this.columns);
                }else{
                    return column.title||'#';
                }
            },
            selectAll(){
                console.log(arguments)
                const status = !this.isChecked;
                this.$parent.selectAll(status);
            }
        },
        computed:{
            cellClasses(){
                return [`${this.headerPrefix}-cell`];
            },
            headerPrefix(){
                return `${this.prefix}-header`
            },
            styles(){
                 const style=Object.assign({},this.styleObj);
                const width = this.$parent.bodyHeight ===0? parseInt(this.styleObj.width):parseInt(this.styleObj.width) + this.$parent.scrollBarWidth;
                style.width = `${width}px`;
                return style;
            },
            //是否默认全选
            isChecked(){
                let isChecked = true;
                if (!this.data.length) isChecked = false;
                for(let i =0;i<this.data.length;i++){
                    if(!this.objData[this.data[i]._index]._isChecked && !this.objData[this.data[i]._index]._isDisabled){
                        isChecked = false;
                        break;
                    }
                }
                return isChecked;
            }
        }
    }
</script>
<style lang="less">
    .table-header th{
            height: 40px;
            white-space: nowrap;
            overflow: hidden;
            background-color: #f5f7f9;
            // box-sizing:border-box;
    }
   
    .table-header-cell{
        padding-left: 18px;
        padding-right: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        box-sizing: border-box;   
    }
    th .table-header-cell{
            display: inline-block;
            vertical-align: middle;
    }
</style>