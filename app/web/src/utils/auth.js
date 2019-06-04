const jwtDecode = require("jwt-decode");
import store from "../store";

// 校验JWT
const checkJWT = function(token) {
  try {
    const tokenData = jwtDecode(new Buffer(token, "base64").toString());
    return tokenData;
  } catch (error) {
    return false;
  }
};

// 用户权限
const role = function() {
  let roles = [];
  checkJWT(store.state.token).roles.forEach(role => {
    roles.push(role.rolename);
  });
  return store.state.token ? roles : false;
};

// 校验role
const checkRole = function(roles) {
  const myrole = role();
  return myrole ? myrole.some(item => roles.includes(item)) : false;
};

// 校验是否登录
const isLogin = function() {
  return store.state.token ? checkJWT(store.state.token) : false;
};

export { role, checkJWT, checkRole, isLogin };
