<template>
    <div v-clickoutside="handleClose">
        <div  @click="handleClick"><slot ></slot></div>
        <div v-show="hasClick==true" class="my-dropdown-select">
            <slot name="list"></slot>
        </div>
    </div>
</template>
<script>
    import dropdownMenu from './dropdown-menu';
    import clickoutside from '../../../directives/clickoutside';
    export default {
        directives: {
            clickoutside
        },
        methods: {
            handleClick: function() {
                this.hasClick = !this.hasClick;
            },
            handleClose: function () {
                this.hasClick = false;
            }
        },
        events: {
            'dropdown-item-click' (key) {
                const parent = this.$parent;
                if (parent) this.$emit('dropdown-item-click', key);
            }
        },
        data: function() {
            return {
                hasClick: false
            }
        }
    }
</script>
<style lang="less">
    .my-dropdown-select {
        position: absolute;
        right: 0px;
        top: 55px;
        background: #438EB9;
        z-index: 900;
        max-height: 200px;
        transform-origin: center top 0px;
    }
</style>