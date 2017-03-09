export default {
    bind(el, binding, vnode) {
       function documentHandler (e) {
          if (el.contains(e.target)) {
              return false;
          }
          if (binding.expression) {
              binding.value(e);
          }
      }
      el.__vueClickOutside__ = documentHandler;
      document.addEventListener('click', documentHandler);
    },
    unbind (el, binding) {
      document.removeEventListener('click', el.__vueClickOutside__);
      delete el.__vueClickOutside__;//这句话一定要写，否则页面返回在点登陆，会报binding is not defined
  }
};