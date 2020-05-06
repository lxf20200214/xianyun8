<template>
  <div style="width:1000px; margin:0 auto; padding:50px 0">
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=02c96ac39f167e05f06c100b1e2b4bb1&plugin=AMap.CitySearch"
    ></script>
    <h2>高德地图</h2>
    <el-row type="flex" align="center" :gutter="80">
      <!-- 下面的 container中千万不要加内容  -->
      <el-col :span="12">
        <div id="container"></div>
      </el-col>
      <el-col :span="12">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick(activeName)">
          <el-tab-pane label="驾车" name="first"></el-tab-pane>
          <el-tab-pane label="公交" name="second"></el-tab-pane>
          <el-tab-pane label="步行" name="third"></el-tab-pane>
        </el-tabs>

        <div class="form">
          <el-form>
            <el-form-item>
              <el-input placeholder="起点位置" v-model="start"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="终点位置" v-model="end"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 显示路线规划的面板， 不要在这个div里面加内容 -->
        <div id="panel"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first", // 当前驾车还是公交或者步行
      map: "", // 地图对象
      start: "", // 起点位置
      end: "" // 终点位置
    };
  },
  mounted() {
    //   Amap在模板中导入js文件之后就应该是一个全局变量了
    //  map是一个地图的对象
    var map = new AMap.Map("container", {
      resizeEnable: true,
      zoom: 13 //级别
      // center: [116.397428, 39.90923] //中心点坐标
    });
    this.map = map;
    AMap.plugin("AMap.CitySearch", () => {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity((status, result) => {
        console.log(status);

        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          this.$message.success("你当前所在的城市是:" + result.city);
        }
      });
    });
    // 创建一个 Marker 实例：
    //   var marker = new AMap.Marker({
    //     position: new AMap.LngLat(113.3245904, 23.1066805), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    //     title: "广州塔"
    //   });

    //   // 创建 AMap.Icon 实例：
    //   var icon = new AMap.Icon({
    //     size: new AMap.Size(40, 40), // 图标尺寸
    //     image: "/images/u=3167010978,3969190839&fm=26&gp=0.jpg", // Icon的图像
    //     // imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
    //     imageSize: new AMap.Size(40, 40) // 根据所设置的大小拉伸或压缩图片
    //   });

    //   var marker1 = new AMap.Marker({
    //     position: new AMap.LngLat(113.3345904, 23.1066805),
    //     // offset: new AMap.Pixel(-10, -10),
    //     icon, // 添加 Icon 图标 URL
    //     title: "广州塔附近"
    //   });

    //   var content = `<div style="
    //   width:40px;
    //   height:40px;
    //   background:url('/images/u=3167010978,3969190839&fm=26&gp=0.jpg');
    //   border-radius:50%;
    //   background-size:100%
    //   "></div>`;

    //   var marker2 = new AMap.Marker({
    //     content: content, // 自定义点标记覆盖物内容
    //     position: [113.3145904, 23.1066805], // 基点位置
    //     offset: new AMap.Pixel(-17, -42) // 相对于基点的偏移位置
    //   });
    //   map.add([marker, marker1, marker2]);
  },
  methods: {
    // 点击tab栏切换时候触发的
    handleClick(tab) {
      console.log(tab);
    },
    // 查询驾车路线
    handleDriving() {
      AMap.plugin("AMap.Driving", () => {
        var driving = new AMap.Driving({
          map: this.map,
          panel: "panel"
        });

        var points = [
          { keyword: this.start, city: "广州" },
          { keyword: this.end, city: "广州" }
        ];

        driving.search(points, function(status, result) {
          // 未出错时，result即是对应的路线规划方案
        });
      });
    },
    // 点击查询按钮，开始查询路线
    handleSearch() {
      // 在开始规划路线之前呢，先清除掉地图上的其他内容
      this.map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [113.3245904, 23.1066805] //中心点坐标
      });
      // 清空panel路线规划面板内容
      document.querySelector("#panel").innerHTML = "";
      // 查询驾车路线
      this.handleDriving();
    }
  }
};
</script>

<style scoped lang="less">
#container {
  width: 500px;
  height: 500px;
}
#panel {
  background-color: white;
  max-height: 250px;
  overflow-y: auto;
  width: 100%;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
</style>
