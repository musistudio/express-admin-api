import Vue from "vue";
import Router from "vue-router";
import BasicLayout from "./layouts/admin/BasicLayout";
import NotFound from "./views/404";
import forbbiden from "./views/403";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import findLast from "lodash/findLast";
import { checkRole, isLogin } from "./utils/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: BasicLayout,
      hideInMenu: true
    },
    {
      path: "/admin",
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "./layouts/admin/BasicLayout"),
      meta: { authority: ["超级管理员", "sadmin"] },
      children: [
        // dashboard
        {
          path: "dashboard",
          name: "DashBoard",
          component: { render: h => h("router-view") },
          meta: {
            icon: "dashboard",
            title: "仪表盘",
            authority: ["超级管理员", "sadmin"]
          },
          children: [
            {
              path: "user",
              name: "user",
              meta: { title: "用户管理", authority: ["超级管理员", "sadmin"] },
              component: () =>
                import(/* webpackChunkName: "admin" */ "./views/admin/dashboard/user")
            },
            {
              path: "role",
              name: "role",
              meta: { title: "角色管理", authority: ["超级管理员", "sadmin"] },
              component: () =>
                import(/* webpackChunkName: "admin" */ "./views/admin/dashboard/role")
            },
            {
              path: "auth",
              name: "auth",
              meta: { title: "权限管理", authority: ["超级管理员", "sadmin"] },
              component: () =>
                import(/* webpackChunkName: "admin" */ "./views/admin/dashboard/auth")
            }
          ]
        }
      ]
    },
    {
      path: "/admin/login",
      component: () =>
        import(/* webpackChunkName: "admin" */ "./views/admin/login")
    },
    {
      path: "/403",
      component: forbbiden
    },
    {
      path: "*",
      component: NotFound
    }
  ]
});

// 开启路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start(); // 开启路由进度条
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && isLogin()) {
    // 如果需要权限并且用户已登录
    if (!checkRole(record.meta.authority)) {
      // 如果没有权限则跳转到403页面
      next({
        path: "/403"
      });
    } else {
      next();
    }
  } else if (record && !isLogin()) {
    // 如果需要权限且用户未登陆则跳转到登录页
    next({
      path: "/admin/login"
    });
  } else {
    next();
  }
  NProgress.done(); // 路由加载完成关闭进度条
});
router.afterEach(() => {
  NProgress.done(); // 路由加载完成关闭进度条
});

export default router;
