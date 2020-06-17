<template>
  <div>
    <layout-header>关于易上课</layout-header>

    <div data-flex="dir:top" class="m-h-100 p-h-100 m-b-100 m-t-60 m-b-5 f-20">
      <p class="m-b-15" :style="{ textIndent: '2em', lineHeight: '1.8' }">易上课是一个互联网时代的产物，是在线信息类课程学习平台，主要服务于学生和老师群体。</p>
      <p class="m-b-15" :style="{ textIndent: '2em', lineHeight: '1.8' }">
        易上课主要是为了更好地为教育事业发展做贡献，缓解老师和学生课余交流时间不对等的现状。本平台可以让学生自行在上面浏览发现自己想要学习、了解、巩固的知识内容，老师可以在上面发布一些视频教程，供学生等其他浏览者进行学习参考。同时，学生可以在自己所学想学的视频下方留言评论，将自己的问题发布出来，老师或者其他学生提出解决方案进行交流，解决两方时间不对等的情况。
      </p>
      <p class="m-b-15" :style="{ textIndent: '2em', lineHeight: '1.8' }">
        随着信息化时代快速发展，互联网技术和多媒体技术对我们的影响越来越深，我们的生活和工作处处充斥的网络，各个行业纷纷建立了计算机通信平台，以提供信息化服务方式，易上课就此孕育而生。易上课比传统的教学方式更加灵活，学生可以选择自己感兴趣的领域方向学习，并能自由选择学习时间、多次反复复习巩固，教学方式更加灵活、自主性更强。
      </p>
      <p class="m-b-15" :style="{ textIndent: '2em', lineHeight: '1.8' }">
        易上课也是一个开源的项目，前端方面采用的是vue.js配合element-ui框架搭建，后台采用的是node.js的koa框架 + typescript + typeorm + mysql 搭建，项目地址为
        <a href="https://github.com/HPLWC/GraduationProject-LearningWeb" class="t-hover">https://github.com/HPLWC/GraduationProject-LearningWeb</a>。
      </p>
      <p class="m-b-15" :style="{ textIndent: '2em', lineHeight: '1.8' }">
        如有何疑问，可联系管理员，管理员邮箱为 935151619@qq.com
      </p>
    </div>

    <!--  页面底部  -->
    <layout-footer ref="LayoutFooter"></layout-footer>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import LayoutHeader from '../../common/view/LayoutHeader'
import LayoutFooter from '../../common/view/LayoutFooter'

export default @Component({ components: { LayoutHeader, LayoutFooter } })
class About extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style scoped>

</style>
