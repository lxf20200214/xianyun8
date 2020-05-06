<template>
  <div>
    <section class="container">
      <el-row class="breadcrumb">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            酒店
            <i class="el-icon-arrow-right"></i>
            {{ city }}酒店预订
          </div>
        </el-col>
      </el-row>
      <!-- 酒店筛选页面 -->
      <el-row class="breadcrumb">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <HotelFilter @chengshi="chengshi" />
          </div>
        </el-col>
      </el-row>
      <el-row class="breadcrumb">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <hotelList :data="hoteldatalist" @myclick="pagehotelist" />
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
import MapLoader from "@/plugins/amap.js";
import HotelFilter from "../../components/hotel/hotelFilter";
import hotelList from "@/components/hotel/hotelList.vue";

export default {
  components: {
    HotelFilter,
    hotelList
  },
  data() {
    return {
      hoteldatalist: {},
      city: ""
    };
  },

  methods: {
    // 封装请求酒店列表的方法
    getCities(value) {
      return this.$axios({
        url: "/hotels",
        params: {
          city: value
        }
      }).then(res => {
        const { data } = res;
        this.$store.commit("hotel/setHotellist", res.data.data);
        this.hoteldatalist = data;
        this.$router.push({
          path: "/hotel",
          query: {
            cityName: data[0].name
          }
        });
        return res.config.params;
      });
      // });
    },
    //页数酒店列表
    pagehotelist(value) {
      this.hoteldatalist = value;
    },
    //城市
    chengshi(value) {
      console.log();

      if (!value) {
        return;
      }
      if (typeof value == "string") {
        this.$axios({
          url: "/cities",
          params: {
            name: value
          }
        }).then(res => {
          const { data } = res.data;
          // 保存this.form数据到vuex中,供历史记录调用
          this.$store.commit("hotel/setcitydata", data[0]);
          this.getCities(data[0].id);
          this.city = data[0].name;
          this.$router.push({
            path: "/hotel",
            query: {
              cityName: data[0].name
            }
          });
        });
        return;
      }
      this.hoteldatalist = value;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .breadcrumb {
    margin: 20px 0;
  }
}
</style>
