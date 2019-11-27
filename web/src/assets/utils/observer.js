export default class ObserverHover {
  constructor () {
    this._observer = {}
    this.init()
  }
  init () {
    this._observer = new IntersectionObserver(change => {
      change = change.filter(item => item.isIntersecting)
      change.forEach((item, index) => {
        setTimeout(() => {
          const dataClass = item.target.dataset.observer ? item.target.dataset.observer : ''
          dataClass && item.target.classList.add(dataClass)
          this.cancelListener(item.target)
        }, 500 * index)
      })
    })
  }

  // 添加监听
  setListener (e) {
    this._observer && this._observer.observe(e.el)
  }
  // 取消监听
  cancelListener (el) {
    this._observer && this._observer.unobserve(el)
  }
}

export const observerHover = new ObserverHover()
