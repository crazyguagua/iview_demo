import Bar from './bar'
import {getScrollBarSize} from '../../util/uiTool'
export default{
    name:'ScrollBar',
    components:{
        Bar
    },
    props:{
        native: Boolean,
        wrapStyle: {},//包裹部分的样式
        wrapClass: {},
        viewClass: {},
        viewStyle: {},//内容部分的样式
        noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
        tag:{
            type:String,
            default:'div'//内容部分的标签名
        }
    },
    data(){
        return {
            sizeWidth:'0',
            sizeHeigh:'0',
            moveX:0,
            moveY:0
        }
    },
    render(h){
       let gutter = getScrollBarSize();
       let style = this.wrapStyle;

    if (gutter) {
      const gutterWith = `-${gutter}px`;
      const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`;

      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle);
        style.marginRight = style.marginBottom = gutterWith;
      } else if (typeof this.wrapStyle === 'string') {
        style += gutterStyle;
      } else {
        style = gutterStyle;
      }
    }
    //内容层
    const view = h(this.tag, {
      class: ['scrollbar_view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize'
    }, this.$slots.default);
    //包裹层
    const wrap = (
      <div
        ref="wrap"
        style={ style }
        onScroll={ this.handleScroll }
        class={ [this.wrapClass, 'scrollbar_wrap', gutter ? '' : 'scrollbar_wrap--hidden-default'] }>
        { [view] }
      </div>
    );
    let nodes;

    if (!this.native) {
      nodes = ([
        wrap,
        <Bar
          move={ this.moveX }
          size={ this.sizeWidth }></Bar>,
        <Bar
          vertical
          move={ this.moveY }
          size={ this.sizeHeight }></Bar>
      ]);
    } else {
      nodes = ([
        <div
          ref="wrap"
          class={ [this.wrapClass, 'scrollbar_wrap'] }
          style={ style }>
          { [view] }
        </div>
      ]);
    }
    //最终模板
    return h('div', { class: 'scrollbar' }, nodes);
  },
  
  methods:{

    handleScroll(){
      alert('handleScroll')
    }
  }
}