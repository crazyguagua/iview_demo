<template>
    <div class="select-dropdown">
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
        mounted(){
            this.referenceElm = this.$parent.$refs.reference;
            this.$parent.popperElm = this.popperElm = this.$el;
            this.$on('updatePopper', this.updatePopper);
            this.$on('destroyPopper', this.destroyPopper);
            this.createPopper();
        }

    }
</script>
<style lang="less">
    
</style>