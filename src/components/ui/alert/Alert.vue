<template>
    <transition name="fade">
        <div class="alert" v-show="visible" :class="[typeCls]"><button class="close" @click="close()"><span>X</span></button><strong></strong>{{message}}</div>
    </transition>
    
</template>
<script>
    export default {
        data() {
            return {
                visible: true
            }
        },
        props: {
            message: {
                type: String
            },
            type: {
                type: String,
                default: 'info'
            },
        },
        computed: {
            typeCls() {
                return `alert-${ this.type }`
            }
        },
        methods: {
            close: function() {
                this.visible = false;
                this.$emit('close');
            }
        }
    }
</script>
<style lang="less">
    .alert {
        border: 2px solid transparent;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
        &.alert-danger {
            color: white;
            background-color: #E5343D;
            border-color: #BD000A;
            & .close {
                color: #BD000A;
            }
        }
        &.alert-warning {
            color: #8a6d3b;
            background-color: #fcf8e3;
            border-color: #faebcc;
            & .close {
                color: #efa200;
            }
        }
        &.alert-info {
            color: white;
            background-color: #53d4fa;
            border-color: #00b1e6;
            & .close {
                color: #00b1e6;
            }
        }
        &.alert-success {
            color: white;
            background-color: #45c203;
            border-color: #349800;
            & .close {
                color: #349800;
            }
        }
        & button.close {
            padding: 0;
            cursor: pointer;
            background: 0 0;
            border: 0;
            float: right;
            font-size: 16px;
            outline: none;
        }
    }
</style>