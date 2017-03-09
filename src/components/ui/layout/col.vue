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
            xs:Object,
            sm:Object,
            md:Object,
            lg:Object

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
                });
                ['xs','sm','md','lg'].forEach(size => {
               
                     let sizeObj =This[size];
                    
                    if(typeof sizeObj == 'number'){
                       
                        classList.push(`col-${size}-${sizeObj}`);
                    }else if(typeof sizeObj =='object'){
                        
                        ['offset','pull','push','span'].forEach(type=>{
                            if(sizeObj[type]){
                                let number = sizeObj[type];
                                let cls=type==='span'?`col-${size}-${number}`:`col-${size}-${type}-${number}`
                                classList.push(cls)
                            }

                        });
                    }
                });
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