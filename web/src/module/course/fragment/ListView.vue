<!-- 评论/视频目录页 -->
<template>
  <div>
    <h1 data-flex="cross:center" class="f-22 p-b-8 b-b">
      <hpc-icon name="view"></hpc-icon>
      <span class="m-l-10">{{ title }}</span>
    </h1>
    <div>
      <ul class="p-h-15 p-t-20">
        <template v-if="type==='comment'">
          <!-- 评论 -->
          <li v-for="item in data" data-flex="cross:top" class="m-t-20 p-b-20 p-h-10 b-b" :key="item.id">
            <div>
              <hpc-icon name="defaultuser" :size="50" class="m-t-2 o-8"></hpc-icon>
            </div>
            <div class="m-l-18 bx-b">
              <div>
                <p class="m-b-10 f-18">首评论</p>
                <p class="o-7 p-r-100">本节课我们介绍了系列课程的关系，后端mvc，前端mvvm等列课程的关系，后端mvc，前端mvvm等概念和Vue.js基础的指令v-for，v-model</p>
              </div>
              <template>
                <ul>
                  <li data-flex="cross:center" class="m-t-20 p-b-20 p-h-10">
                    <div>
                      <hpc-icon name="defaultuser" :size="40" class="o-8"></hpc-icon>
                    </div>
                    <div class="m-l-18 bx-b">
                      <p class="m-b-10 f-16 cp">子评论</p>
                      <p class="o-7 p-r-100">本节课我们介绍了系列课程的另一关系，除后端mvc，前端mvvm等概念和Vue.js基础的指令v-for，v-model</p>
                    </div>
                  </li>
                </ul>
              </template>
            </div>
          </li>
        </template>

        <template v-else-if="type==='catalog'">
          <!-- 目录 -->
          <li v-for="item in data" data-flex="cross:center" class="catalog m-t-20 p-b-20 p-h-10 b-b" :key="item.id">
            <div>
              <hpc-icon name="video" class="o-8"></hpc-icon>
            </div>
            <div class="m-l-18 bx-b">
              <p class="m-b-15 f-18 cp t-hover" @click="toVideo(item.id)" :data-url="item.id">{{ item.title }}</p>
              <p class="o-7 p-r-100">{{ item.decoration }}</p>
            </div>
          </li>
        </template>
      </ul>

      <el-pagination
        class="m-v-20 a-c"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pagination.pageSizeOptions"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {Component, Prop, Watch, Vue} from 'vue-property-decorator'

export default @Component
class ListView extends Vue {
  /* vue-props */
  // 种类： catalog目录页  comment评论页
  @Prop({ type: String, default: 'catalog' }) type
  @Prop({ type: Array, default: () => [] }) data
  @Prop({ type: Number, default: 0 }) total
  /* vue-vuex */
  /* vue-data */
  pagination = {
    pageSizeOptions: ['10', '20', '30', '50'],
    current: 1, // 当前页数
    pageSize: 10,
    total: 0
  }
  /* vue-compute */
  get title () {
    if (this.type === 'catalog') return `课程目录（${this.total}章）`
    else if (this.type === 'comment') return '评论'
    else return ''
  }
  /* vue-watch */
  @Watch('total', {deep: true})
  onChangeValue (newV) {
    this.pagination.total = newV
  }
  /* vue-lifecycle */
  /* vue-method */
  handleSizeChange (val) {
    this.pagination.pageSize = val
    this.pagination.current = 1
    this.$emit('handleSizeChange', this.pagination)
  }
  handleCurrentChange (val) {
    this.pagination.current = val
    this.$emit('handleCurrentChange', this.pagination)
  }
  toVideo (id) {
    this.$router.push({ path: '/course/video', query: { videoKey: id } })
  }
}
</script>

<style lang="scss" scoped>
  .catalog:hover {
    /*background: #c0c4cc;*/
  }
</style>
