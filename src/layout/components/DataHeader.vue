<template>
  <div class="header-wraper">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" />
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SidebarItem from "./SidebarItem";
import router from "@/router";
export default {
  components: {
    SidebarItem,
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      value: 1,
      routes: router.options.routes, // 获取路由配置,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    // ...mapState({
    //   routes: state => state.app.routes,
    // }),
  },
  mounted() {
    console.log(this.routes);
  },
};
</script>

<style lang="less">
.header-wraper {
  width: 1920px;
  height: 70px;
  background: url("@/assets/header-bg.png") no-repeat;
  background-size: contain;
}
.el-menu-demo {
  background-color: transparent !important;
  padding-top: 12px;
  padding-right: 112px;
  .el-menu--horizontal {
    border-bottom: none !important;
  }
  .el-menu-item.is-active,
  .el-submenu__title:focus,
  .el-submenu__title:hover {
    background-color: transparent !important;
    border-bottom: none !important;
    color: rgb(162, 184, 116) !important;
    background: url("@/assets/menu-bg1.png") no-repeat;
    background-size: contain;
  }
  .el-submenu__title i {
    display: none;
  }
  .el-submenu__title {
    width: 150px;
    height: 60px;
    color: #eee !important;
    border-bottom: none !important;
  }
  .el-menu-item.submenu-title-noDropdown,
  .el-submenu {
    margin-left: -25px;
  }
  .el-menu-item,
  .el-submenu {
    width: 150px;
    height: 60px;
    color: #eee !important;
    text-align: center;
    float: right !important;
    border-bottom: none !important;
    background-color: transparent !important;
    background: url("@/assets/menu-bg2.png") no-repeat;
    background-size: contain;
  }
  // .el-menu--horizontal > .el-menu-item:hover {
  //   background-color: transparent !important;
  //   background: url("@/assets/menu-bg1.png") no-repeat;
  //   background-size: contain;
  // }
}
.el-menu--popup,
.nest-menu .el-menu-item {
  background: rgb(3, 35, 113) !important;
  color: #eee !important;
  text-align: center;
  a {
    text-decoration: none;
  }
}
.nest-menu .el-menu-item {
  &.is-active,
  &:hover,
  &.is-active > .el-submenu__title {
    background: rgb(12, 55, 161) !important;
    color: rgb(162, 184, 116) !important;
  }
}
</style>
