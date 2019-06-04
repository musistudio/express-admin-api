import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  button,
  Layout,
  Menu,
  Icon,
  Form,
  Input,
  Message,
  Table,
  Popconfirm,
  Row,
  Col,
  Tag,
  Modal,
  Transfer,
  Select,
  Spin
} from "ant-design-vue";
import Auth from "./directives/auth";
// import axios from "axios";
import service from "./utils/request";

Vue.config.productionTip = false;

Vue.use(button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Form);
Vue.use(Input);
Vue.use(Table);
Vue.use(Popconfirm);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tag);
Vue.use(Modal);
Vue.use(Transfer);
Vue.use(Select);
Vue.use(Spin);

// 自定义鉴权指令
Vue.use(Auth);

Vue.prototype.$ajax = service;
// Vue.prototype.$request = request;
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
