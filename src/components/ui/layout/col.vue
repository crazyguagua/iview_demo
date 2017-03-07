<template>
    <div class="my-col" :style="style" :class="classList">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            span: {
                type: Number,
                default: 24
            },
            offset: Number,
            pull: Number,
            push: Number,

        },
        computed: {
            gutter() {
                return this.$parent.gutter;
            },
            classList() {
                let classList = [];
                let This = this;
                ['span', 'offset', 'pull', 'right'].forEach(prop => {
                    if (This[prop]) {
                        This[prop] === 'span' ? classList.push(`my-col-${ This[prop]}`) : classList.push(`my-col-${ prop }-${ This[prop]}`)
                    }
                })
            },
            style() {
                let padding = `${ this.gutter/2 }px`;
                return {
                    'padding-left': padding,
                    'padding-right': padding
                }
            }
        }
    }
</script>
<style lang="less">

</style>