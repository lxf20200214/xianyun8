<template>
  <header class="header">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="../assets/images/35913.png" alt />
        </nuxt-link>
      </div>

      <!-- 菜单栏 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/" :class="index===0?'active':''">首页</nuxt-link>
        <nuxt-link to="/post?start=0&limit=3" :class="index===1?'active':''">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel" :class="index===2?'active':''">酒店</nuxt-link>
        <nuxt-link to="/air" :class="index===3?'active':''">国内机票</nuxt-link>
      </el-row>

      <!-- 登录/用户信息 -->
      <el-row type="flex" align="middle">
        <!-- 如果用户存在则展示用户信息，用户数据来自store -->
        <el-dropdown v-if="$store.state.user.userInfo.token">
          <el-row type="flex" align="middle" class="el-dropdown-link">
            <nuxt-link to="#">
              <img
                :src="
                  $axios.defaults.baseURL +
                    $store.state.user.userInfo.user.defaultAvatar
                "
              />
              {{ $store.state.user.userInfo.user.nickname }}
            </nuxt-link>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="#">个人中心</nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleLogout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 不存在用户信息展示登录注册链接 -->
        <nuxt-link to="/user/login" class="account-link" v-else>登录 / 注册</nuxt-link>
      </el-row>
    </el-row>
  </header>
</template>

<script>
export default {
  data() {
    return {
      index: 9999
    };
  },
  methods: {
    // 用户退出
    handleLogout() {
      // 清空store的数据,persistedState插件会监听store的变化,自动同步到本地
      // 错误的写法:this.$store.state.user.userInfo={}
      this.$store.commit("user/setUserInfo", {});
      // 弹窗提示
      this.$message.success("退出成功");
    }
  },
  watch: {
    $route() {
      // if (this.$route.name == "index") {
      //   this.index = 0;
      // }
      // if (this.$route.name.indexOf("post") > -1) {
      //   this.index = 1;
      // }
      // if (this.$route.name.indexOf("hotel") > -1) {
      //   this.index = 2;
      // }
      // if (this.$route.name.indexOf("air") > -1) {
      //   this.index = 3;
      // }
      let arr = ["index", "post", "hotel", "air"];
      let isvalid = true;
      arr.forEach((v, n) => {
        if (!isvalid) return;
        if (this.$route.name.indexOf(v) > -1) {
          this.index = n;
          isvalid = false;
        }
      });
    }
  },
  mounted() {
    // if (this.$route.name == "index") {
    //   this.index = 0;
    // }
    // if (this.$route.name.indexOf("post") > -1) {
    //   this.index = 1;
    // }
    // if (this.$route.name.indexOf("hotel") > -1) {
    //   this.index = 2;
    // }
    // if (this.$route.name.indexOf("air") > -1) {
    //   this.index = 3;
    // }
    let arr = ["index", "post", "hotel", "air"];
    let isvalid = true;
    arr.forEach((v, n) => {
      if (!isvalid) return;
      if (this.$route.name.indexOf(v) > -1) {
        this.index = n;
        isvalid = false;
      }
    });
  }
};
</script>

//
<style scoped lang="less">
.header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;

  .main {
    width: 1000px;
    margin: 0 auto;
  }

  .logo {
    width: 156px;
    padding-top: 8px;

    img {
      display: block;
      width: 156px;
     height: 50px;
      
    }
  }

  .navs {
    margin: 0 20px;
    flex: 1;

    a {
      display: block;
      padding: 0 20px;
      height: 60px;
      box-sizing: border-box;

      &:hover,
      &:focus,
      &:active {
        border-bottom: 5px #409eff solid;
        color: #409eff;
      }
    }

    .active {
      background: #409eff;
      color: #fff !important;
    }
  }

  .message {
    height: 36px;
    line-height: 1;
    cursor: pointer;
    .el-icon-bell {
      margin-right: 2px;
      font-size: 18px;
    }
  }

  .el-dropdown-link {
    margin-left: 20px;

    &:hover {
      img {
        border-color: #409eff;
      }
    }

    a {
      display: block;
    }

    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      border: 2px #fff solid;
      border-radius: 50px;
    }
  }

  .account-link {
    font-size: 14px;
    margin-left: 10px;
    color: #666;

    &:hover {
      color: #409eff;
      text-decoration: underline;
    }
  }
}
</style>
