//校验 props validate 里面的属性在一定要在数组中存在  
export function oneOf(one,validList)
{   
    for(let i=0;i<validList.length;i++){
        if(one === validList[i]){
            return true;
        }
    }
    return false;
}
//获取计算出来的样式
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

//深拷贝，
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

//合并多个object
export function merge(target){
    for(let i=0,j=arguments.length;i<j;i++){
        var source = arguments[i]||{};
        for(let key in source){
            if(source.hasOwnProperty(key)){
                let val = source[key];
                if(val != undefined){
                    target[key] = val;
                }
            }
            
        }
    }
    return target;//返回第一个对象
}

//getDom 处理含有注释的dom，获得去掉注释的dom
export function getDom(dom){
    if(dom.nodeType==3){// nodeType == 3表示该节点是注释
        dom = dom.nextElementSibling ||dom.nextSibling;
        getDom(dom);
    }
    return dom
}
/**
 * 判断dom元素添加样式
 * @param  {dom} dom
 * @param  {String} cls
 */
export function addClass(dom,cls){
    if(!dom || !cls) return;
    let curClass = dom.className;
    let classes = cls.split(" ");
    for(var i=0;i<classes.length;i++){
        var eachCls = classes[i];
        if(!eachCls){
            continue;
        }
        if(dom.classList){
            dom.classList.add(eachCls);
        }else{
            if (!hasClass(dom, eachCls)) {
               curClass += ' ' + clsName;
            }
        }
    }
    if(!dom.classList){
        dom.className = curClass;
    }
}
/**
 * 为dom元素移除样式
 * @param  {dom} dom
 * @param  {String} cls
 */
export function removeClass(dom,cls){
    if(!dom || !cls) return;
    let curClass = dom.className;
    let classes = cls.split(" ");
    for(var i=0;i<classes.length;i++){
        var eachCls = classes[i];
        if(!eachCls){
            continue;
        }
        if(dom.classList){
            dom.classList.remove(eachCls);
        }else{
            if (hasClass(dom, eachCls)) {
                curClass =curClass.replace(' '+eachCls+' ',' ');
            }
        }
    }
    if(!dom.classList){
        dom.className = curClass.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,'');
    }
}
/**
 * 判断dom是否含有某个样式
 * @param  {dom} dom
 * @param  {String} cls
 */
export function hasClass(dom,cls){
    if(!dom || cls) return;
    if(cls.indexOf(' ')!=-1){
        throw new Error('参数 cls 不能含有空格')
    }
    if(dom.classList){
        return dom.classList.contains(cls);
    }else{
        let className = dom.className;
        return (' ' + className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

let hiddenTextarea;

const HIDDEN_STYLE = `
    height:0 !important;
    min-height:0 !important;
    max-height:none !important;
    visibility:hidden !important;
    overflow:hidden !important;
    position:absolute !important;
    z-index:-1000 !important;
    top:0 !important;
    right:0 !important
`;

const CONTEXT_STYLE = [
    'letter-spacing',
    'line-height',
    'padding-top',
    'padding-bottom',
    'font-family',
    'font-weight',
    'font-size',
    'text-rendering',
    'text-transform',
    'width',
    'text-indent',
    'padding-left',
    'padding-right',
    'border-width',
    'box-sizing'
];

function calculateNodeStyling(node) {
    const style = window.getComputedStyle(node);

    const boxSizing = style.getPropertyValue('box-sizing');

    const paddingSize = (
        parseFloat(style.getPropertyValue('padding-bottom')) +
        parseFloat(style.getPropertyValue('padding-top'))
    );

    const borderSize = (
        parseFloat(style.getPropertyValue('border-bottom-width')) +
        parseFloat(style.getPropertyValue('border-top-width'))
    );

    const contextStyle = CONTEXT_STYLE
        .map(name => `${name}:${style.getPropertyValue(name)}`)
        .join(';');

    return {contextStyle, paddingSize, borderSize, boxSizing};
}

export  function calcTextareaHeight(targetNode, minRows = null, maxRows = null) {
    if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
    }

    let {
        paddingSize,
        borderSize,
        boxSizing,
        contextStyle
    } = calculateNodeStyling(targetNode);

    hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
    hiddenTextarea.value = targetNode.value || targetNode.placeholder || '';

    let height = hiddenTextarea.scrollHeight;
    let minHeight = -Infinity;
    let maxHeight = Infinity;

    if (boxSizing === 'border-box') {
        height = height + borderSize;
    } else if (boxSizing === 'content-box') {
        height = height - paddingSize;
    }

    hiddenTextarea.value = '';
    let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

    if (minRows !== null) {
        minHeight = singleRowHeight * minRows;
        if (boxSizing === 'border-box') {
            minHeight = minHeight + paddingSize + borderSize;
        }
        height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
        maxHeight = singleRowHeight * maxRows;
        if (boxSizing === 'border-box') {
            maxHeight = maxHeight + paddingSize + borderSize;
        }
        height = Math.min(maxHeight, height);
    }

    return {
        height: `${height}px`,
        minHeight: `${minHeight}px`,
        maxHeight: `${maxHeight}px`
    };
}


// Find components upward
export function findComponentUpward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}

// Find component downward
export function findComponentDownward (context, componentName) {
    const childrens = context.$children;
    let children = null;

    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
            }
        });

        for (let i = 0; i < childrens.length; i++) {
            const child = childrens[i];
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
                break;
            } else {
                children = findComponentDownward(child, componentName);
                if (children) break;
            }
        }
    }
    return children;
}

// Find components downward
export function findComponentsDownward (context, componentName, components = []) {
    const childrens = context.$children;

    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name;
            const childs = child.$children;

            if (name === componentName) components.push(child);
            if (childs.length) {
                const findChilds = findComponentsDownward(child, componentName, components);
                if (findChilds) components.concat(findChilds);
            }
        });
    }
    return components;
}