<template>
    <div class="col" :style="style" :class="classList">
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
                ['span', 'offset', 'pull', 'push'].forEach(prop => {

                    if (This[prop]) {
                        prop === 'span' ? classList.push(`col-${ This[prop]}`) : classList.push(`col-${ prop }-${ This[prop]}`)
                    }
                })
                return classList;
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