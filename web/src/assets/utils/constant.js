class Constant {
  // 导航
  NavTitle = [
    {
      title: '首页',
      hash: '/home',
      roles: [0, 1]
    },
    {
      title: '课程',
      hash: '/course/list',
      roles: [0, 1]
    },
    {
      title: '关于',
      hash: '/about',
      roles: [0, 1]
    },
  ]

  // 排序方式
  OrderWay = [
    {
      way: 'heat',
      value: '热度'
    },
    {
      way: 'time',
      value: '时间'
    },
    // {
    //   way: 'course',
    //   value: '课程'
    // }
  ]
}

const constant = new Constant()
export default constant
