<template>
  <div>

    <hotelList />
    酒店首页
    <!-- <nuxt-link :to="`/hotel/detail/?id=234`">酒店详情</nuxt-link> -->

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
            <HotelFilter :data="hoteldatalist" @myclick="chengshi" />
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
    <!-- <nuxt-link :to="`/hotel/detail`">酒店详情</nuxt-link> -->
  </div>
</template>
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.4.15&key=4e7b717582fe951d6aeb7920826f06e0&plugin=AMap.CitySearch"
></script>
<script>
import HotelFilter from "../../components/hotel/hotelFilter";
import hotelList from "@/components/hotel/hotelList.vue";
export default {
  components: {
    HotelFilter,
    hotelList
  },
  data() {
    return {
      city: "",
      hoteldatalist: {}
    };
  },
  mounted() {
    setTimeout(() => {
      AMap.plugin("AMap.CitySearch", () => {
        let citySearch = new AMap.CitySearch();
        citySearch.getLocalCity((status, result) => {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            // alert("想获取你的位置");
            this.$message.success("你当前所在的城市是:" + result.city);
            this.$axios({
              url: "/cities",
              params: {
                name: result.city
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
          }
        });
      });
    }, 9);
  },
  methods: {
    // 封装请求酒店列表的方法
    getCities(value) {
      // 请求和value相关的城市
      if (!value) {
        return;
      }
      return this.$axios({
        url: "/hotels",
        params: {
          city: value
        }
      }).then(res => {
        const { data } = res;
        this.$store.commit("hotel/setHotelefaul11", res.data.data);
        this.hoteldatalist = data;
        return res.config.params;
      });
      // });
    },
    //页数酒店列表
    pagehotelist(value) {
      this.hoteldatalist = value;
      console.log(value);
    },
    //城市
    chengshi(value) {
      console.log(value);

      if (!value) {
        return;
      }
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
