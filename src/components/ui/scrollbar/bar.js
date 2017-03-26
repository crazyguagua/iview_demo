export default{
    name:'Bar',
    props:{
        vertical:Boolean,
        size:String,
        move:Number
    },
    render(h){
        return (
            <div
                class={ ['scrollbar__bar', 'is-' + bar.key] }
                onMousedown={ this.clickTrackHandler } >
                <div
                ref="thumb"
                class="scrollbar__thumb"
                onMousedown={ this.clickThumbHandler }
                style={ renderThumbStyle({ size, move, bar }) }>
                </div>
            </div>
            );
    }
}