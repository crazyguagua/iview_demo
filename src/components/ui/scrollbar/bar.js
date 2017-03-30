 let barData={
                 vertical: {
                    offset: 'offsetHeight',
                    scroll: 'scrollTop',
                    scrollSize: 'scrollHeight',
                    size: 'height',
                    key: 'vertical',
                    axis: 'Y',
                    client: 'clientY',
                    direction: 'top'
                },
                horizontal: {
                    offset: 'offsetWidth',
                    scroll: 'scrollLeft',
                    scrollSize: 'scrollWidth',
                    size: 'width',
                    key: 'horizontal',
                    axis: 'X',
                    client: 'clientX',
                    direction: 'left'
                }
            }
let  renderThumbStyle =function({ move, size, bar }) {
  const style = {};
  const translate = `translate${bar.axis}(${ move }%)`;
  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate;
  style.webkitTransform = translate;
  return style;
};
export default{
    name:'Bar',
    props:{
        vertical:Boolean,
        size:String,
        move:Number
    },
    data(){
        return {
        }
    },
    computed:{
        bar(){
            return barData[this.vertical?'vertical':'horizontal'];
        }
    },
    render(h){
         const { size, move, bar } = this;
        return (
            <div
                class={ ['scrollbar_bar', 'is-' + bar.key] }
                onMousedown={ this.clickTrackHandler } >
                <div
                ref="thumb"
                class="scrollbar_thumb"
                onMousedown={ this.clickThumbHandler }
                style={ renderThumbStyle({ size, move, bar }) }>
                </div>
            </div>
            );
    },
    methods:{
        clickTrackHandler(){
            console.log('clicktrack');
        },
        clickThumbHandler(){
            console.log('clickThumb');
        }

    }
}