<template>
  <div class="main">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1>{{data.title}}</h1>
    <div class="post-info">
      <span>攻略：{{moment(data.created_at).format("YYYY-MM-DD hh:mm")}}</span>
      <span>阅读:{{data.watch}}</span>
    </div>
    <div class="post-content" v-html="data.content"></div>
    <div class="post-ctrl">
      <el-row type="flex" justify="center" class>
        <div class="ctrl-item">
          <i class="el-icon-edit"></i>
          <p>评论({{total}})</p>
        </div>
        <div class="ctrl-item">
          <i class="el-icon-share"></i>
          <p>分享</p>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    total: {
      type: Number,
      default: ""
    }
  },
  data() {
    return {
      moment
    };
  },
  mounted() {
    // console.log(moment(1558493820053).format("YYYY-MM-DD"));
  }
};
</script>

<style scoped lang="less">
.main {
  h1 {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  .post-info {
    padding: 20px;
    color: #999;
    text-align: right;

    span {
      margin-left: 20px;
    }
  }
  .post-content {
    max-width: 700px !important;
  }
  .post-ctrl {
    padding: 40px 0;
    .ctrl-item {
      margin: 0 20px;

      i {
        display: block;
        font-size: 28px;
        text-align: center;
        color: orange;
      }
    }
  }
}
</style>
<style lang="less">
.post-content {
  img {
    margin: 10px 0;
    max-width: 700px !important;
  }
}
</style>