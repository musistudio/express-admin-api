<template>
  <div class="role">
    <!-- 按钮组 -->
    <a-row :gutter="10" class="buttons">
      <a-col class="gutter-row" :span="1" :offset="21">
        <a-button
          type="primary"
          shape="circle"
          icon="plus"
          size="large"
          @click="addRoleVisible = true"
        />
      </a-col>
      <a-col class="gutter-row" :span="1">
        <a-button type="primary" shape="circle" icon="delete" size="large" @click="delRoles"/>
      </a-col>
      <a-col class="gutter-row" :span="1">
        <a-button type="primary" shape="circle" icon="reload" size="large" @click="refreshData"/>
      </a-col>
    </a-row>
    <!-- 表格 -->
    <a-spin :spinning="spinning">
      <a-table :columns="columns" :dataSource="data" :rowSelection="rowSelection" size="small">
        <template
          v-for="col in ['name', 'description']"
          :slot="col"
          slot-scope="text, record, index"
        >
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

    <!-- 添加新角色模态框 -->
    <a-modal
      title="添加新角色"
      v-model="addRoleVisible"
      @ok="handleAddRole"
      okText="确认"
      cancelText="取消"
      width="400px"
    >
      <div class="content">
        <div style="margin-bottom: 16px; width: 300px">
          <a-input addonBefore="角色名称" placeholder="请输入角色名称" v-model="addRoleForm.name"/>
        </div>
        <div style="margin-bottom: 16px; width: 300px">
          <a-input addonBefore="角色描述" placeholder="请输入角色描述" v-model="addRoleForm.desc"/>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    scopedSlots: { customRender: "id" }
  },
  {
    title: "角色名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "角色描述",
    dataIndex: "description",
    width: "50%",
    scopedSlots: { customRender: "description" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "12%",
    scopedSlots: { customRender: "operation" }
  }
];

const data = [];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
};
export default {
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
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
      addRoleVisible: false,
      addRoleForm: {}
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
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      let {id, name, description} = target;
      this.tempData = {id,name,description}
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    // 删除单条数据
    handleDelete(key) {
      this.$ajax({
        method: "delete",
        url: "/admin/dashboard/role",
        data: {
          id: key
        }
      })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success(result.data.msg);
            this.getRoleData();
          } else {
            this.$message.error(result.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("删除失败");
        });
    },
    // 删除多条数据
    delRoles() {
      let id = [];
      const dataSource = [...this.data];
      this.selectedRows.forEach(row => {
        id.push(row.id);
      });
      this.$ajax({
        method: "delete",
        url: "/admin/dashboard/role",
        data: {
          id: id.join(",")
        }
      })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success(result.data.msg);
            this.getRoleData();
          } else {
            this.$message.error(result.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("删除失败");
        });
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.tempData = null;
      if (target) {
        delete target.editable;
        this.$ajax({
          method: "put",
          url: "/admin/dashboard/role",
          data: target
        })
          .then(result => {
            if (result.data.code === 200) {
              this.$message.success(result.data.msg);
              this.getRoleData();
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
      let target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.id = this.tempData.id
        target.name = this.tempData.name;
        target.description = this.tempData.description;
        delete target.editable;
        this.data = newData;
      }
    },
    handleAddRole() {
      this.$ajax({
        method: "post",
        url: "/admin/dashboard/role",
        data: this.addRoleForm
      })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success(result.data.msg);
            this.getRoleData();
            this.addRoleForm = {};
          } else {
            this.$message.error(result.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("添加失败");
        });
      this.addRoleVisible = false;
    },
    // 刷新数据
    refreshData() {
      this.getRoleData();
    },
    getRoleData() {
      this.$ajax({
        method: "get",
        url: "/admin/dashboard/role"
      })
        .then(result => {
          this.spinning = true;
          let res = [];
          let datas = result.data;
          datas.forEach(data => {
            res.push({
              key: data.id,
              id: data.id,
              name: data.rolename,
              description: data.desc
            });
          });
          this.data = res;
          this.spinning = false;
        })
        .catch(err => {
          console.log(err);
          this.spinning = false;
        });
    }
  },
  created() {
    this.getRoleData();
  }
};
</script>
<style scoped lang="less">
.role {
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
