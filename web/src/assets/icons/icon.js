import Vue from 'vue'
import SvgIcon from '../../baseComponent/HpcIcon.vue'

Vue.component('hpc-icon', SvgIcon)

const content = require.context('./svg', false, /\.svg$/)
content.keys().map(content)
export default content.keys()
