<template>
<table cellspacing="0" cellpadding="0" :style="styleObj">
    <tbody :class="[prefix+'tbody']">
        <tr v-for="(row ,index) in data">
            <td v-for="(column,index) in columns">
                <Cell :column="column" :prefix="prefix" :row="row" :index="column._index" :naturalIndex="column.index"></Cell>
            </td>
        </tr>
    </tbody>
</table>
</template>
<script>
    import Cell from './cell'
    export default{
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
            }
        },
        data(){
            return{

            }
        },
        computed:{

        },
        methods:{

        }

    }
</script>
<style lang="less">
    
</style>