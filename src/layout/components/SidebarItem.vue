<template>
  <div v-if="!item.hidden">
    <template v-if="!item.children && !item.alwaysShow">
      <router-link v-if="item.meta" :to="resolvePath(item.path)">
        <el-menu-item :index="resolvePath(item.path)">
          {{ item.meta.title }}
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.path">
      <template slot="title">{{ item.meta.title }}</template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="item.path"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  methods: {
    resolvePath(routePath) {
      if (!this.basePath) return routePath;
      return this.basePath + "/" + routePath;
    },
  },
};
</script>
