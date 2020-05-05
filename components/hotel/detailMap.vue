<template>
  <div class="map">
    <!-- 引入key值和插件 -->
    <!-- <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=e404bbdbce3c1de8d78a5379f2c1577f&plugin=AMap.StationSearch"
    ></script>-->

    <!-- 地图  -->
    <div id="box" ></div>
    <!-- 右侧列表 -->
    <div class="list">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风景" name="first">
          <div class="list_box">
            <div
              class="content"
              v-for="(item,index) in poisData"
              :key="index"
              @mouseenter="handleenter(item,index)"
            >
              <div class="site">{{item.name}}</div>
              <div class="kilometre">{{ item.distance > 1000 ?  (Math.round(item.distance/100)/10).toFixed(1) + "公里" :item.distance +'米'}}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="交通" name="second">
          <div class="list_box">
            <div class="content" v-for="(item,index) in traffic" :key="index">
              <div class="site">{{item.name}}</div>
              <div class="kilometre">{{ item.distance > 1000 ?  (Math.round(item.distance/100)/10).toFixed(1) + "公里" :item.distance +'米' }}</div>
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
      poisData: [], // 周边景点
      traffic: [], // 周边交通
      markers: [],
      map: "",
      render: "",
      distance:[]
    };
  },
  mounted() {
    setTimeout(() => {
      this.content = this.data[0];
      console.log(this.content);
       console.log(this.distance);
    
        this.distance.forEach(item=>{
           if(item < 1000)  {
             console.log(item+"米")
           }
      else if( item > 1000){
        console.log((Math.round(item/100)/10).toFixed(1) + "公里")
      }
        })
    }, 0);

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=e404bbdbce3c1de8d78a5379f2c1577f&plugin=AMap.StationSearch&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);

    window.onLoad = () => {
      // console.log(this);

      this.load()
     
    };
  },
  watch:{
      activeName(){
      // this.window.reload()
      this.load()
      }
  },
  methods: {
    // 点击切换tab栏
    handleClick(tab, event) {
    },
    // 列表鼠标移入 
    handleenter(v, i) {
      console.log(v, i);
    },
    load(){
      this.map = new AMap.Map("box", {
        resizeEnable: true,
        zoom: 15, //级别
        center: [this.content.location.longitude, this.content.location.latitude] //中心点坐标
      });
      // 创建 AMap.Icon 实例：
      var icon = new AMap.Icon({
        size: new AMap.Size(32, 32), // 图标尺寸
        image: "/images/地点.png", // Icon的图像
        imageSize: new AMap.Size(32, 32) // 根据所设置的大小拉伸或压缩图片
      });

      // 循环返回风景的数据
      setTimeout(() => {
        // 创建一个空数组
        let markers = [];
        if (this.activeName === "first") {
          this.poisData.map((item, index) => {
            //  推到数组上
            markers.push({
              name: item.name, // 名字
              position: [item.location.lng, item.location.lat], // 经纬度
              title: item.name
            });
            return markers;
          });
        } else if (this.activeName === "second") 
         {
          this.traffic.map((item, index) => {
            //  推到数组上
            markers.push({
              name: item.name, // 名字
              position: [item.location.lng, item.location.lat], // 经纬度
              title: item.name
            });
            return markers;
          });
        }
        // console.log(markers);
        markers.forEach((item, index) => {
          let mark = new AMap.Marker({
            position: new AMap.LngLat(item.position[0], item.position[1]),
            offset: new AMap.Pixel(-16, -32),
            icon: icon, // 添加 Icon 图标 URL
            map: this.map, // 展现结果的地图实例
            title: item.name,
            id: index
          });
          var info = new AMap.InfoWindow({
            // 接收内容
            autoMove: true,
            // 弹窗偏移值
            offset: new AMap.Pixel(0, -30)
          });
          // 移入移出事件
          mark.on("mouseover", e => {
            this.map.setCenter(item.position);
            info.setContent(item.name); // 内容
            info.open(this.map, e.target.getPosition()); //打开信息窗体

            info.setContent(item.name); // 内容
            info.open(this.map, e.target.getPosition()); //打开信息窗体
          });
          mark.on("mouseout", e => {
            // 关闭窗体
            this.map.clearInfoWindow();
          });
        });

        this.markers = markers;
        // console.log(this.markers);
        
      }, 1000);

          AMap.service(["AMap.PlaceSearch"], () => {
            if (this.activeName==="first") {
                   //构造地点查询类
          var placeSearch = new AMap.PlaceSearch({
            // 兴趣点类别
            type: "风景名胜",
            citylimit: true, //是否强制限制在设置的城市内搜索
            map: this.map, // 展现结果的地图实例
            panel: "panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });
            }else{
                var placeSearch = new AMap.PlaceSearch({
            // 兴趣点类别
            type: "交通设施服务",
            citylimit: true, //是否强制限制在设置的城市内搜索
            map: this.map, // 展现结果的地图实例
            panel: "panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });
            }
          var cpoint = [
            this.content.location.longitude,
            this.content.location.latitude
          ]; //中心点坐标
          placeSearch.searchNearBy("", cpoint, 20000, (status, result) => {
            // console.log(result);
            // 存到data
            if (this.activeName==="first") {
            this.poisData = result.poiList.pois;
              
            }else{
            this.traffic = result.poiList.pois;

            }
            // this.poisData = result.poiList.pois;
            this.distance = result.poiList.pois.map(item=>{
              return item.distance
            console.log(this.poisData);

            })
          
            
          });
        });
        // AMap.service(["AMap.PlaceSearch"], () => {
        //   //构造地点查询类
        //   var placeSearch = new AMap.PlaceSearch({
        //     // 兴趣点类别
        //     type: "交通设施服务",
        //     citylimit: true, //是否强制限制在设置的城市内搜索
        //     map: this.map, // 展现结果的地图实例
        //     panel: "panel", // 结果列表将在此容器中进行展示。
        //     autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        //   });
        //   var cpoint = [
        //     this.content.location.longitude,
        //     this.content.location.latitude
        //   ]; //中心点坐标
        //   placeSearch.searchNearBy("", cpoint, 10000, (status, result) => {
        //     console.log(result);
        //     this.traffic = result.poiList.pois;
        //      this.distance = result.poiList.pois.map(item=>{
        //       return item.distance
        //     })
        //     // console.log(this.traffic);
            
        //   });
        // });

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