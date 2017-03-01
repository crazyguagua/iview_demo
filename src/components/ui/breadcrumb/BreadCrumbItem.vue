<template>
    <li><a href="javascript:void(0)" ref="link"><slot></slot></a><span class="separator">{{separator}}</span></li>
</template>
<script>
    export default {
        name: 'MyBreadcrumbItem',
        data() {
            return {
                separator: ''
            }
        },
        props: {
            to: {}
        },
        mounted() {
            this.separator = this.$parent.separator;
            let self = this;
            if (this.to) {
                let link = this.$refs.link;

                link.addEventListener('click', _ => {
                    let to = this.to;
                    self.$router.push(to)
                })
            }
        },
        methods: {

        }
    }
</script>
<style lang="less">
    .my-breadcrumb {
        & li {
            display: inline-block;
            & a {
                color: #374767;
                text-decoration: none;
                display: inline-block;
            }
            & .separator {
                padding: 0 5px;
                color: #ccc;
            }
        }
        & li:last-child .separator {
            display: none;
        }
        & li:last-child a {
            color: #37a000;
            font-weight: 700;
        }
    }
</style>