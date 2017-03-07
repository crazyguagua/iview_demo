<template>
    <div class="my-row" :style="style">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'my-row',
        props: {
            gutter: Number,
            type: String
        },
        computed: {
            style() {
                let margin = `-${ this.gutter/2 }px`;
                return {
                    'margin-left': margin,
                    'margin-right': margin
                }
            }
        }
    }
</script>
<style lang="less">
    .my-row {
        position: relative;
        box-sizing: border-box;
    }
</style>