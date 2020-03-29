<!-- 关注页面 -->
<template>
  <div class="contact m-h-20">
    <div data-flex="main:justify cross:center" class="p-h-20">
      <div data-flex="cross:center">
        <img v-if="data.attentionUserInfo.photo" :src="data.attentionUserInfo.photo" alt="">
        <hpc-icon v-else name="defaultuser" :size="70" class="m-t-2 o-8"></hpc-icon>
        <div class="f-18 m-l-30 a-l">
          <p>{{ data.attentionUserInfo.name }}</p>
          <p class="f-14 m-t-5">{{ data.attentionUserInfo.decoration || '暂无简介' }}</p>
        </div>
      </div>
      <el-button @click="unAttentionEvent">取消关注</el-button>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'

export default @Component({})
class Home extends Vue {
  /* vue-props */
  @Prop({ type: Object, default: () => ({}) }) data
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  /* 取消关注 */
  async unAttentionEvent () {
    const { data } = await this.$store.dispatch('deleteAttention', {
      id: this.data.id
    })
    if (data.success) {
      this.$notify({
        type: 'success',
        title: '提示',
        message: '取消成功'
      })
      this.$emit('refresh', true)
    } else {
      this.$notify({
        type: 'error',
        title: '提示',
        message: '取消失败'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
</style>
