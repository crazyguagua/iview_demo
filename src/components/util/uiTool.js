export function oneOf(one,validList)
{   
    for(let i=0;i<validList.length;i++){
        if(one === validList[i]){
            return true;
        }
    }
    return false;
}
export function getStyle(element,styleName){
    if(!element || !styleName) return null;
    try{
        let computed = document.defaultView.getComputedStyle(element,'');
        return element.style[styleName]|| computed?computed[styleName]:null;
    }catch(e){
        return element.style[styleName]
    }
}
let cached;
export function getScrollBarSize(fresh){
     if (fresh || cached === undefined) {
        const inner = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '200px';

        const outer = document.createElement('div');
        const outerStyle = outer.style;

        outerStyle.position = 'absolute';
        outerStyle.top = 0;
        outerStyle.left = 0;
        outerStyle.pointerEvents = 'none';
        outerStyle.visibility = 'hidden';
        outerStyle.width = '200px';
        outerStyle.height = '150px';
        outerStyle.overflow = 'hidden';

        outer.appendChild(inner);

        document.body.appendChild(outer);

        const widthContained = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        let widthScroll = inner.offsetWidth;

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = widthContained - widthScroll;
    }
    return cached;
}

export function deepCopy(src){
    var ret =src instanceof Array?[]:{};
    for(var key in src){
        var val = src[key];
        if(typeof val =="object"|| val instanceof Array){
           ret[key] =  deepCopy(val)
        }else{
            ret[key] = val;
        }
    }
    return ret;
}