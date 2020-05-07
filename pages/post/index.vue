<template>
  <div class="w">
    <div class="menus-wrapper">
      <postTab @gainCityName="gainCityName" />
      <div class="aside-recommend">
        <div class="aside-title">推荐城市</div>
        <img src="../../static/images/pic_sea.jpeg" alt />
      </div>
    </div>
    <div class="post-wrapper">
      <div class="search">
        <el-input
          placeholder="请输入想去的地方，比如：'广州'"
          suffix-icon="el-icon-search"
          v-model="value"
          @change="handleSearch"
        ></el-input>
      </div>

      <div class="search-recommend">
        <span>推荐：</span>
        <a
          href="#"
          id="search"
          @click="handleSearch1(item)"
          v-for="(item, index) in list"
          :key="index"
        >{{ item }}</a>
      </div>
      <div class="post-title">
        <h4>推荐攻略</h4>
        <el-button type="primary" icon="el-icon-edit" @click="clicKcreate">写游记</el-button>
      </div>

      <div class="post-list" v-for="(item, index) in flightsData" :key="index">
        <nuxt-link
          :to="{
            path: `/post/detail`,
            query: {
              id: item.id
            }
          }"
        >
          <postList :data="item" v-if="item.images.length >= 3" />
          <postList2 :data="item" v-if="item.images.length <3" />
        </nuxt-link>
      </div>
      <div class="el-row">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="start / limit + 1"
          :page-sizes="[3,5,10,15]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import postList from "@/components/post/postList.vue";
import postList2 from "@/components/post/postList2.vue";

import postTab from "@/components/post/postTab.vue";
export default {
  components: {
    postList,
    postList2,

    postTab
  },
  data() {
    return {
      value: "",
      start: 0,
      limit: 3,
      flightsData: [],
      list: ["广州", "上海", "北京"],
      total: 0
    };
  },
  mounted() {
    if (this.$route.query.city) {
      this.value = this.$route.query.city;
    }
    this.getData();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // // 显示条数
      this.limit = val;

      this.$router.replace({
        url: this.$route.path,
        query: {
          _limit: this.limit,
          _start: this.start
        }
      });
      this.getData();
    },
    // 切换条数时候触发
    handleCurrentChange(index) {
      // 根据页数修改start的开始的条数
      this.start = (index - 1) * this.limit;
      // 给当前的路由添加参数
      this.$router.replace({
        url: this.$route.path,
        query: {
          _start: this.start,
          _limit: this.limit
        }
      });
      // 可以使用computed优化
      this.getData();
    },
    handleSearch() {
      this.$router.replace({
        url: this.$route.path,
        query: {
          city: this.value,
          _start: this.start, // 从哪一条数据开始
          _limit: this.limit // 拿多少条数据
        }
      });
      this.getData();
    },
    gainCityName(data) {
      this.value = data;
      this.$router.replace({
        url: this.$route.path,
        query: {
          city: this.value,
          _start: this.start, // 从哪一条数据开始
          _limit: this.limit // 拿多少条数据
        }
      });
      this.getData();
    },
    handleSearch1(item) {
      this.value = item;
      // 给当前的路由添加参数
      this.$router.replace({
        url: this.$route.path,
        query: {
          city: this.value,
          _start: this.start, // 从哪一条数据开始
          _limit: this.limit // 拿多少条数据
        }
      });
      this.getData();
    },
    clicKcreate() {
      this.$router.push("post/create");
    },
    getData() {
      const config = {
        url: "/posts",
        // 当前请求的参数
        params: {
          _start: this.start, // 从哪一条数据开始
          _limit: this.limit // 拿多少条数据
        }
      };

      if (this.value) {
        config.params = {
          city: this.value,
          _start: this.start, // 从哪一条数据开始
          _limit: this.limit // 拿多少条数据
        };
      }

      this.$axios(config).then(res => {
        const { data, total } = res.data;
        // 赋值给data的list
        this.flightsData = data;
        // 总条数
        this.total = total;
      });
    }
  }
};
</script>

<style scoped lang="less">
.w {
  padding: 20px 0;
  margin: 0 auto;
  // height: 1000px;
  width: 1000px;
  display: flex;
  box-sizing: border-box;
  .menus-wrapper {
    .aside-recommend {
      width: 260px;
      margin-top: 20px;
      .aside-title {
        height: 40px;
        border-bottom: 1px solid #ccc;
        line-height: 40px;
        margin-bottom: 10px;
      }
      img {
        width: 260px;
      }
    }
  }

  .post-wrapper {
    width: 700px;
    // background-color: red;

    margin-left: 50px;
    display: inline-block;
    .search-recommend {
      padding: 10px 0;
      font-size: 12px;
      color: #666;
      a {
        margin-right: 5px;
      }
      a:hover {
        text-decoration: underline;
      }
    }
    .post-title {
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h4 {
        font-weight: 400;
        font-size: 18px;
        color: orange;
        border-bottom: 2px solid orange;
        display: inline-block;
        padding-bottom: 10px;
        line-height: 40px;
      }
    }

    .el-row {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
.search/deep/ .el-input__inner {
  border-radius: 0;
  border: 3px solid orange;
  background: none;
  outline: none;
}
/deep/ .el-input__suffix {
  color: orange;
  font-size: 25px;
  font-weight: 900;
}
</style>
