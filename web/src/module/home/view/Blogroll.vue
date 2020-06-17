<template>
  <div>
    <layout-header>友情链接</layout-header>

    <div data-flex="dir:top" class="m-h-100 p-h-100 m-b-100 m-t-60 m-b-5 f-20">
      <p class="m-b-15" :style="{ textIndent: '2em', lineHeight: '1.8' }">
        Github: <a href="https://github.com/" class="t-hover m-l-20">https://github.com/</a>
      </p>
      <p class="m-b-15" :style="{ textIndent: '2em', lineHeight: '1.8' }">
        慕课网: <a href="https://www.imooc.com/" class="t-hover m-l-20">https://www.imooc.com/</a>
      </p>
      <p class="m-b-15" :style="{ textIndent: '2em', lineHeight: '1.8' }">
        掘金: <a href="https://juejin.im/timeline" class="t-hover m-l-20">https://juejin.im/timeline</a>
      </p>
      <p class="m-b-15" :style="{ textIndent: '2em', lineHeight: '1.8' }">
        Stack Overflow: <a href="https://stackoverflow.com/" class="t-hover m-l-20">https://stackoverflow.com/</a>
      </p>
      <p class="m-b-15" :style="{ textIndent: '2em', lineHeight: '1.8' }">
        毕设平台: <a href="http://sgu.co.cnki.net/Login.html?dp=&r=1582704325341" class="t-hover m-l-20">http://sgu.co.cnki.net/Login.html?dp=&r=1582704325341</a>
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
class Blogroll extends Vue {
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
