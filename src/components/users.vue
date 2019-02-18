<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            clearable
            @clear="getuserlist"
            v-model="dbquery.query"
          >
            <el-button slot="append" icon="el-icon-search" @click="getuserlist"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="adduser = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 添加用户弹框 -->
      <el-dialog title="添加用户" :visible.sync="adduser" @close="addclose">
        <el-form label-width="80px" :model="addform" :rules="addrules" ref="addruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addform.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addform.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addform.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addform.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="adduser = false">取 消</el-button>
          <el-button type="primary" @click="addformuser">确 定</el-button>
        </div>
      </el-dialog>

      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="username" label="用户名" width="140"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="200"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="100">
          <el-switch v-model="info.row.mg_state" slot-scope="info"></el-switch>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="info">
            <el-row>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="showedit(info.row.id)"
              ></el-button>
              <el-button size="mini" type="warning" icon="el-icon-star-off"></el-button>
              <el-tooltip
                class="item"
                effect="dark"
                content="角色分配"
                placement="top-start"
                :enterable="false"
              >
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="delform(info.row.id)"
                ></el-button>
              </el-tooltip>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <!-- 修改用户弹框 -->
      <el-dialog title="添加用户" :visible.sync="edituser">
        <el-form label-width="80px" :model="editform"  ref="editruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editform.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editform.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="editform.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="edituser = false">取 消</el-button>
          <el-button type="primary" @click="editformuser">确 定</el-button>
        </div>
      </el-dialog>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="dbquery.pagenum"
        :page-sizes="[1, 2, 10, 17]"
        :page-size="dbquery.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dbquery.total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getuserlist()
  },
  data() {
    return {
      userList: [],
      dbquery: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      adduser: false,
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addrules: {
        username: [
          { required: true, message: '请输入表单信息', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入表单信息', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入表单信息', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入表单信息', trigger: 'blur' }]
      },
      editform: {
        username: '',
        email: '',
        mobile: ''
      },
      edituser: false
    }
  },
  methods: {
    async getuserlist() {
      const { data: res } = await this.$http.get('users', {
        params: this.dbquery
      })
      // console.log(res)
      // console.log(res)  拿到user 数据
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userList = res.data.users
      this.dbquery.total = res.data.total
    },
    handleSizeChange(newsize) {
      this.dbquery.pagesize = newsize
      this.getuserlist()
    },
    handleCurrentChange(newpage) {
      this.dbquery.pagenum = newpage
      this.getuserlist()
    },
    //添加用户请求
    addformuser() {
      this.$refs.addruleForm.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$http.post('users', this.addform)
          if (res.meta.status !== 201) {
            return this.$message.error('信息提交失败，请重试')
          }
          console.log(res)
          this.adduser = false
          this.getuserlist()
          this.addform = ''
        }
      })
    },
    addclose() {
      this.$refs.addruleForm.resetFields()
    },
    //删除用户
    delform(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.delete('users/' + id)
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg)
          }
          this.$message.success(res.meta.msg)
          this.getuserlist()
        })
        .catch(() => {})
    },
    // 修改用户
    async showedit(id) {
      this.edituser = true
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.editform = res.data
      console.log(this.editform)
    },
    async editformuser( ) {
      const {data:res} =await this.$http.put('users/'+this.editform.id,this.editform)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.edituser = false
      this.$message.success(res.meta.msg)
      this.getuserlist()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
