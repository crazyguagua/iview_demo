<template>
  <div class="row" :style="style">
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
    
    /*[class*=col] {
        float: left;
        box-sizing: border-box;
        width: 100%;
        position: relative;
    }*/
    @iterations: 24;
@screen-xs: 480px;
@screen-sm: 768px;
@screen-md: 992px;
@screen-lg: 1200px;
.grid-setting(@index;
@type;
@item) when( @type=pull) and ( @index< @iterations) {
    @{item} {
        right: (@index/@iterations)*100%
    }
}

.grid-setting(@index;
@type;
@item) when( @type =push) and ( @index< @iterations) {
    @{item} {
        left: (@index/@iterations)*100%
    }
}

.grid-setting(@index;
@type;
@item) when( @type =width) {
    @{item} {
        width: (@index/@iterations)*100%
    }
}

.grid-setting(@index;
@type;
@item) when( @type =offset)and ( @index< @iterations) {
    @{item} {
        margin-left: (@index/@iterations)*100%
    }
}

.setByDevice(@device;
@index: 1) when ( @device=pc)and (@index<=@iterations ) {
    @width-item: ~".col-@{index}";
    @offset-item: ~".col-offset-@{index}";
    @pull-item: ~".col-pull-@{index}";
    @push-item: ~".col-push-@{index}";
    .setAll(@index;@width-item;@offset-item;@pull-item;@push-item);
    .setByDevice(@device;
    (@index+1))
}

.setByDevice(@device;
@index: 1) when not( @device=pc) and (@index<=@iterations ) {
    @width-item: ~".col-@{device}-@{index}";
    @offset-item: ~".col--@{device}-offset-@{index}";
    @pull-item: ~".col--@{device}-pull-@{index}";
    @push-item: ~".col--@{device}-push-@{index}";
   .setAll(@index;@width-item;@offset-item;@pull-item;@push-item);
    .setByDevice(@device;
    (@index+1))
}


.setAll(@index;@width-item;@offset-item;@pull-item;@push-item){
	 .grid-setting(@index;
    pull;
    @pull-item);
    .grid-setting(@index;
    push;
    @push-item);
    .grid-setting(@index;
    offset;
    @offset-item);
    .grid-setting(@index;
    width;
    @width-item);
}

.setByDevice(pc);
@media (max-width: @screen-xs) {
    .setByDevice(xs);
    .xs-hide{
        display: none;
    }
}
@media (max-width: @screen-sm) {
    .setByDevice(sm);
}  

@media (max-width: @screen-md) {
    .setByDevice(md);
}  

@media (max-width: @screen-lg) {
    .setByDevice(lg);
}  
    
.col(@index) when (@index = 1) { 
    @item: ~".col-@{index},.col-xs-@{index}, .col-sm-@{index}, .col-md-@{index}, .col-lg-@{index}";
    .col((@index + 1), @item);
  }
  .col(@index, @list) when (@index =< @iterations) { 
    @item: ~".col-@{index},.col-xs-@{index}, .col-sm-@{index}, .col-md-@{index}, .col-lg-@{index}";
    .col((@index + 1), ~"@{list}, @{item}");
  }
  .col(@index,@list) when (@index>@iterations){
      @{list}{
            float: left;
            box-sizing: border-box;
            position: relative;
      }
  }
  .col(1);

</style>