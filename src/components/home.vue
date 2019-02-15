<template>
  <el-container>
    <el-header>
      <div id="logo">
        <img src="../assets/img/heima.png" alt>
        <span>电商管理系统后台</span>
      </div>
      <el-button type="info" @click="tuichu">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside :width="shou ? '65px' : '200px'" style="height:100%">
        <div
          id="shou"
          style="width: 100%;
          height: 25px;
          background-color: #4a5064;
          color: #fff;
          font-size: 12px;
          text-align: center;
          line-height:25px;"
          @click="shou=!shou"
        >| | |</div>
    <el-menu
          default-active="2"
          background-color=" #373d41"
          text-color="#fff"
          active-text-color="#409EFF"
          menu-trigger="hover"
          :style="shou ? 'width=65px':'width=200px' "
          :collapse="shou"
          :collapse-transition="false"
          :unique-opened="true"
        >
          <el-submenu :index="item.id+''" v-for="(item,k) in List" :key="item.id">
            <template slot="title">
              <i :class="'iconfont icon-'+iconlist[k]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group v-for="item1 in item.children" :key="item1.id">
              <el-menu-item :index="item.id + '-'+item1.id">
                <i class="el-icon-menu"></i>
                <span>{{item1.authName}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getList()
  },
  data() {
    return {
      shou: false,
      List: [],
      iconlist: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    tuichu() {
      this.$confirm('确认退出系统后台?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    // 加载首屏导航数据
    async getList() {
      const { data: res } = await this.$http.get('menus')
      //   console.log(res)
      this.List = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    width: 100%;
    padding: 0;
    height: 60px;
    background-color: #373d41;
    overflow: hidden;
    display: flex;
    align-content: center;
    justify-content: space-between;
    #logo {
      color: #fff;
      font-size: 22px;
      display: flex;
      align-items: center;
      user-select: none;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
    .el-button {
      margin: 10px 20px;
    }
  }
  .el-container {
    height: 100%;
    .el-aside {
      height: 100%;
      background-color: #373d41;
      user-select: none;
      .el-menu{
          width: 200px;
      }
    }
  }
}
</style>
