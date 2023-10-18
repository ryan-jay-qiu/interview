import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/Dashboard",
  },

  {
    path: "/first",
    component: Layout,
    redirect: "/first/first_1",
    name: "first",
    meta: {
      title: "菜单一",
    },
    children: [
      {
        path: "first_1",
        component: () => import("@/views/dashboard/index"),
        name: "first_1",
        meta: { title: "菜单一_1" },
      },
      {
        path: "first_2",
        component: () => import("@/views/dashboard/index"),
        name: "first_2",
        meta: { title: "菜单一_2" },
      },
    ],
  },
  {
    path: "/second",
    component: Layout,
    name: "second",
    meta: { title: "菜单二" },
  },
  {
    path: "/third",
    component: Layout,
    redirect: "/third/third_1",
    name: "third",
    meta: {
      title: "菜单三",
    },
    children: [
      {
        path: "third_1",
        component: () => import("@/views/dashboard/index"),
        name: "third_1",
        meta: { title: "菜单三_1" },
      },
      {
        path: "third_2",
        component: () => import("@/views/dashboard/index"),
        name: "third_2",
        meta: { title: "菜单三_2" },
      },
    ],
  },
  {
    path: "/four",
    component: Layout,
    redirect: "/four/four_1",
    name: "four",
    meta: {
      title: "菜单一",
    },
    children: [
      {
        path: "four_1",
        component: () => import("@/views/dashboard/index"),
        name: "four_1",
        meta: { title: "菜单四_1" },
      },
      {
        path: "four_2",
        component: () => import("@/views/dashboard/index"),
        name: "four_2",
        meta: { title: "菜单四_2" },
      },
    ],
  },
  {
    path: "/five",
    component: Layout,
    redirect: "/five/five_1",
    name: "five",
    meta: {
      title: "菜单五",
    },
    children: [
      {
        path: "five_1",
        component: () => import("@/views/dashboard/index"),
        name: "five_1",
        meta: { title: "菜单五_1" },
      },
      {
        path: "five_2",
        component: () => import("@/views/dashboard/index"),
        name: "five_2",
        meta: { title: "菜单五_2" },
      },
    ],
  },
  {
    path: "/six",
    component: Layout,
    redirect: "/six/first_1",
    name: "six",
    meta: {
      title: "菜单一",
    },
    children: [
      {
        path: "six_1",
        component: () => import("@/views/dashboard/index"),
        name: "six_1",
        meta: { title: "菜单六_1" },
      },
      {
        path: "six_2",
        component: () => import("@/views/dashboard/index"),
        name: "six_2",
        meta: { title: "菜单六_2" },
      },
    ],
  },
  {
    path: "/seven",
    component: Layout,
    name: "seven",
    meta: { title: "菜单七" },
  },
  {
    path: "/eight",
    component: Layout,
    name: "eight",
    meta: { title: "菜单八" },
  },
  {
    path: "/nine",
    component: Layout,
    name: "nine",
    meta: { title: "菜单九" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
