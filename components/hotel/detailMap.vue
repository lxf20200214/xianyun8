<template>
  <div class="map">
    <!-- 引入key值和插件 -->
    <!-- <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=e404bbdbce3c1de8d78a5379f2c1577f&plugin=AMap.StationSearch"
    ></script>-->

    <!-- 地图  -->
    <div id="box"></div>
    <!-- 右侧列表 -->
    <div class="list">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风景" name="first">
          <div class="list_box">
            <div class="content" v-for="(item,index) in poisData" :key="index">
              <div class="site">{{item.name}}</div>
              <div class="kilometre">15公里</div>
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
  props: {
    data: {
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      //  默认值是风景
      activeName: "first",
      content: {},
      pois: [
        {
          adname: "海珠区",
          name: "广州塔",
          cityName: "广州",
          kilometre: "1.5公里"
        }
      ],
      // 周边景点
      poisData: [],
      markers:[]
    };
  },
  mounted() {
     setTimeout(() => {
      this.content = this.data[0];
        //  console.log(this.markers);
         
        }, 1000);
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=e404bbdbce3c1de8d78a5379f2c1577f&plugin=AMap.StationSearch&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    window.onLoad = () => {
      // var map = new AMap.Map('box');
      const map = new AMap.Map("box", {
        resizeEnable: true,
        zoom: 11, //级别
        center: [113.35, 23.12] //中心点坐标
      });
      // 创建 AMap.Icon 实例：
      var icon = new AMap.Icon({
        size: new AMap.Size(32, 32), // 图标尺寸
        image: "/images/地点.png", // Icon的图像
        imageSize: new AMap.Size(32, 32) // 根据所设置的大小拉伸或压缩图片
      });
      // var marker = new AMap.Marker({
      //   position: new AMap.LngLat(113.35, 23.12),
      //   offset: new AMap.Pixel(-16, -32),
      //   icon: icon, // 添加 Icon 图标 URL
      //   title: "天河"
      // });
      // // 弹窗内容
      // let content = [];
      // // 空数组追加内容
      //   content.push(`
      // <div style="width:80px;height:15px;text-align:center; font-size:12px;color:grey; border-radius:20px;">
      // ${this.pois[0].name}
      // </div>`);
      // // 弹窗方法
      // var info = new AMap.InfoWindow({
      //   // 接收内容
      //   content: content.join(""),
      //   // 弹窗偏移值
      //   offset: new AMap.Pixel(0, -30)
      // });
      // // 鼠标移入移出事件
      // marker.on("mouseover", function() {
      //   info.open(map, map.getCenter());
      // });
      // marker.on("mouseout", function() {
      //   info.close();
      // });
     
      // 循环返回风景的数据
          setTimeout(() => {
             // 创建一个空数组
          let  markers = [];
          this.markers = markers
               if (this.poisData) {
        this.poisData.map((item, index) => {
        //  推到数组上
        markers.push({
          name: item.name, // 名字
          position: new AMap.LngLat(item.location.lng, item.location.lat), // 经纬度
          offset: new AMap.Pixel(-16, -32), // 偏移值
          icon: icon, // 添加 Icon 图标 URL
          title: item.name,
          // map: this.map
        });
        return markers;
      })
     }
       console.log(this.markers);
     console.log(markers);
          }, 1000);
   
     
        // markers.forEach((item, index) => {
        //   item = new AMap.Marker({});
        // });

      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type: "风景名胜", // 兴趣点类别
          // pageSize: 5, // 单页显示结果条数
          // pageIndex: 1, // 页码
          // city: "010", // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });

        // var cpoint = [this.content.location.longitude, this.content.location.latitude]; //中心点坐标
        var cpoint = [113.35, 23.12]; //中心点坐标
        placeSearch.searchNearBy("", cpoint, 10000, (status, result) => {
          // console.log(result);
          // 存到data
          this.poisData = result.poiList.pois;
          console.log(this.poisData);
        });
      });

      // 给地图添加点标记
    setTimeout(() => {
      map.add(this.markers);
      
    }, 1500);
};

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
    width: 340px;
    height: 370px;
    .list_box {
      overflow-y: auto;
      width: 100%;
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