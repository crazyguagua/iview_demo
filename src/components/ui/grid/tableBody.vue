<template>
<table cellspacing="0" cellpadding="0" :style="styleObj">
        <colgroup>
           <col v-for="(column, index) in columns" :width="setCellWidth(column, index, false)">
        </colgroup>
    <tbody :class="[prefix+'-tbody']">
        <tr v-for="(row ,index) in data" @click.stop="handleClick(row._index)" @mouseenter.stop="handleMouseIn(row._index)" @mouseleave.stop="handleMouseOut(row._index)" :class="rowClasses(row._index)">
            <td v-for="(column,index) in columns">
                <Cell :column="column"  :prefix="prefix"
                 :row="row" :index="column._index" 
                 :naturalIndex="column.index"
                 :checked="rowChecked(column._index)"></Cell>
            </td>
        </tr>
    </tbody>
</table>
</template>
<script>
    import Cell from './cell'
    import mixin from './mixin'
    export default{
        mixins:[mixin],
        components:{
            Cell
        },
        props:{
            styleObj:Object,
            prefix:String,
            data:{
                type:Array,
                default:[]
            },
            columns:{
                type:Array,
                default:[]
            },
            columnsWidth: Object,
            objData:Object
          
        },
        data(){
            return{

            }
        },
        computed:{
           
        },
        methods:{
            handleMouseIn(index){
                this.$parent.handleMouseIn(index);
            },
            handleMouseOut(index){
                this.$parent.handleMouseOut(index);
            },
            //开启单击选中
            handleClick(index){
                this.$parent.handleClick(index)
            },
            rowClasses(_index){
                return [`${this.prefix}-row`,
                    {
                        [`${this.prefix}-row-highlight`]: this.objData[_index] && this.objData[_index]._isHighlight,
                        [`${this.prefix}-row-hover`]: this.objData[_index] && this.objData[_index]._isHover
                    }
                ]
            },
             rowChecked(index){
                //多选框是否选中
                //objData用来保存data的状态，不污染原始的data
                return this.objData[index]&&this.objData[index]._isChecked
            }
        }

    }
</script>
<style lang="less">
    .table-row-highlight td, .table-stripe .table-tbody tr:nth-child(2n) td,.tablegrid-stripe .table-row-highlight:nth-child(2n) td,  tr.table-row-highlight.table-row-hover td, tr.table-row-hover td {
        background-color: rgb(235, 247, 255);
    }
</style>