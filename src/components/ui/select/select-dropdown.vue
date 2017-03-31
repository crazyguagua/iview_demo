<template>
    <div class="select-dropdown" :style="{minWidth:minWidth}">
        <slot></slot>
    </div>
</template>
<script>
/*需要用到弹出pop的一些属性，需要混入 pop*/
    import popUp from '../../util/popUp'
    export default{
        name:'selectDropDown',
        mixins:[popUp],
        props:{
            placement:{
                type:String,
                default:'bottom-start'
            }
        },
        data(){
           return{
               minWidth:'', //dropdown的最小宽度，随select组件的变化而变化,
               b:0
           }
        },
        computed:{
            a(){
                return this.b;
            }
        },
        mounted(){
            this.referenceElm = this.$parent.$refs.reference;
            this.$parent.popperElm = this.popperElm = this.$el;
            this.$on('updatePopper', this.updatePopper);
            this.$on('destroyPopper', this.destroyPopper);
            this.createPopper();
            this.b++;
        },
        watch:{

            //检测相对于弹出框的input的宽度
            '$parent.inputWidth':{
                handler(){
                     debugger;
                     this.minWidth = this.$parent.$el.getBoundingClientRect().width+'px';
                }
               
            },
            'a'(){
                console.log(arguments);
            }
        }

    }
</script>
<style lang="less">
    .select-dropdown{
            position: absolute;
            z-index: 1001;
            border: 1px solid #d1dbe5;
            border-radius: 2px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
            box-sizing: border-box;
            margin: 5px 0;
    }
</style>