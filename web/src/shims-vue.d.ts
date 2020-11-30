import Vue from 'vue'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  export interface Vue {
    $c: any,
    $ls: any,
    $utils: any
  }
}
