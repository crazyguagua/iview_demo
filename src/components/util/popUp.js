import Vue from 'vue'
import PopupManager from './popUpManager'
//这里用了一个tooltip插件 popper.js https://github.com/FezVrasta/popper.js
const PopperJS  = Vue.prototype.$isServer?function(){}:require('./popper');

export default {
    props:{
        placement:{
            type:String,
            default:'bottom'
        },
        popper: {},
        transition:String,
        value: Boolean,
        popperOptions: {
            type: Object,
            default() {
                return {
                    gpuAcceleration: false
                };
            }
        },
        //默认添加到body上
        appendToBody: {
            type: Boolean,
            default: true
        },
        offset: {
            default: 0
        }
    },
    data(){
         return {
            showPopper: false,
            currentPlacement: ''
        };
    },
    watch:{
        value: {
                immediate: true,
                handler(val) {
                    this.showPopper = val;
                    this.$emit('input', val);
                }
        },
        showPopper(val) {
            val ? this.updatePopper() : this.destroyPopper();
            this.$emit('input', val);
        }
    },
    methods:{
        updatePopper(){
            this.popperJS ? this.popperJS.update() : this.createPopper();
        },
        /*创建popper */
        /**
         * @param {HTMLElement} [reference=$refs.reference] - The reference element used to position the popper.
         * @param {HTMLElement} [popper=$refs.popper] - The HTML element used as popper, or a configuration used to generate the popper.
         * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
         * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
         * @param {Boolean} [visible=false] Visibility of the popup element.
         * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
         */
        createPopper(){
            if(this.$isServer){
                return false;
            }
            this.currentPlacement = this.currentPlacement || this.placement;
            if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
                    return;
            }
            const options = this.popperOptions;
            const popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;
            let reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;

            if (!reference &&
                this.$slots.reference &&
                this.$slots.reference[0]) {
                reference = this.referenceElm = this.$slots.reference[0].elm;
            }

            if (!popper || !reference) return;
            if (this.visibleArrow) this.appendArrow(popper);
            if (this.appendToBody) document.body.appendChild(this.popperElm);
            if (this.popperJS && this.popperJS.destroy) {
                this.popperJS.destroy();
            }

            options.placement = this.currentPlacement;
            options.offset = this.offset;
            //reference 作为被定位的元素，其定位属性必须是relative的
            //popper 是作为pop出来的元素
            this.popperJS = new PopperJS(reference, popper, options);
            this.popperJS.onCreate(_ => {
                this.$emit('created', this);
                this.resetTransformOrigin();
                this.$nextTick(this.updatePopper);
            });
            this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
            this.popperElm.addEventListener('click', stop);
        },
         resetTransformOrigin() {
            let placementMap = {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left'
            };
            let placement = this.popperJS._popper.getAttribute('x-placement').split('-')[0];
            let origin = placementMap[placement];
            this.popperJS._popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${ origin }` : `${ origin } center`;
        }
    }
};