<template>
    <table cellspaceing="0" cellpadding="0" :style="styles">
    <tr>
        <th v-for="(column ,index ) in columns">
            <div :class="cellClasses">
                <span v-html="renderHtml(column,index)"></span>
            </div>
        </th>
    </tr>
    </table>
</template>
<script>

    export default{
        props:{
            columns:Array,
            styleObj: Object,
            prefix:String
        },
        methods:{
            renderHtml(column){
                if(column.render){
                    return column.render(column,index,this.columns);
                }else{
                    return column.title||'#';
                }
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
            }
        }
    }
</script>
<style lang="less">
    .grid-header th{
            height: 40px;
            white-space: nowrap;
            overflow: hidden;
            background-color: #f5f7f9;
    }
    .grid-header th,.grid-header td{
        min-width: 0;
        height: 48px;
        box-sizing: border-box;
        text-align: left;
        text-overflow: ellipsis;
        vertical-align: middle;
        border-bottom: 1px solid #e3e8ee;
    }
    .grid-header-cell{
        padding-left: 18px;
        padding-right: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        box-sizing: border-box;   
    }
    th .grid-header-cell{
            display: inline-block;
            vertical-align: middle;
    }
</style>