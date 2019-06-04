<template>
  <div id="components-layout-demo-basic">
    <a-layout style="min-height: 100vh;">
      <a-layout-sider collapsible v-model="collapsed" :trigger="null" width="256px">
        <div :class="[collapsed ? 'logo-collapsed' : 'logo']">{{collapsed ? 'EAdmin' : 'EAdmin后台管理系统'}}</div>
        <SideMenu/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="padding-left: 20px;">
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapsed = !collapsed" id="collapsed"></a-icon>
            <Header style="float:right;"/>
        </a-layout-header>
        <a-layout-content><router-view></router-view></a-layout-content>
        <a-layout-footer><Footer/></a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "./Header";
import SideMenu from "./SideMenu";
import Footer from "./Footer";

export default {
  data() {
    return {
      collapsed: false
    };
  },

  components: {
    Header,
    SideMenu,
    Footer
  },

  computed: {},

  methods: {}
};
</script>
<style lang="less" scoped>
.logo{
  color: #fff;
  text-align: center;
  font-size: 23px;
  padding: 13px 0;
}
.logo-collapsed{
  color: #fff;
  text-align: center;
  font-size: 16px;
  padding: 13px 0;
}
#collapsed {
  font-size: 20px;cursor: pointer
}
#collapsed:hover {
  background: #eee;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #fff;
  color: #001529;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: .1;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #001529;
}
#components-layout-demo-basic .ant-layout-content {
  color: #000;
  min-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>