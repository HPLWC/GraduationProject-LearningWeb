<template>
	<div class="sidebar">
		
			<el-row class="menu_page">
				<el-col>
					<el-menu 
						mode="vertical" 
						class="el-menu-vertical-demo" 
						:collapse="collapse" 
						:default-active="$route.path"
						background-color="#324057" 
						text-color="#fff">
						<div class="wrapper" ref="wrapper">
							<Menu :items='items'/>
						</div>
					</el-menu>
				</el-col>	
			</el-row>
		
	</div>
</template>

<script>
import bus from "../common/bus";
import Menu from "./Menu";
import Bscroll from 'better-scroll'
// @ is an alias to /src
export default {
  name: "LeftMenu",
  data() {
    return {
      collapse: false,
      items: [
        // {
        //   icon: "el-icon-menu",
        //   name: "首页",
        //   path: "/home"
        // },
        // {
        //   icon: "el-icon-service",
        //   name: "用户信息",
        //   path: "/staff"
        // },
        // {
        //   icon: "el-icon-mobile-phone",
        //   name: "信息列表",
        //   path: "/listuser"
        // },
        {
          icon: "el-icon-document",
          name: "课程管理",
          path: "fund",
          children: [
            {
              path: "/course/type",
              name: "类型管理"
            },
            {
              path: "/course/info",
              name: "详情管理"
            },
            {
              path: "/course/section",
              name: "章节管理"
            },
            {
              path: "/course/comment",
              name: "评论管理"
            },
          ]
        },
        {
          icon: "el-icon-user",
          name: "用户管理",
          path: "/info",
          children: [
            {
              path: "/user/manage",
              name: "账号管理"
            },
            {
              path: "/user/role",
              name: "权限设置"
            },
          ]
        },
        {
          icon: "el-icon-setting",
          name: "系统管理",
          path: "/setting",
          children: [
            {
              path: "/user/common",
              name: "首页评论管理"
            },
          ]
        },
      ]
    };
  },
  components: {
    Menu
  },
  methods:{
		initScroll() {
			this.scroll = new Bscroll(this.$refs.wrapper, {
			})
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.initScroll()
		})
	},
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>
<style scoped>
	.menu_page {
		position: fixed;
		top: 71px;
		left: 0;
		min-height: 100%;
		background-color: #324057;
		z-index: 99;	
	}
	.sidebar {
		position: relative;
		overflow: hidden;
	}
	.wrapper {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		min-height: 500px;
		overflow: hidden;
	}
	.sidebar::-webkit-scrollbar {
		width: 0;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 250px;
	}

	.el-menu {
		border: none;
		z-index: 9999;
	}

	.fa-margin {
		margin-right: 5px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 180px;
		min-height: 400px;
	}

	.el-menu-vertical-demo {
		width: 49px;
	}

	.el-submenu .el-menu-item {
		min-width: 180px;
	}

	.hiddenDropdown,
	.hiddenDropname {
		display: none;
	}

	a {
		text-decoration: none;
	}
</style>

