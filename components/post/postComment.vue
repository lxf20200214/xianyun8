<template>
  <div>
    <div class="cmt-info">
      <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt />
      <span>{{data.account.nickname}}</span>
      <i>{{moment(data.created_at).format("YYYY-MM-DD hh:mm")}}</i>
      <span class="floor">{{data.level}}</span>
    </div>

    <div class="cmt-content">
      <div class="cmt-floor" v-if="data.parent">
        <PostComment :data="data.parent" @getReply="handleClick" />
      </div>
      <div class="cmt-new">
        <p>{{data.content}}</p>
      </div>
      <el-row type="flex" class="pics">
        <div class="cmt-pic" v-for="(data,index) in data.pics" :key="index">
          <img :src="$axios.defaults.baseURL+data.url" alt />
        </div>
      </el-row>
      <div class="cmt-reply">
        <a href="javascript:" @click="handleClick(data)">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  // 声明当前的组件名,在当前组件里面,name的值可以用于调用组件自己
  name: "PostComment",
  data() {
    return {
      moment
    };
  },
  props: ["data"],
  mounted() {
    // console.log(this.$axios.default.baseURL);
  },
  methods: {
    handleClick(data) {
      this.$emit("getReply", data);
    },
    getReply() {}
  }
};
</script>

<style scoped lang="less">
.cmt-floor {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 2px;
  .cmt-info {
    font-size: 12px;
    color: #666;
    margin-bottom: 0;
  }
  .cmt-content {
    padding: 0;
    .cmt-new {
      p {
        margin-bottom: 10px;
        padding-left: 5px;
      }
    }
  }
}
.cmt-info {
  margin-bottom: 10px;
  font-size: 12px;
  color: #666;
  img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    vertical-align: top;
  }
  span {
    margin-right: 5px;
    font-size: 12px;
    color: #666;
  }
  i {
    color: #999;
  }
  .floor {
    float: right;
  }
}

.cmt-content {
  padding-left: 15px;
  .cmt-new {
    p {
      margin-bottom: 10px;
    }
  }
  .pics {
    .cmt-pic {
      width: 80px;
      height: 80px;
      overflow: hidden;
      margin-right: 5px;
      border: 1px dashed #ddd;
      border-radius: 5px;
      padding: 5px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
}
.cmt-reply {
  height: 20px;
  line-height: 20px;
  text-align: right;
  font-size: 12px;
  color: #1e50a2;
  a {
    display: none;
  }
}
a:hover {
  text-decoration: underline;
  color: #1e50a2;
}
.cmt-reply:hover {
  a {
    display: inline-block;
  }
}
</style>