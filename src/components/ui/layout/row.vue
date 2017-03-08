<template>
  <div class="my-row" :style="style">
    <slot></slot>
  </div>
</template>
<script>
    export default {
        name: 'my-row',
        props: {
            gutter: {
                type: Number,
                default: 20
            },
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
    .container {
        padding: 0 20px;
    }
    
    .row {
        position: relative;
        box-sizing: border-box;
        margin-bottom: 20px;
    }
    
    .row:before,
    .row:after {
        content: " ";
        display: table;
        clear: both;
    }
    
    [class*=col] {
        float: left;
        box-sizing: border-box;
        width: 100%;
        position: relative;
    }
    
    @iterations: 24;
    @screen-xs: 480px;
    @screen-sm: 768px;
    @screen-md: 992px;
    @screen-lg: 1200px;
    .grid-width(@range;
    @columns;
    @index: 1) when(@index<=@columns) {
        .my-col-@{range}-@{index} {
            width: @index*(100%/@columns);
        }
        .grid-width(@range;
        @columns;
        (@index+1));
    }
    
    .grid-width-norange(@columns;
    @index: 1) when(@index<=@columns) {
        .my-col-@{index} {
            width: @index*(100%/@columns);
        }
        .grid-width-norange(@columns;
        (@index+1));
    }
    
    @media(max-width:@screen-xs) {
        .grid-width(xs;
        @iterations)
    }
    
    @media(max-width:@screen-sm) {
        .grid-width(sm;
        @iterations)
    }
    
    @media(max-width:@screen-md) {
        .grid-width(md;
        @iterations)
    }
    
    @media(max-width:@screen-lg) {
        .grid-width(lg;
        @iterations)
    }
    
    .my-row {
        .grid-width-norange(@iterations)
    }
    
    .grid-offset(@columns;
    @index: 1) when(@index<@columns) {
        .my-col-offset-@{index} {
            margin-left: @index*(100%/@columns);
        }
        .grid-offset(@columns;
        (@index+1));
    }
    
    .my-row {
        .grid-offset(@iterations)
    }
    /*推拉设置*/
    
    .grid-setting(@index;
    @class;
    @type) when(@type=pull) {
        .my-col-@{class}-@{type} {
            right: (@index/@iterations)*100%
        }
    }
    
    .grid-setting(@index;
    @class;
    @type) when(@type=push) {
        .my-col-@{class}-@{type} {
            left: (@index/@iterations)*100%
        }
    }
    
    .loop-grid(@index;
    @class;
    @type) when(@index>0) {
        .loop-grid((@index -1);
        @index;
        @class;
        @type)
    }
    
    .my-row {
        .loop-grid(@iterations -1;
        lg;
        push);
        .loop-grid(@iterations -1;
        lg;
        pull);
    }
</style>