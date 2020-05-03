<template>
  <div>
    <div
      class="hote"
<<<<<<< HEAD
      v-for="(item, index) in data.data"
      :key="index"
      @click="
        $router.push({
          path: `/hotel/detail`,
<<<<<<< HEAD
          query: {
            id: item.id
=======
          query:{
=======
      v-for="(item, index) in list"
      :key="index"
      @click="
        $router.push({
          path: '/hotel/detail',
          query: {
>>>>>>> dev
            id:item.id
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
          }
        })
      "
    >
      <div class="hoteimg">
<<<<<<< HEAD
<<<<<<< HEAD
       <a href="#">
          <img src="../../static/images/123.jpg" alt />
          </a>
=======
        <a href="#">
          <img :src="item.photos" />
        </a>
>>>>>>> d9d66ce26d5789682806b6a2642973749110e105
=======
        <a href="#">
          <img :src="item.photos" />
        </a>
>>>>>>> dev
      </div>
      <div class="hotetitle">
        <h4>
          <a href="#">{{ item.name }}</a>
        </h4>
        <span class="location">{{ item.alias }}</span>
        <div class="evaluate">
          <!-- v-model="value" -->
          <el-rate
            :value="item.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <span class="commonality">17</span>条评价
          <span class="commonality">62</span>篇游记
        </div>
        <i class="iconfont iconlocation"></i>
        <span class="place">位于: {{ item.address }}</span>
      </div>
      <div class="hotelist">
        <p v-for="(item2, index2) in item.products" :key="index2">
          <span>{{ item2.name }}</span>
          <span>
            <em class="commonality">￥{{ item2.price }}</em>
            起
            <i class="el-icon-arrow-right"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
<<<<<<< HEAD
        :total="data.total"
=======
        :total="total"
>>>>>>> dev
      >
        <!--   -->
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
<<<<<<< HEAD
      currentPage4: 0, //当前页
      total: 0, //总页数
      city: "",
      cityID: "",
<<<<<<< HEAD
      limit: 1,
      page1: 5
=======
      limit: 10
=======
      list: [],
      currentPage4: 1, //当前页
      total: 0 //总页数
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
    };
  },
<<<<<<< HEAD
  mounted() {
    this.$axios({
      url: "/hotels",
      params: {
        city: this.$store.state.hotel.setcitydata.id
      }
    }).then(res => {

      // console.log(res);
      const { data } = res.data;
      // console.log(res);
      // console.log(data);
      this.total = res.data.total;
      this.list = data;
    });
<<<<<<< HEAD
=======
  mounted() {},
  methods: {
    //条数数触发
    handleSizeChange(limit) {
      this.limit = limit;
      this.getHotel(1);
    },
    //当前页改变时触发
    handleCurrentChange(page) {
      this.page1 += 5;
      console.log(this.page1);

      this.getHotel(this.page1);
      setTimeout(() => {
        this.$router.push({
          path: "/hotel",
          query: {
            cityName: this.$store.state.hotel.setcitydata.name,
            page: page
          }
        });
      }, 10);
    },
    // 封装请求酒店列表的方法
    getHotel(pageindex) {
      // 请求和value相关的城市
      return this.$axios({
        url:
          "/hotels" +
          `?&city=${this.$store.state.hotel.setcitydata.id}&_limit=${this.limit}`,
        params: {
          _start: pageindex //页数
        }
      }).then(res => {
        const { data } = res.data;
        this.$emit("myclick", res.data);
        this.$store.commit("hotel/setHotellist", data);

        // return data.id;
      });
    }
>>>>>>> d9d66ce26d5789682806b6a2642973749110e105
=======
  },
  methods: {
    //条数数触发
    handleSizeChange(limit) {
      // console.log(limit);

      this.getHotel("", limit);
    },
    //当前页改变时触发
    handleCurrentChange(page) {
      // console.log(page);
      this.getHotel(page);
    },
    // 封装请求酒店列表的方法
    getHotel(pageindex, limit) {
      // 请求和value相关的城市
      // console.log(pageindex);

      return this.$axios({
        url: "/hotels",
        params: {
          city: this.$store.state.hotel.setcitydata.id,
          //条数
          _limit: limit,
          _start: pageindex //页数
        }
      }).then(res => {
        // data是城市的数组
        // console.log(res);
        const { data } = res.data;
        console.log(data);
        this.list = [];
        this.list = data;
        this.$store.commit("hotel/setHotellist", data);
        return res.config.params;
      });
      // });
    }
>>>>>>> dev
  }
};
</script>

<style lang="less" scoped>
.block {
  text-align: center;
  margin: 20px 0;
}
a:hover {
  color: #000;
}
.hote {
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #eee;
}
.hoteimg {
  flex: 1;
  object-fit: contain; //让图片不变形
  img {
    flex-shrink: 0; //防止图片在flex布局下被挤压
    object-fit: cover;
    width: 320px;
    height: 200px;
    padding: 0 10px;
  }
}
.hotetitle {
  flex: 2;
  margin-bottom: 120px;
  h4 {
    font-weight: 400;
    font-size: x-large;
  }
  .location {
    color: #999;
  }
  .evaluate {
    display: flex;
    align-items: center;
    line-height: 50px;
    span {
      padding: 0 5px 0 20px;
    }
  }
  i {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
  }
  .place {
    font-size: 12px;
  }
}
.hotelist {
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: 50px;
  padding: 0 30px;
  p {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 0 20px;
  }
  p:hover {
    background-color: #eee;
    color: #000;
  }
}
</style>
