import constant from './constant'
import { utils } from './utils'
import { observerHover } from './observer'
import ls from './lsUtils'

export { ls }

export default {
  install (Vue) {
    Vue.prototype.$c = constant
    Vue.prototype.$utils = utils
    Vue.prototype.$ls = ls

    /**
     * 设置全局IntersectionObserver
     */
    Vue.directive('hover', {
      bind (el, binding) {
        el.classList.add('hidden')
        observerHover.setListener({ el: el, val: binding.value })
      }
    })

    /**
     * 超出隐藏
     * */
    Vue.filter('ellipsis', function (value, len) {
      if (!value) return ''
      if (value.length > len) {
        return value.slice(0, len) + '...'
      }
      return value
    })
  }
}
