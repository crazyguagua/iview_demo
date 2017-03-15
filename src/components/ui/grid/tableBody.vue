<template>
<table cellspacing="0" cellpadding="0" :style="styleObj">
        <colgroup>
           <col v-for="(column, index) in columns" :width="setCellWidth(column, index, false)">
        </colgroup>
    <tbody :class="[prefix+'-tbody']">
        <tr v-for="(row ,index) in data" @mouseenter.stop="handleMouseIn(row._index)" @mouseleave.stop="handleMouseOut(row._index)" :class="rowClasses(row._index)">
            <td v-for="(column,index) in columns">
                <Cell :column="column" :prefix="prefix" :row="row" :index="column._index" :naturalIndex="column.index"></Cell>
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
            rowClasses(_index){
                return [`${this.prefix}-row`,
                    {
                        [`${this.prefix}-row-highlight`]: this.objData[_index] && this.objData[_index]._isHighlight,
                        [`${this.prefix}-row-hover`]: this.objData[_index] && this.objData[_index]._isHover
                    }
                ]
            }
        }

    }
</script>
<style lang="less">
    .grid-row-highlight td, .grid-stripe .grid-tbody tr:nth-child(2n) td,.grid-stripe .grid-row-highlight:nth-child(2n) td,  tr.grid-row-highlight.grid-row-hover td, tr.grid-row-hover td {
        background-color: rgb(235, 247, 255);
    }
</style>