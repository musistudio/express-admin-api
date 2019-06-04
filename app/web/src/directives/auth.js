// 权限校验指令

/** 指令用法
 * v-auth="['admin']"
 * 表示只有admin可以显示此组件
 */
import { checkRole } from "../utils/auth";

function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!checkRole(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

export default { install };
