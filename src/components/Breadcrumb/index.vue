<template>
  <div class="info">
    <div class="current-menu">{{ $route.meta.title }}</div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
          <span
            v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
            class="no-redirect"
          >
            {{ item.meta.title }}
          </span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      const first = matched[0];

      if (!this.isDashboard(first)) {
        matched = [{ path: "/dashboard", meta: { title: "Dashboard" } }].concat(matched);
      }

      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
      console.log(this.levelList);
    },
    isDashboard(route) {
      console.log(route);
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
    },
  },
};
</script>

<style lang="less" scoped>
.info {
  display: flex;
  width: 100vw;
  justify-content: space-between;
  overflow: hidden;
  align-items: center;
}
.current-menu {
  color: #fff;
  font-size: 16px;
  line-height: 36px;
  padding-left: 40px;
  width: 165px;
  height: 36px;
  background: url("@/assets/menu.png") no-repeat;
  background-size: contain;
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  width: 240px;
  overflow: hidden;
  // margin-right: 80px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
/* breadcrumb transition */
.breadcrumb-enter-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(-20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
