export default {
    bind(el, binding, vnode) {
        console.log(arguments);
        binding.documentHandler = (e) => {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                vnode.context[binding.expression]();
            }
        };
        document.addEventListener('click', binding.documentHandler);
    },
    update() {

    },
    unbind() {
        document.removeEventListener('click', binding.documentHandler);
    }
};