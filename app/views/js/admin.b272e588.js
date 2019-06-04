(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admin"],{"147b":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"user"},[a("a-row",{staticClass:"buttons",attrs:{gutter:10}},[a("a-col",{staticClass:"gutter-row",attrs:{span:1,offset:21}},[a("a-button",{attrs:{type:"primary",shape:"circle",icon:"plus",size:"large"},on:{click:function(e){t.getRoleData(),t.addUserVisible=!0}}})],1),a("a-col",{staticClass:"gutter-row",attrs:{span:1}},[a("a-button",{attrs:{type:"primary",shape:"circle",icon:"delete",size:"large"},on:{click:t.delUsers}})],1),a("a-col",{staticClass:"gutter-row",attrs:{span:1}},[a("a-button",{attrs:{type:"primary",shape:"circle",icon:"reload",size:"large"},on:{click:t.refreshData}})],1)],1),a("a-spin",{attrs:{spinning:t.spinning}},[a("a-table",{attrs:{columns:t.columns,dataSource:t.data,rowSelection:t.rowSelection,size:"small"},scopedSlots:t._u([t._l(["username"],function(e){return{key:e,fn:function(s,o,n){return[a("div",{key:e},[o.editable?a("a-input",{staticStyle:{margin:"-5px 0"},attrs:{value:s},on:{change:function(a){return t.handleChange(a.target.value,o.key,e)}}}):[t._v(t._s(s))]],2)]}}}),{key:"roles",fn:function(e,s){return[s.editable?a("span",[t._l(e,function(e,o){return a("a-popconfirm",{key:e,attrs:{title:"是否删除此权限?",okText:"删除",cancelText:"取消"},on:{confirm:function(){return t.delRole(s.key,o)}}},[a("a-tag",{attrs:{color:"red"}},[t._v("\n              "+t._s(e)+"\n              "),a("a-icon",{attrs:{type:"close"}})],1)],1)}),a("a-button",{attrs:{type:"dashed",icon:"plus",size:"small"},on:{click:t.addRole}})],2):a("span",t._l(e,function(e){return a("a-tag",{key:e,attrs:{color:"blue"}},[t._v(t._s(e))])}),1)]}},{key:"operation",fn:function(e,s,o){return[a("div",{staticClass:"editable-row-operations"},[s.editable?a("a-button-group",{attrs:{size:"small"}},[a("a-button",{attrs:{type:"primary"},on:{click:function(){return t.save(s.key)}}},[t._v("保存")]),a("a-popconfirm",{attrs:{title:"确认取消?",cancelText:"取消",okText:"确定"},on:{confirm:function(){return t.cancel(s.key)}}},[a("a-button",{attrs:{type:"dashed"}},[t._v("取消")])],1)],1):a("a-button-group",{attrs:{size:"small"}},[a("a-button",{attrs:{type:"primary",ghost:""},on:{click:function(){return t.edit(s.key)}}},[t._v("编辑")]),a("a-popconfirm",{attrs:{title:"确认删除?",cancelText:"取消",okText:"确定"},on:{confirm:function(){return t.handleDelete(s.key)}}},[a("a-button",{attrs:{type:"danger",ghost:""}},[t._v("删除")])],1)],1)],1)]}}],null,!0)})],1),a("a-modal",{attrs:{title:"添加角色",visible:t.editRolevisible,confirmLoading:t.confirmLoading},on:{ok:t.handleOk,cancel:function(e){t.editRolevisible=!1}}},[a("a-transfer",{attrs:{dataSource:t.mockData,listStyle:{width:"180px",height:"300px"},titles:["系统权限组","用户权限组"],locale:{itemUnit:"项",itemUnit:"项",notFoundContent:"列表为空"},operations:["添加","移除"],targetKeys:t.targetKeys,render:function(t){return t.title+"-"+t.description}},on:{change:t.handleAddRole}},[a("a-button",{staticStyle:{float:"right",margin:"5px"},attrs:{slot:"footer",size:"small"},on:{click:t.getMock},slot:"footer"},[t._v("重新加载")]),a("span",{attrs:{slot:"notFoundContent"},slot:"notFoundContent"},[t._v("没数据")])],1)],1),a("a-modal",{attrs:{title:"添加新用户",okText:"确认",cancelText:"取消",width:"400px"},on:{ok:t.handleNewUser},model:{value:t.addUserVisible,callback:function(e){t.addUserVisible=e},expression:"addUserVisible"}},[a("div",{staticClass:"content"},[a("div",{staticStyle:{"margin-bottom":"16px",width:"300px"}},[a("a-input",{attrs:{addonBefore:"用户名",placeholder:"请输入用户名"},model:{value:t.addUserForm.username,callback:function(e){t.$set(t.addUserForm,"username",e)},expression:"addUserForm.username"}})],1),a("div",{staticStyle:{"margin-bottom":"16px",width:"300px"}},[a("a-input",{attrs:{addonBefore:"密码",placeholder:"请输入密码",type:"password"},model:{value:t.addUserForm.password,callback:function(e){t.$set(t.addUserForm,"password",e)},expression:"addUserForm.password"}})],1),a("a-select",{staticStyle:{width:"300px"},attrs:{mode:"multiple",placeholder:"请添加角色(可多选)"},on:{change:t.changeSelect,popupScroll:t.popupScroll}},t._l(t.roles,function(e){return a("a-select-option",{key:e.id},[t._v(t._s(e.name))])}),1)],1)])],1)},o=[],n=(a("0857"),a("7364"),a("f763"),a("4964")),r=a("e20c"),i=[{title:"ID",dataIndex:"id",scopedSlots:{customRender:"id"}},{title:"用户名",dataIndex:"username",scopedSlots:{customRender:"username"}},{title:"角色",dataIndex:"roles",width:"50%",scopedSlots:{customRender:"roles"}},{title:"操作",dataIndex:"operation",width:"12%",scopedSlots:{customRender:"operation"}}],l=[],c={data:function(){var t=this;return this.cacheData=l.map(function(t){return Object(r["a"])({},t)}),{data:null,columns:i,selectedRows:null,spinning:!1,rowSelection:{onChange:function(e,a){console.log("selectedRowKeys: ".concat(e),"selectedRows: ",a),t.selectedRows=a},onSelect:function(t,e,a){console.log(t,e,a)},onSelectAll:function(t,e,a){console.log(t,e,a)}},tempData:null,ModalText:"Content of the modal",editRolevisible:!1,addUserVisible:!1,confirmLoading:!1,mockData:[],targetKeys:[],roles:[],addRoleByRow:null,addUserForm:{}}},methods:{handleChange:function(t,e,a){var s=Object(n["a"])(this.data),o=s.filter(function(t){return e===t.key})[0];o&&(o[a]=t,this.data=s)},edit:function(t){var e=this;this.tempData=[],this.data.forEach(function(a,s){a.id==t&&(e.addRoleByRow=s)});var a=Object(n["a"])(this.data),s=a.filter(function(e){return t===e.key})[0];if(s){var o=s.id,r=s.key,i=s.username,l=s.roles,c=[];l.forEach(function(t){c.push(t)}),this.tempData={id:o,key:r,username:i,roles:c},s.editable=!0,this.data=a}},handleDelete:function(t){var e=this;this.$ajax({method:"delete",url:"/admin/dashboard/user",data:{id:t}}).then(function(t){200===t.data.code?(e.$message.success(t.data.msg),e.getUserData()):e.$message.error("删除失败:"+t.data.msg)}).catch(function(t){e.$message.error("删除失败，未知错误"),console.log(t)})},delUsers:function(){var t=this;if(!this.selectedRows)return this.$message.warning("当前没有选中任何数据");var e=[];this.selectedRows.forEach(function(t){e.push(t.id)}),this.$ajax({method:"delete",url:"/admin/dashboard/user",data:{id:e.join(",")}}).then(function(e){200===e.data.code?(t.$message.success(e.data.msg),t.getUserData()):t.$message.error("删除失败:"+e.data.msg)}).catch(function(e){t.$message.error("删除失败，未知错误"),console.log(e)})},save:function(t){var e=this,a=Object(n["a"])(this.data),s=a.filter(function(e){return t===e.key})[0];if(this.tempData=null,s){delete s.editable;var o=[];s.roles.forEach(function(t){o.push(e.roles.filter(function(e){return e.name==t})[0].id)}),s.roles=o,this.$ajax({method:"put",url:"/admin/dashboard/user",data:s}).then(function(t){200===t.data.code?(e.$message.success(t.data.msg),e.getUserData()):e.$message.error(t.data.msg)}).catch(function(t){console.log(t),e.$message.error("修改失败")})}},cancel:function(t){var e=Object(n["a"])(this.data),a=e.filter(function(e){return t===e.key})[0];a&&(delete a.editable,a.username=this.tempData.username,a.roles=this.tempData.roles,this.data=e)},delRole:function(t,e){var a=this.data.filter(function(e){return t===e.key})[0];a["roles"].splice(e,1)},addRole:function(){this.getMock(),this.editRolevisible=!0},handleOk:function(t){var e=this;this.data[this.addRoleByRow]["roles"]=[],this.targetKeys.forEach(function(t){e.data[e.addRoleByRow]["roles"].push(e.roles.filter(function(e){return t==e.id})[0]["name"]),e.editRolevisible=!1})},getMock:function(){var t=this;this.getRoleData();for(var e=[],a=[],s=0;s<this.roles.length;s++)a.push({key:this.roles[s].id.toString(),title:this.roles[s].name,description:this.roles[s].description});this.data[this.addRoleByRow]["roles"].forEach(function(a){t.roles.forEach(function(t){t.name==a&&e.push(t.id.toString())})}),this.targetKeys=e,this.mockData=a},handleAddRole:function(t,e,a){this.targetKeys=t},handleNewUser:function(){var t=this;this.$ajax({method:"post",url:"/admin/dashboard/user",data:{username:this.addUserForm.username,password:this.addUserForm.password,roles:this.addUserForm.roles.join(",")}}).then(function(e){200===e.data.code?(t.$message.success(e.data.msg),t.getUserData()):t.$message.error("创建失败:"+e.data.msg),t.addUserVisible=!1}).catch(function(e){console.log(e),t.$message.error("创建失败，未知错误"),t.addUserVisible=!1})},changeSelect:function(t){this.addUserForm.roles?this.addUserForm.roles.push(t):(this.addUserForm.roles=[],this.addUserForm.roles.push(t))},popupScroll:function(){console.log("popupScroll")},refreshData:function(){this.getUserData()},getUserData:function(){var t=this;this.spinning=!0,this.$ajax({method:"get",url:"/admin/dashboard/user"}).then(function(e){var a=[],s=e.data.users;s.forEach(function(t){a.push({key:t.id,id:t.id,username:t.username,roles:t.roles})}),t.data=a,t.spinning=!1}).catch(function(e){console.log(e),t.spinning=!1})},getRoleData:function(){var t=this;this.$ajax({method:"get",url:"/admin/dashboard/role"}).then(function(e){var a=[],s=e.data;s.forEach(function(t){a.push({id:t.id,name:t.rolename,description:t.desc})}),t.roles=a}).catch(function(t){console.log(t)})}},created:function(){this.getUserData(),this.getRoleData()}},d=c,u=(a("885f"),a("17cc")),m=Object(u["a"])(d,s,o,!1,null,"a68092fa",null);e["default"]=m.exports},"2eef":function(t,e,a){"use strict";var s=a("e7da"),o=a.n(s);o.a},3529:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v("权限管理")])},o=[],n={data:function(){return{}},components:{},computed:{},methods:{}},r=n,i=a("17cc"),l=Object(i["a"])(r,s,o,!1,null,"173a89b4",null);e["default"]=l.exports},"35b0":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login"},[a("div",{staticClass:"l-box"},[a("h1",{staticClass:"title"},[t._v("Easily-Admin管理后台")]),a("a-form",{staticClass:"form-item",attrs:{form:t.form},on:{submit:t.handleSubmit}},[a("a-form-item",{attrs:{"wrapper-col":{span:14,offset:5}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["username",{rules:[{required:!0,message:"用户名不能为空"}]}],expression:"[\n            'username',\n            { rules: [{ required: true, message: '用户名不能为空' }] }\n          ]"}],attrs:{placeholder:"用户名"}},[a("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),a("a-form-item",{attrs:{"wrapper-col":{span:14,offset:5}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:"密码不能为空"}]}],expression:"[\n            'password',\n            { rules: [{ required: true, message: '密码不能为空' }] }\n          ]"}],attrs:{placeholder:"密码",type:"password"}},[a("a-icon",{staticStyle:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"lock"},slot:"prefix"})],1)],1),a("a-form-item",{attrs:{"wrapper-col":{span:14,offset:5}}},[a("a-button",{attrs:{type:"primary","html-type":"submit",block:""}},[t._v("登陆")])],1)],1)],1)])},o=[],n={data:function(){return{form:this.$form.createForm(this)}},components:{},computed:{},methods:{handleSubmit:function(t){var e=this;t.preventDefault(),this.form.validateFields(function(t,a){t||e.$ajax({method:"post",url:"/admin/login",data:{username:a.username,password:a.password}}).then(function(t){200===t.data.code?(e.$message.success("登陆成功！"),e.$store.commit("login",t.data.token),e.$router.push("/admin")):e.$message.error("登陆失败，用户名或密码错误")}).catch(function(t){console.log(t)})})}}},r=n,i=(a("2eef"),a("17cc")),l=Object(i["a"])(r,s,o,!1,null,"828a2736",null);e["default"]=l.exports},8700:function(t,e,a){},"885f":function(t,e,a){"use strict";var s=a("8700"),o=a.n(s);o.a},"92ba":function(t,e,a){"use strict";var s=a("f20e"),o=a.n(s);o.a},e7da:function(t,e,a){},eff2:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"role"},[a("a-row",{staticClass:"buttons",attrs:{gutter:10}},[a("a-col",{staticClass:"gutter-row",attrs:{span:1,offset:21}},[a("a-button",{attrs:{type:"primary",shape:"circle",icon:"plus",size:"large"},on:{click:function(e){t.addRoleVisible=!0}}})],1),a("a-col",{staticClass:"gutter-row",attrs:{span:1}},[a("a-button",{attrs:{type:"primary",shape:"circle",icon:"delete",size:"large"},on:{click:t.delRoles}})],1),a("a-col",{staticClass:"gutter-row",attrs:{span:1}},[a("a-button",{attrs:{type:"primary",shape:"circle",icon:"reload",size:"large"},on:{click:t.refreshData}})],1)],1),a("a-spin",{attrs:{spinning:t.spinning}},[a("a-table",{attrs:{columns:t.columns,dataSource:t.data,rowSelection:t.rowSelection,size:"small"},scopedSlots:t._u([t._l(["name","description"],function(e){return{key:e,fn:function(s,o,n){return[a("div",{key:e},[o.editable?a("a-input",{staticStyle:{margin:"-5px 0"},attrs:{value:s},on:{change:function(a){return t.handleChange(a.target.value,o.key,e)}}}):[t._v(t._s(s))]],2)]}}}),{key:"operation",fn:function(e,s,o){return[a("div",{staticClass:"editable-row-operations"},[s.editable?a("a-button-group",{attrs:{size:"small"}},[a("a-button",{attrs:{type:"primary"},on:{click:function(){return t.save(s.key)}}},[t._v("保存")]),a("a-popconfirm",{attrs:{title:"确认取消?",cancelText:"取消",okText:"确定"},on:{confirm:function(){return t.cancel(s.key)}}},[a("a-button",{attrs:{type:"dashed"}},[t._v("取消")])],1)],1):a("a-button-group",{attrs:{size:"small"}},[a("a-button",{attrs:{type:"primary",ghost:""},on:{click:function(){return t.edit(s.key)}}},[t._v("编辑")]),a("a-popconfirm",{attrs:{title:"确认删除?",cancelText:"取消",okText:"确定"},on:{confirm:function(){return t.handleDelete(s.key)}}},[a("a-button",{attrs:{type:"danger",ghost:""}},[t._v("删除")])],1)],1)],1)]}}],null,!0)})],1),a("a-modal",{attrs:{title:"添加新角色",okText:"确认",cancelText:"取消",width:"400px"},on:{ok:t.handleAddRole},model:{value:t.addRoleVisible,callback:function(e){t.addRoleVisible=e},expression:"addRoleVisible"}},[a("div",{staticClass:"content"},[a("div",{staticStyle:{"margin-bottom":"16px",width:"300px"}},[a("a-input",{attrs:{addonBefore:"角色名称",placeholder:"请输入角色名称"},model:{value:t.addRoleForm.name,callback:function(e){t.$set(t.addRoleForm,"name",e)},expression:"addRoleForm.name"}})],1),a("div",{staticStyle:{"margin-bottom":"16px",width:"300px"}},[a("a-input",{attrs:{addonBefore:"角色描述",placeholder:"请输入角色描述"},model:{value:t.addRoleForm.desc,callback:function(e){t.$set(t.addRoleForm,"desc",e)},expression:"addRoleForm.desc"}})],1)])])],1)},o=[],n=(a("f763"),a("7364"),a("4964")),r=a("e20c"),i=[{title:"ID",dataIndex:"id",scopedSlots:{customRender:"id"}},{title:"角色名称",dataIndex:"name",scopedSlots:{customRender:"name"}},{title:"角色描述",dataIndex:"description",width:"50%",scopedSlots:{customRender:"description"}},{title:"操作",dataIndex:"operation",width:"12%",scopedSlots:{customRender:"operation"}}],l=[],c={data:function(){var t=this;return this.cacheData=l.map(function(t){return Object(r["a"])({},t)}),{data:l,columns:i,selectedRows:null,spinning:!1,rowSelection:{onChange:function(e,a){console.log("selectedRowKeys: ".concat(e),"selectedRows: ",a),t.selectedRows=a},onSelect:function(t,e,a){console.log(t,e,a)},onSelectAll:function(t,e,a){console.log(t,e,a)}},tempData:null,addRoleVisible:!1,addRoleForm:{}}},methods:{handleChange:function(t,e,a){var s=Object(n["a"])(this.data),o=s.filter(function(t){return e===t.key})[0];o&&(o[a]=t,this.data=s)},edit:function(t){var e=Object(n["a"])(this.data),a=e.filter(function(e){return t===e.key})[0],s=a.id,o=a.name,r=a.description;this.tempData={id:s,name:o,description:r},a&&(a.editable=!0,this.data=e)},handleDelete:function(t){var e=this;this.$ajax({method:"delete",url:"/admin/dashboard/role",data:{id:t}}).then(function(t){200===t.data.code?(e.$message.success(t.data.msg),e.getRoleData()):e.$message.error(t.data.msg)}).catch(function(t){console.log(t),e.$message.error("删除失败")})},delRoles:function(){var t=this,e=[];Object(n["a"])(this.data);this.selectedRows.forEach(function(t){e.push(t.id)}),this.$ajax({method:"delete",url:"/admin/dashboard/role",data:{id:e.join(",")}}).then(function(e){200===e.data.code?(t.$message.success(e.data.msg),t.getRoleData()):t.$message.error(e.data.msg)}).catch(function(e){console.log(e),t.$message.error("删除失败")})},save:function(t){var e=this,a=Object(n["a"])(this.data),s=a.filter(function(e){return t===e.key})[0];this.tempData=null,s&&(delete s.editable,this.$ajax({method:"put",url:"/admin/dashboard/role",data:s}).then(function(t){200===t.data.code?(e.$message.success(t.data.msg),e.getRoleData()):e.$message.error(t.data.msg)}).catch(function(t){console.log(t),e.$message.error("修改失败")}))},cancel:function(t){var e=Object(n["a"])(this.data),a=e.filter(function(e){return t===e.key})[0];a&&(a.id=this.tempData.id,a.name=this.tempData.name,a.description=this.tempData.description,delete a.editable,this.data=e)},handleAddRole:function(){var t=this;this.$ajax({method:"post",url:"/admin/dashboard/role",data:this.addRoleForm}).then(function(e){200===e.data.code?(t.$message.success(e.data.msg),t.getRoleData(),t.addRoleForm={}):t.$message.error(e.data.msg)}).catch(function(e){console.log(e),t.$message.error("添加失败")}),this.addRoleVisible=!1},refreshData:function(){this.getRoleData()},getRoleData:function(){var t=this;this.$ajax({method:"get",url:"/admin/dashboard/role"}).then(function(e){t.spinning=!0;var a=[],s=e.data;s.forEach(function(t){a.push({key:t.id,id:t.id,name:t.rolename,description:t.desc})}),t.data=a,t.spinning=!1}).catch(function(e){console.log(e),t.spinning=!1})}},created:function(){this.getRoleData()}},d=c,u=(a("92ba"),a("17cc")),m=Object(u["a"])(d,s,o,!1,null,"dac024c8",null);e["default"]=m.exports},f20e:function(t,e,a){}}]);
//# sourceMappingURL=admin.b272e588.js.map