<template>
  <div class="map">
    <!-- 引入key值和插件 -->
    <!-- <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=e404bbdbce3c1de8d78a5379f2c1577f&plugin=AMap.StationSearch"
    ></script>-->

    <!-- 地图  -->
    <div id="box"></div>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left:10px">
      <el-tab-pane label="风景" name="first">
        <div class="list">
          <div id="panel"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="交通" name="second">
       <div class="list" >
          <div id="panel1"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!-- 右侧列表 -->
  <!-- <div class="list">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风景" name="first">
          <div class="list_box">
            <div
              class="content"
              v-for="(item,index) in poisData"
              :key="index"
              @mouseenter="handleenter(index)"
               @mouseleave="handleLeave(index)"
                ref="font"
            >
              <div class="site">{{item.name}}</div>
              <div
                class="kilometre"
              >{{ item.distance > 1000 ? (Math.round(item.distance/100)/10).toFixed(1) + "公里" :item.distance +'米'}}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="交通" name="second">
          <div class="list_box">
            <div class="content" v-for="(item,index) in traffic" :key="index" 
             @mouseenter="handleenter(index)"
               @mouseleave="handleLeave(index)"
                ref="font1"
                >
              <div class="site">{{item.name}}</div>
              <div
                class="kilometre"
              >{{ item.distance > 1000 ? (Math.round(item.distance/100)/10).toFixed(1) + "公里" :item.distance +'米' }}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
  </div>-->
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
      poisData: [], // 周边景点
      traffic: [], // 周边交通
      markers: [],
      map: "",
      render: "",
      distance: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.content = this.data[0];
      console.log(this.content);
      console.log(this.distance);

      this.distance.forEach(item => {
        if (item < 1000) {
          console.log(item + "米");
        } else if (item > 1000) {
          console.log((Math.round(item / 100) / 10).toFixed(1) + "公里");
        }
      });
    }, 0);

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=e404bbdbce3c1de8d78a5379f2c1577f&plugin=AMap.StationSearch&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);

    window.onLoad = () => {
      // console.log(this);

      this.load();
    };
  },

  methods: {
    // 点击切换tab栏
    handleClick(tab, event) {
      this.load();
    },
    // 列表鼠标移入
    handleenter(i) {
      this.$refs.font[i].style.color = "#2b89ec";
      if (this.$refs.font1) this.$refs.font1[i].style.color = "#2b89ec";
    },
    handleLeave(i) {
      this.$refs.font[i].style.color = "";
      if (this.$refs.font1) this.$refs.font1[i].style.color = "";
    },
    load() {
      this.map = new AMap.Map("box", {
        resizeEnable: true,
        zoom: 15, //级别
        center: [
          // 当前酒店的中心位置
          this.content.location.longitude,
          this.content.location.latitude
        ] //中心点坐标
      });
      // 创建 AMap.Icon 实例：
      var icon = new AMap.Icon({
        size: new AMap.Size(32, 32), // 图标尺寸
        image: "/images/地点.png", // Icon的图像
        imageSize: new AMap.Size(32, 32) // 根据所设置的大小拉伸或压缩图片
      });

      // 必须设定时器才可以拿到父组件传过来的值进行poi搜索
      // setTimeout(() => {
      //   // 创建一个空数组
      //   let markers = [];
      //   if (this.activeName === "first") {
      //     // poi搜索的数据进行循环
      //     this.poisData.map((item, index) => {
      //       //  推到数组上
      //       markers.push({
      //         name: item.name, // 名字
      //         position: [item.location.lng, item.location.lat], // 经纬度
      //         title: item.name
      //       });
      //       return markers;
      //     });
      //   } else {
      //     this.traffic.map((item, index) => {
      //       //  推到数组上
      //       markers.push({
      //         name: item.name, // 名字
      //         position: [item.location.lng, item.location.lat], // 经纬度
      //         title: item.name
      //       });
      //       return markers;
      //     });
      //   }
      //   // console.log(markers);
      //   markers.forEach((item, index) => {
      //     let mark = new AMap.Marker({
      //       position: new AMap.LngLat(item.position[0], item.position[1]),
      //       offset: new AMap.Pixel(-16, -32),
      //       icon: icon, // 添加 Icon 图标 URL
      //       map: this.map, // 展现结果的地图实例
      //       title: item.name,
      //       id: index
      //     });
      //     var info = new AMap.InfoWindow({
      //       // 接收内容
      //       autoMove: true,
      //       // 弹窗偏移值
      //       offset: new AMap.Pixel(0, -30)
      //     });
      //     // 移入移出事件
      //     mark.on("mouseover", e => {
      //       this.map.setCenter(item.position); // 当前地图中心点就是这个图标的偏移值
      //       info.setContent(item.name); // 内容
      //       info.open(this.map, e.target.getPosition()); //打开信息窗体

      //       info.setContent(item.name); // 内容
      //       info.open(this.map, e.target.getPosition()); //打开信息窗体
      //     });
      //     mark.on("mouseout", e => {
      //       // 关闭窗体
      //       this.map.clearInfoWindow();
      //     });
      //   });
      // }, 500);

      // AMap.service(["AMap.PlaceSearch"], () => {
      //   if (this.activeName === "first") {
      //     //构造地点查询类
      //     var placeSearch = new AMap.PlaceSearch({
      //       // 兴趣点类别
      //       type: "风景名胜",
      //       citylimit: true, //是否强制限制在设置的城市内搜索
      //       map: this.map, // 展现结果的地图实例
      //       autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      //     });
      //   } else {
      //     var placeSearch = new AMap.PlaceSearch({
      //       // 兴趣点类别
      //       type: "交通设施服务",
      //       citylimit: true, //是否强制限制在设置的城市内搜索
      //       map: this.map, // 展现结果的地图实例
      //       autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      //     });
      //   }
      //   var cpoint = [ this.content.location.longitude,  this.content.location.latitude]; //中心点坐标
      //   placeSearch.searchNearBy("", cpoint, 20000, (status, result) => {
      //     // console.log(result);
      //     // 存到data
      //     if (this.activeName === "first") {
      //        // 风景数据存到data
      //       this.poisData = result.poiList.pois;
      //     }
      //     else {
      //          // 交通数据存到data
      //       this.traffic = result.poiList.pois;
      //     }
      //     // 距离
      //     this.distance = result.poiList.pois.map(item => {
      //       return item.distance;
      //       console.log(this.poisData);
      //     });
      //   });
      // });

    
        if (this.activeName === "first") {
            AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "020", // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
          //关键字查询
          placeSearch.search("酒店", (status, result) => {
            // 查询成功时，result即对应匹配的POI信息
            // this.poisData = result.poiList.pois;+
            console.log(result);
          });
           });
        } else {
           AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "020", // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          panel: "panel1", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
          placeSearch.search("出行", (status, result) => {
            // 查询成功时，result即对应匹配的POI信息
            // this.traffic = result.poiList.pois;
            console.log(result);
          });
            });
        }

      // 给地图添加点标记
      this.map.add(this.markers);
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
  #panel {
    background-color: white;
    max-height: 85%;
    overflow-y: auto;
    width: 100%;
  }
  #panel1{
      background-color: white;
    max-height: 85%;
    overflow-y: auto;
    width: 100%;
  }
  /deep/ .el-tabs__nav-scroll {
    padding-left: 10px;
  }
  .list {
    float: left;
    margin-left: 10px;
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