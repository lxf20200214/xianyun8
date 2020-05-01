<template>
  <div class="container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/hotel/index">酒店</el-breadcrumb-item>
      <el-breadcrumb-item to="/hotel/index">广州酒店</el-breadcrumb-item>
      <el-breadcrumb-item>锦江之星(吴泾店)</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 头部 -->
    <div class="header">
      <h2 class="title">锦江之星(吴泾店)</h2>
      <div class="store_detail">
        <p>jin jiang zhi xing (shang hai min hang wu jing dian)</p>
        <p>
          <span class="iconfont el-icon-location">剑川路165号(近龙吴路)</span>
        </p>
      </div>
    </div>
    <!-- 图片 -->
    <div class="picture">
      <div class="picture_left">
        <img src="../../assets/images/hotel-1330834_1920.jpg" alt />
      </div>
      <div class="picture_right">
        <img src="../../assets/images/hotel-1330831_1920.jpg" alt />
        <img src="../../assets/images/hotel-1330847_1920.jpg" alt class="mr" />
        <img src="../../assets/images/hotel-1330850_1920.jpg" alt />
        <img src="../../assets/images/hotel-1330854_1920.jpg" alt class="mr" />
        <img src="../../assets/images/公寓，床，卧室_colorhub.me_photos_rgBgwx_5616x3748.jpeg" alt />
        <img
          src="../../assets/images/床，卧室，家具_colorhub.me_photos_WDPXOX_5616x3652.jpeg"
          alt
          class="mr"
        />
      </div>
    </div>

    <!-- 其他推荐 -->
    <div class="recommend">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="价格来源" width="410"></el-table-column>
        <el-table-column prop="name" label="低价房型" width="410"></el-table-column>
        <el-table-column prop="address" label="最低价格/每晚" width="180">
          <!-- <span style="color: #f90;" > </span> 起
          <span class="iconfont el-icon-arrow-right" style="color: #f90;"></span>-->
        </el-table-column>
      </el-table>
    </div>

    <!-- 地图  -->
    <div class="map">
      <script
        type="text/javascript"
        src="https://webapi.amap.com/maps?v=1.4.15&key=e404bbdbce3c1de8d78a5379f2c1577f&plugin=AMap.StationSearch"
      ></script>
      <div id="box"></div>
      <div id="tip" class="info" style="min-width:18rem; display:none;"></div>
      <span>
        <div class="input-card" style="width:18rem;  display:none;">
          <label style="color:grey">公交站点查询</label>
          <div class="input-item">
            <div class="input-item-prepend">
              <span class="input-item-text">站名</span>
            </div>
            <input id="stationKeyWord" type="text" value="阜通" />
          </div>
          <input id="search" type="button" class="btn" value="查询" />
        </div>
      </span>
      <div class="list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <div class="list_box">
              <p v-for="(item,index) in 15" :key="index">1231212313212311321312</p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">交通</el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 基本信息 -->
    <div class="hotel_information">
      <el-row class="basic_information">
        <el-col :span="4">
          <span>基本信息</span>
        </el-col>
        <el-col :span="20" type="felx" class="basic_data">
          <span>入住时间 :14:00之后</span>
          <span>离店事件:12:00之前</span>
          <span>2010年开业/2010年装修</span>
          <span>酒店规模 153间客房</span>
        </el-col>
      </el-row>
      <el-row class="basic_information">
        <el-col :span="4">
          <span>主要设施</span>
        </el-col>
        <el-col :span="20" type="felx" class="basic_data">
          <i class="square">热水壶</i>
        </el-col>
      </el-row>
      <el-row class="basic_information">
        <el-col :span="4">
          <span>停车服务</span>
        </el-col>
        <el-col :span="20" type="felx" class="basic_data">
          <span>暂无~</span>
        </el-col>
      </el-row>
      <el-row class="basic_information">
        <el-col :span="4">
          <span>品牌信息</span>
        </el-col>
        <el-col :span="20" type="felx" class="basic_data">
          <span style="color:black;">锦江</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      number: [388, 799, 699],
      tableData: [
        {
          date: "携程",
          name: "高级大床房",
          address: "¥888 " + " 起  "
        },
        {
          date: "艺龙",
          name: "温馨文艺型",
          address: "¥762 " + " 起  "
        },
        {
          date: "Hotels.com",
          name: "总统套房",
          address: "¥3999  " + " 起  "
        }
      ]
    };
  },
  mounted() {
    console.log(this.tableData);

    var map = new AMap.Map("box", {
      resizeEnable: true,
      center: [113.35, 23.12], //地图中心点
      zoom: 13 //地图显示的缩放级别
    });
    stationSearch();
    /*公交站点查询*/
    function stationSearch() {
      var stationKeyWord = document.getElementById("stationKeyWord").value;
      if (!stationKeyWord) return;
      //实例化公交站点查询类
      var station = new AMap.StationSearch({
        pageIndex: 1, //页码
        pageSize: 60, //单页显示结果条数
        city: "010" //确定搜索城市
      });
      station.search(stationKeyWord, function(status, result) {
        if (status === "complete" && result.info === "OK") {
          stationSearch_CallBack(result);
        } else {
          document.getElementById("tip").innerHTML = JSON.stringify(result);
        }
      });
    }
    /*公交站点查询返回数据解析*/
    function stationSearch_CallBack(searchResult) {
      var stationArr = searchResult.stationInfo;
      var searchNum = stationArr.length;
      if (searchNum > 0) {
        document.getElementById("tip").innerHTML =
          "查询结果：共" + searchNum + "个相关站点";
        for (var i = 0; i < searchNum; i++) {
          var marker = new AMap.Marker({
            icon: new AMap.Icon({
              image:
                "https://a.amap.com/jsapi_demos/static/resource/img/pin.png",
              size: new AMap.Size(32, 32),
              imageSize: new AMap.Size(32, 32)
            }),
            offset: new AMap.Pixel(-16, -32),
            position: stationArr[i].location,
            map: map,
            title: stationArr[i].name
          });
          marker.info = new AMap.InfoWindow({
            content: stationArr[i].name,
            offset: new AMap.Pixel(0, -30)
          });
          marker.on("mouseover", function(e) {
            e.target.info.open(map, e.target.getPosition());
          });
        }
        map.setFitView();
      }
    }
    document.getElementById("search").onclick = stationSearch;
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped lang="less">
.container {
  padding: 5px;
  width: 1000px;
  margin: 0 auto;
  // background-color: #eee;
  // height: 1300px;
  /deep/ .el-breadcrumb {
    padding: 10px 0;
  }
  .header {
    margin-top: 20px;
    .title {
      font-weight: normal;
    }
    .store_detail {
      color: rgb(95, 94, 94);
    }
  }
  .picture {
    height: 360px;
    margin-top: 30px;
    img {
      cursor: pointer;
    }
    .picture_left {
      float: left;
      width: 640px;
      // width: 66%;
      height: 360px;
      img {
        display: inline-block;
        height: 100%;
        width: 100%;
      }
    }
    .picture_right {
      width: 330px;
      float: right;
      height: 360px;

      img {
        float: right;
        width: 160px;
        height: 113px;
      }
    }
    .picture_right img:nth-child(n + 2) {
      margin-bottom: 10px;
    }
    .mr {
      margin-right: 10px;
    }
  }
  .recommend {
    margin-top: 50px;
    cursor: pointer;
    /deep/ .el-table__row .el-table_1_column_3 {
      color: #f90;
    }
  }
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
      background-color: pink;
      .list_box {
        overflow-y: auto;
        width: 315px;
        height: 250px;
      }
    }
  }
  .hotel_information {
    background-color: pink;
    height: 200px;
    .basic_information {
      height: 50px;
      border: 1px solid #eee;
    }
    .basic_data {
      height: 50px;
      color: grey;
      font-size: 14px;
    }
    span {
      display: inline-block;
      padding: 10px 20px;
      line-height: 30px;
    }
    .square {
      display: inline-block;
      width: 64px;
      height: 30px;
      margin: 10px 20px;
      background-color: #eeeeee;
      border-radius: 5px;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>