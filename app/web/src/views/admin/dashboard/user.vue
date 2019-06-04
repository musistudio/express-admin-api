<template>
  <div class="user">
    <!-- 按钮组 -->
    <a-row :gutter="10" class="buttons">
      <a-col class="gutter-row" :span="1" :offset="21">
        <a-button
          type="primary"
          shape="circle"
          icon="plus"
          size="large"
          @click="getRoleData();addUserVisible = true;"
        />
      </a-col>
      <a-col class="gutter-row" :span="1">
        <a-button type="primary" shape="circle" icon="delete" size="large" @click="delUsers"/>
      </a-col>
      <a-col class="gutter-row" :span="1">
        <a-button type="primary" shape="circle" icon="reload" size="large" @click="refreshData"/>
      </a-col>
    </a-row>
    <!-- 表格 -->
    <a-spin :spinning="spinning">
      <a-table :columns="columns" :dataSource="data" :rowSelection="rowSelection" size="small">
        <template v-for="col in ['username']" :slot="col" slot-scope="text, record, index">
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>{{text}}</template>
          </div>
        </template>
        <!-- 权限列 -->
        <template slot-scope="text, record" slot="roles">
          <span v-if="!record.editable">
            <a-tag v-for="tag in text" color="blue" :key="tag">{{tag}}</a-tag>
          </span>
          <span v-else>
            <a-popconfirm
              title="是否删除此权限?"
              okText="删除"
              cancelText="取消"
              v-for="(t, index) in text"
              :key="t"
              @confirm="() => delRole(record.key, index)"
            >
              <a-tag color="red">
                {{t}}
                <a-icon type="close"/>
              </a-tag>
            </a-popconfirm>
            <a-button type="dashed" icon="plus" size="small" @click="addRole"></a-button>
          </span>
        </template>
        <!-- 操作列 -->
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <a-button-group v-if="record.editable" size="small">
              <a-button type="primary" @click="() => save(record.key)">保存</a-button>
              <a-popconfirm
                title="确认取消?"
                @confirm="() => cancel(record.key)"
                cancelText="取消"
                okText="确定"
              >
                <a-button type="dashed">取消</a-button>
              </a-popconfirm>
            </a-button-group>
            <a-button-group v-else size="small">
              <a-button type="primary" ghost @click="() => edit(record.key)">编辑</a-button>
              <a-popconfirm
                title="确认删除?"
                @confirm="() => handleDelete(record.key)"
                cancelText="取消"
                okText="确定"
              >
                <a-button type="danger" ghost>删除</a-button>
              </a-popconfirm>
            </a-button-group>
          </div>
        </template>
      </a-table>
    </a-spin>
    <!-- 修改角色模态框 -->
    <a-modal
      title="添加角色"
      :visible="editRolevisible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="editRolevisible = false;"
    >
      <a-transfer
        :dataSource="mockData"
        :listStyle="{
          width: '180px',
          height: '300px',
        }"
        :titles="['系统权限组', '用户权限组']"
        :locale="{ itemUnit: '项', itemUnit: '项', notFoundContent: '列表为空' }"
        :operations="['添加', '移除']"
        :targetKeys="targetKeys"
        @change="handleAddRole"
        :render="item=>`${item.title}-${item.description}`"
      >
        <a-button
          size="small"
          style="float:right;margin: 5px"
          @click="getMock"
          slot="footer"
        >重新加载</a-button>
        <span slot="notFoundContent">没数据</span>
      </a-transfer>
    </a-modal>

    <!-- 添加新用户模态框 -->
    <a-modal
      title="添加新用户"
      v-model="addUserVisible"
      @ok="handleNewUser"
      okText="确认"
      cancelText="取消"
      width="400px"
    >
      <div class="content">
        <div style="margin-bottom: 16px; width: 300px">
          <a-input addonBefore="用户名" placeholder="请输入用户名" v-model="addUserForm.username"/>
        </div>
        <div style="margin-bottom: 16px; width: 300px">
          <a-input addonBefore="密码" placeholder="请输入密码" type="password" v-model="addUserForm.password"/>
        </div>
        <a-select
          mode="multiple"
          placeholder="请添加角色(可多选)"
          style="width: 300px"
          @change="changeSelect"
          @popupScroll="popupScroll"
        >
          <a-select-option v-for="role in roles" :key="role.id">{{role.name}}</a-select-option>
        </a-select>
      </div>
    </a-modal>
  </div>
</template>
<script>
const roles = ["用户", "管理员", "超级管理员", "微信用户"];
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    scopedSlots: { customRender: "id" }
  },
  {
    title: "用户名",
    dataIndex: "username",
    scopedSlots: { customRender: "username" }
  },
  {
    title: "角色",
    dataIndex: "roles",
    width: "50%",
    scopedSlots: { customRender: "roles" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "12%",
    scopedSlots: { customRender: "operation" }
  }
];

const data = [];

export default {
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data: null,
      columns,
      selectedRows: null,
      spinning: false,
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
          this.selectedRows = selectedRows;
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows);
        }
      },
      tempData: null,
      ModalText: "Content of the modal",
      editRolevisible: false,
      addUserVisible: false,
      confirmLoading: false,
      mockData: [],
      targetKeys: [],
      roles: [],
      addRoleByRow: null,
      addUserForm: {}
    };
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      this.tempData = [];
      this.data.forEach((data, index)=>{
        if(data.id == key){
          this.addRoleByRow = index
        }
      })
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        let {id, key, username, roles} = target;
        let rls = [];
        roles.forEach(rl=>{
          rls.push(rl)
        })
        this.tempData = {id, key, username, roles: rls}
        target.editable = true;
        this.data = newData;
      }
    },
    // 删除单条记录
    handleDelete(key) {
      this.$ajax({
        method: 'delete',
        url: '/admin/dashboard/user',
        data: {
          id: key
        }
      })
      .then((result) => {
        if(result.data.code === 200) {
          this.$message.success(result.data.msg);
          this.getUserData();
        }else{
          this.$message.error('删除失败:'+result.data.msg);
        }
      }).catch((err) => {
        this.$message.error('删除失败，未知错误');
        console.log(err)
      });
    },
    // 删除多条记录
    delUsers() {
      if(!this.selectedRows){
        return this.$message.warning('当前没有选中任何数据');
      }
      let id = []
      this.selectedRows.forEach(row=>{
        id.push(row.id)
      })
      this.$ajax({
        method: 'delete',
        url: '/admin/dashboard/user',
        data: {
          id: id.join(',')
        }
      })
      .then((result) => {
        if(result.data.code === 200) {
          this.$message.success(result.data.msg);
          this.getUserData();
        }else{
          this.$message.error('删除失败:'+result.data.msg);
        }
      }).catch((err) => {
        this.$message.error('删除失败，未知错误');
        console.log(err)
      });
    },
    // 保存修改
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.tempData = null;
      if (target) {
        delete target.editable;
        let roles = [];
        target.roles.forEach(role=>{
          roles.push(this.roles.filter(item=> item.name == role)[0].id)
        })
        target.roles = roles;
        this.$ajax({
          method: 'put',
          url: '/admin/dashboard/user',
          data: target
        })
        .then(result => {
            if (result.data.code === 200) {
              this.$message.success(result.data.msg);
              this.getUserData();
            } else {
              this.$message.error(result.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error("修改失败");
          });
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        target.username = this.tempData.username;
        target.roles = this.tempData.roles;
        this.data = newData;
      }
    },
    // 删除角色
    delRole(key, index) {
      let target = this.data.filter(item => key === item.key)[0];
      target["roles"].splice(index, 1);
    },
    // 添加角色
    addRole() {
      this.getMock();
      this.editRolevisible = true;
    },
    // 添加权限模态框确认按钮
    handleOk(e) {
      this.data[this.addRoleByRow]["roles"] = [];
      this.targetKeys.forEach(key => {
        this.data[this.addRoleByRow]["roles"].push(this.roles.filter(item => key == item.id)[0]['name']);
        this.editRolevisible = false;
      });
    },
    // 权限模态框mock数据
    getMock() {
      this.getRoleData();
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < this.roles.length; i++) {
        mockData.push({
          key: this.roles[i].id.toString(),
          title: this.roles[i].name,
          description: this.roles[i].description
        });
      }
      this.data[this.addRoleByRow]["roles"].forEach(role => {
        this.roles.forEach(ro=>{
          if(ro.name == role){
            targetKeys.push(ro.id.toString());
          }
        })
      });
      this.targetKeys = targetKeys;
      this.mockData = mockData;
    },
    handleAddRole(targetKeys, direction, moveKeys) {
      this.targetKeys = targetKeys;
    },
    handleNewUser() {
      this.$ajax({
        method: 'post',
        url: '/admin/dashboard/user',
        data: {
          username: this.addUserForm.username,
          password: this.addUserForm.password,
          roles: this.addUserForm.roles.join(',')
        }
      })
      .then((result) => {
        if(result.data.code === 200) {
          this.$message.success(result.data.msg);
          this.getUserData();
        }else{
          this.$message.error('创建失败:'+result.data.msg);
        }
        this.addUserVisible = false;
      }).catch((err) => {
        console.log(err)
        this.$message.error('创建失败，未知错误');
        this.addUserVisible = false;
      });
    },
    changeSelect(value) {
      if(this.addUserForm.roles) {
        this.addUserForm.roles.push(value)
      }else{
        this.addUserForm.roles = [];
        this.addUserForm.roles.push(value);
      }
    },
    popupScroll() {
      console.log("popupScroll");
    },
    // 刷新数据
    refreshData() {
      this.getUserData();
    },
    getUserData() {
      this.spinning = true;
      this.$ajax({
        method: 'get',
        url: '/admin/dashboard/user',
      })
      .then((result) => {
        let res = [];
        let datas = result.data.users;
        datas.forEach(data=>{
          res.push({
            key: data.id,
            id: data.id,
            username: data.username,
            roles: data.roles
          })
        })
        this.data = res;
        this.spinning = false;
      }).catch((err) => {
        console.log(err);
        this.spinning = false;
      });
    },
    getRoleData() {
      this.$ajax({
        method: 'get',
        url: '/admin/dashboard/role'
      })
      .then((result) => {
        let res = [];
        let datas = result.data;
        datas.forEach(data=>{
          res.push({
            id: data.id,
            name: data.rolename,
            description: data.desc
          })
        })
        this.roles = res;
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  created() {
    this.getUserData();
    this.getRoleData();
  }
};
</script>
<style scoped lang="less">
.user {
  width: 98%;
  margin: 0 auto;
  padding-top: 20px;
  .buttons {
    margin-bottom: 10px;
    padding-right: 10px;
  }
  .gutter-row {
    text-align: right;
  }
}
.content {
  width: 300px;
  margin: 0 auto;
}
.ant-table-body {
  margin: 0;
}
.editable-row-operations a {
  margin-right: 8px;
}
.ant-input {
  width: 100px;
  margin: 0 8px 8px 0;
}
</style>
