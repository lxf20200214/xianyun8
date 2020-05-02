<template>
  <div class="map">
    <!-- 引入key值和插件 -->
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=e404bbdbce3c1de8d78a5379f2c1577f&plugin=AMap.StationSearch"
    ></script>

    <!-- 地图  -->
    <div id="box"></div>
    <!-- 右侧列表 -->
    <div class="list">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风景" name="first">
          <div class="list_box">
            <div class="content" v-for="(item,index) in 15" :key="index">
              <div class="site">{{pois[0].name}}</div>
              <div class="kilometre">{{pois[0].kilometre}}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="交通" name="second">
          <div class="list_box">
            <div class="content" v-for="(item,index) in 15" :key="index">
              <div class="site">地铁站</div>
              <div class="kilometre">2公里</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  默认值是风景
      activeName: "first",
      pois: [
        {
          adname: "海珠区",
          name: "广州塔",
          cityName: "广州",
          kilometre:'1.5公里'
        }
      ]
    };
  },
  mounted() {
    const map = new AMap.Map("box", {
      zoom: 11, //级别
      center: [113.35, 23.12] //中心点坐标
    });
    // 创建 AMap.Icon 实例：
    var icon = new AMap.Icon({
      size: new AMap.Size(32, 32), // 图标尺寸
      image: "/images/地点.png", // Icon的图像
      imageSize: new AMap.Size(32, 32) // 根据所设置的大小拉伸或压缩图片
    });
    var marker = new AMap.Marker({
      position: new AMap.LngLat(113.35, 23.12),
      offset: new AMap.Pixel(-16, -32),
      icon: icon, // 添加 Icon 图标 URL
      title: "天河"
    });
    // 弹窗内容
    let content = [];
    // 空数组追加内容
    content.push(`
    <div style="width:80px;height:15px;text-align:center; font-size:12px;color:grey; border-radius:20px;"> 
    ${this.pois[0].name}
    </div>`);
      // 弹窗方法
    var info = new AMap.InfoWindow({
      // 接收内容 
      content: content.join(""),
      // 弹窗偏移值
      offset: new AMap.Pixel(0,-30)
    });
    // 鼠标移入移出事件
    marker.on("mouseover", function() {
      info.open(map, map.getCenter());
    });
    marker.on("mouseout", function() {
      info.close()
    });
    // 给地图添加点标记
    map.add(marker);
  },
  methods: {
    // 点击切换tab栏
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="less" scoped>
.map {
  height: 420px;
  margin-top: 50px;
  #box {
    width: 650px;
    height: 370px;
    float: left;
  }
  .list {
    float: left;
    padding-left: 20px;
    width: 315px;
    height: 370px;
    .list_box {
      overflow-y: auto;
      width: 315px;
      height: 305px;
      .content {
        height: 40px;
        font-size: 14px;
        color: grey;
        line-height: 30px;
        cursor: pointer;
        .site {
          float: left;
          margin-left: 5px;
        }
        .kilometre {
          float: right;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>