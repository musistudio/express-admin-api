<template>
  <div>
    <a-menu
      :defaultOpenKeys="openKeys"
      :selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      @click="handleClick"
      :inlineCollapsed="collapsed"
    >
      <template v-for="item in MenuData">
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon"/>
          <span>{{item.meta.title}}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path"/>
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from './SubMenu'
export default {
  components: {
    'sub-menu': SubMenu,
  },
  data () {
    const MenuData = this.getMenuData(this.$router.options.routes) 
    return {
      collapsed: false,
      MenuData,
      list: [],
    }
  },
  computed: {
    selectedKeys() {
      return [this.$route.path.split("/").pop()];
    },
    openKeys() {
      const path = this.$route.path.split("/");
      return [path[path.length - 2]];
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    // 从路由获取菜单
    getMenuData(routes) {
      const menuData = [];
      routes.forEach(route => {
        if(route.name && !route.hideInMenu) {
          // menuData.push(route)
          const newRoute = {...route}
          delete newRoute.children
          if(route.children && !route.hideChildrenInMenu) {
            newRoute.children = this.getMenuData(route.children)
          }
          menuData.push(newRoute)
        }
        else if(!route.hideInMenu && !route.hideChildrenInMenu && route.children) {
          menuData.push(...this.getMenuData(route.children))
        }
      });
      return menuData;
    },
    // 菜单点击事件
    handleClick(item) {
      // console.log(item)
      this.$router.push("/admin/" + item.keyPath[1] + "/" + item.keyPath[0])
    }
  },
}
</script>
