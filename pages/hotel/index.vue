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
            <HotelFilter />
          </div>
        </el-col>
      </el-row>
      <el-row class="breadcrumb">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark"><hotelList /></div>
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
      city: ""
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
              // data是城市的数组
              const { data } = res.data;
              // 保存this.form数据到vuex中,供历史记录调用
              console.log(data[0]);

              this.$store.commit("hotel/setcitydata", data[0]);
              this.city = data[0].name;
              // this.hotelcityid = data[0].id;
              // this.hotelscenics = data[0].scenics;
              // this.getCities(this.hotelcityid);
            });
          }
        });
      });
    }, 9);
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
