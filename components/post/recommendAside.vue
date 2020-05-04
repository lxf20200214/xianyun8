<template>
  <div class="container">
    <h4>相关攻略</h4>
    <router-link
      :to="'/post/detail?id='+ item.id"
      class="recommend-item"
      v-for="(item,index) in data"
      :key="index"
    >
      <el-row type="flex">
        <div class="post-img" v-if="item.images.length">
          <img :src="item.images[0]" alt />
        </div>
        <div class="post-text">
          <p>{{item.title}}</p>
          <p>
            <span>{{moment(data.created_at).format("YYYY-MM-DD hh:mm")}}</span>
            <span>阅读</span>
            <span>{{item.watch}}</span>
          </p>
        </div>
      </el-row>
    </router-link>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      // data: [],
      moment
    };
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.container {
  h4 {
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .recommend-item {
    display: block;
    padding: 20px 0;
    text-decoration: none;
    color: inherit;
    border-bottom: 1px solid #ddd;
    .post-img {
      margin-right: 10px;
      img {
        width: 100px;
        height: 80px;
        object-fit: cover;
      }
    }
    .post-text {
      height: 80px;
      position: relative;
      flex: 1;
      min-width: 0;

      p:nth-child(1) {
        line-height: 1.4em;
        height: 2.8em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p:nth-child(2) {
        position: absolute;
        left: 0;
        bottom: 0px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>