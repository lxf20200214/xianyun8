<template>
  <div class="w">
    <div class="menus-wrapper">
      <postTab />
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
        <el-button type="primary" icon="el-icon-edit" @click="clicKcreate">写日记</el-button>
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

          <postList2 :data="item" v-if="item.images.length === 1" />
        </nuxt-link>
      </div>
      <div class="el-row">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="list.length"
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
      pageIndex: 0,
      pageSize: 3,
      getList: {},
      flightsData: [],
      list: ["广州", "上海", "北京"],
      total: 0
    };
  },
  mounted() {
    if (this.$route.query) {
      const { city, start, limit } = this.$route.query;
      this.listData(city, start, limit);
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 显示条数
      this.pageSize = val;

      this.pageIndex = 1;
      // 重新切割数组
      this.flightsData = this.getList.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      // 重新切割数组
      this.flightsData = this.getList.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    },
    handleSearch() {
      this.listData();
    },
    handleSearch1(item) {
      this.value = item;
      this.listData();
    },
    clicKcreate() {
      this.$router.push("post/create");
    },
    listData(city, start, limit) {
      const config = {
        url: "/posts",
        params: {
          _start: start,
          _limit: limit,
          city: city
        }
      };
      if (this.value) {
        config.params = {
          city: this.value
        };
      }

      this.$axios(config).then(res => {
        // console.log(res);
        const { data } = res.data;
        this.getList = data;
        this.flightsData = this.getList.slice(0, this.pageSize);
        this.total = res.data.total;
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
