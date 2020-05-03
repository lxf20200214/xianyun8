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
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
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
<<<<<<< HEAD
    AMapLoader.load({
      key: "4e7b717582fe951d6aeb7920826f06e0", //首次调用load必须填写key
      version: "2.0", //JSAPI 版本号
      plugins: ["AMap.CitySearch", "AMap.Scale"] //同步加载的插件列表
    })
      .then(AMap => {
        let map = new AMap.Map("container", {
          resizeEnable: true,
          zoom: 8 //级别
        });
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
=======
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
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
        });
        this.map = map;
        map.clearMap(); // 清除地图覆盖物
        // map.addControl(new AMap.Scale());
      })
      .catch(e => {
        console.error(e); //加载错误提示
      });
<<<<<<< HEAD
    // setTimeout(() => {

    // }, 9);
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
    },
    //城市
    chengshi(value) {
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
=======
    }, 9);
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
