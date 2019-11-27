import utils from './utils'
import { observerHover } from './observer'

export { utils }

export default {
  install (Vue) {
    Vue.prototype.$utils = utils

    // 设置全局IntersectionObserver
    Vue.directive('hover', {
      bind (el, binding) {
        el.classList.add('hidden')
        observerHover.setListener({ el: el, val: binding.value })
      }
    })
  }
}
