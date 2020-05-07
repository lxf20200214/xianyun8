<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item>
              <el-autocomplete
                :trigger-on-focus="false"
                class="inline-input"
                v-model="form.hotelcity"
                :fetch-suggestions="querySearch"
                placeholder="目的酒店"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item>
              <div class="block">
                <el-date-picker
                  v-model="form.value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="入住日期"
                  end-placeholder="离开日期"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <el-popover width="300" placement="bottom-start" v-model="visible">
                <el-row class="grid-content-left">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">每间</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-select
                        v-model="form.value2"
                        placeholder="成人"
                        size="small"
                        @change="chengren"
                      >
                        <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-select
                        v-model="form.value3"
                        placeholder="儿童"
                        size="small"
                        style="margin-left: 10px;"
                        @change="ertong"
                      >
                        <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="primary">
                  <div style="text-align: right; padding-top: 15px ">
                    <el-button type="primary" size="mini" @click="visiblepeople">确定</el-button>
                  </div>
                </el-row>

                <el-input
                  readonly
                  placeholder="请输入内容"
                  suffix-icon="el-icon-user"
                  slot="reference"
                  v-model="inputtext"
                  clearable
                ></el-input>
              </el-popover>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查看价格</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <Hotelbanner v-if="$route.query.cityName == undefined" />
    </el-row>
    <el-row v-if="$store.state.hotel.setcitydata
                  .scenics.length>0">
      <el-col :span="24">
        <el-col :span="13">
          <el-col :span="24" class="grid-content-list">
            <el-col :span="3">
              <span>区域:</span>
            </el-col>
            <el-col :span="21">
              <div class="grid-content bg-purple">
                <ul :class="heightactive ? '' : 'active'">
                  <li
                    v-for="(item, index) in $store.state.hotel.setcitydata
                      .scenics"
                    :key="index"
                  >
                    <el-link href="#">{{ item.name }}</el-link>
                  </li>
                </ul>
              </div>
              <div
                @click="switchshow"
                class="switchshow"
                v-if="$store.state.hotel.setcitydata
                  .scenics.length>0"
              >
                <el-link>
                  <i class="el-icon-d-arrow-right"></i>
                  等{{$store.state.hotel.setcitydata
                  .scenics.length}}个区域
                </el-link>
              </div>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="3">
              <el-badge value="?" class="item" type="primary">
                <el-tooltip content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top">
                  <span size="small">均价</span>
                </el-tooltip>
              </el-badge>
            </el-col>
            <el-col :span="21">
              <div class="grid-content bg-purple grid-content-bottom">
                <el-col :span="7">
                  <el-tooltip content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="bottom-start">
                    <el-rate
                      show-score
                      v-model="value"
                      disabled
                      text-color="#ff9900"
                      score-template="$332"
                    ></el-rate>
                  </el-tooltip>
                </el-col>
                <el-col :span="7">
                  <el-tooltip content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="bottom-start">
                    <el-rate
                      show-score
                      v-model="value"
                      disabled
                      text-color="#ff9900"
                      score-template="$521"
                    ></el-rate>
                  </el-tooltip>
                </el-col>
                <el-col :span="7">
                  <el-tooltip content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="bottom-start">
                    <el-rate
                      show-score
                      v-model="value"
                      disabled
                      text-color="#ff9900"
                      score-template="$768"
                    ></el-rate>
                  </el-tooltip>
                </el-col>
              </div>
            </el-col>
          </el-col>
        </el-col>

        <el-col :span="11">
          <div
            class="grid-content bg-purple-light"
            v-loading="maploading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="map"
            style="width: 100%"
          >
            <div id="container"></div>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <el-row
      v-bind="hotelFilter"
      type="flex"
      justify="space-between"
      class="border"
      v-if="$store.state.hotel.setcitydata
                  .scenics.length>0"
    >
      <el-col :span="22">
        <div class="grid-content bg-purple-dark">
          <div class="block3">
            <div class="blockspan">
              <span class="demonstration">价格</span>
              <span>0-{{ pricevalue }}</span>
            </div>
            <el-slider v-model="pricevalue" :max="4000" @input="pricevalue1"></el-slider>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple-dark">
          <div class="block1">
            <span class="demonstration">住宿等级</span>
            <el-dropdown placement="bottom-start">
              <span class="el-dropdown-link">
                {{
                levelscheckList.length > 1
                ? "已选" + levelscheckList.length + "项"
                : levelscheckList[0] || "不限"
                }}
                <i
                  class="el-icon-arrow-down el-icon--right"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown" placement="bottom-start">
                <el-dropdown-item v-for="item in levels.levels" :key="item.levels">
                  <el-checkbox
                    :label="item.name"
                    @change="dropdownitem(item.id,1,item)"
                    v-model="levelscheckList"
                  ></el-checkbox>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple-dark">
          <div class="grid-content bg-purple-dark">
            <div class="block1">
              <span class="demonstration">住宿类型</span>
              <el-dropdown placement="bottom-start">
                <span class="el-dropdown-link">
                  {{
                  typescheckList.length > 1
                  ? "已选" + typescheckList.length + "项"
                  : typescheckList[0] || "不限"
                  }}
                  <i
                    class="el-icon-arrow-down el-icon--right"
                  ></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in levels.types" :key="item.levels">
                    <el-checkbox
                      :label="item.name"
                      @change="dropdownitem(item.id,2,item)"
                      v-model="typescheckList"
                    ></el-checkbox>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple-dark">
          <div class="grid-content bg-purple-dark">
            <div class="block1">
              <span class="demonstration">酒店设施</span>
              <el-dropdown placement="bottom-start">
                <span class="el-dropdown-link">
                  {{
                  assetscheckList.length > 1
                  ? "已选" + assetscheckList.length + "项"
                  : assetscheckList[0] || "不限"
                  }}
                  <i
                    class="el-icon-arrow-down el-icon--right"
                  ></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in levels.assets" :key="item.levels">
                    <el-checkbox
                      :label="item.name"
                      @change="dropdownitem(item.id,3,item)"
                      v-model="assetscheckList"
                    ></el-checkbox>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple-dark">
          <div class="grid-content bg-purple-dark">
            <div class="block1">
              <span class="demonstration">酒店品牌</span>
              <el-dropdown placement="bottom-start">
                <span class="el-dropdown-link">
                  {{
                  brandscheckList.length > 1
                  ? "已选" + brandscheckList.length + "项"
                  : brandscheckList[0] || "不限"
                  }}
                  <i
                    class="el-icon-arrow-down el-icon--right"
                  ></i>
                </span>
                <el-dropdown-menu
                  slot="dropdown"
                  class="infinite-list"
                  v-infinite-scroll
                  style="overflow:auto"
                >
                  <el-dropdown-item
                    v-for="item in levels.brands"
                    :key="item.name"
                    class="infinite-list-item"
                  >
                    <el-checkbox
                      :label="item.name"
                      @change="dropdownitem(item.id,4,item)"
                      v-model="brandscheckList"
                    ></el-checkbox>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MapLoader from "@/plugins/amap.js";
import Hotelbanner from "@/components/hotel/hotelbanner.vue";
export default {
  components: {
    Hotelbanner
  },

  data() {
    return {
      form: {
        hotelcity: "",
        value1: "嘻嘻",
        value2: "",
        value3: ""
      },
      //加载
      maploading: true,
      map: {}, // 地图对象
      city: "",
      //区域内容列表
      visible: false, //是否弹窗,
      heightactive: true, //高度
      value: 3.5,
      pricevalue: 4000, //滑块的价格
      value2: "", //每间显示的值
      levelscheckList: [], //星级复选框
      typescheckList: [], //经济复选框
      assetscheckList: [], //设施复选框
      brandscheckList: [], //品牌的列表
      count: 0, //滚动条的值
      levels: {},
      inputtext: "", //人数输入框的值
      params: {
        city: ""
      },
      hotellevel: [],
      hoteltype: [],
      hotelasset: [],
      hotelbrand: []
    };
  },
  mounted() {
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      const { data } = res.data;
      this.levels = data;
    });
  },

  methods: {
    //是否展开内容
    switchshow() {
      this.heightactive = !this.heightactive;
    },
    //查看价格
    onSubmit() {
      this.$emit("chengshi", this.form.hotelcity);
    },
    //多选框绑定值发生变化时
    dropdownitem(value, index, item) {
      if (index === 1) {
        let index = this.hotellevel.indexOf(value);
        if (index > -1) {
          //   有该id就删除
          this.hotellevel.splice(index, 1);
        } else {
          //   还没有该id,就添加
          this.hotellevel.push(value);
        }
        this.params.hotellevel = this.hotellevel;
      }
      if (index === 2) {
        let index = this.hoteltype.indexOf(value);

        if (index > -1) {
          //   有该id就删除
          this.hoteltype.splice(index, 1);
        } else {
          //   还没有该id,就添加
          this.hoteltype.push(value);
        }
        this.params.hoteltype = this.hoteltype;
      }
      if (index === 3) {
        let index = this.hotelasset.indexOf(value);

        if (index > -1) {
          //   有该id就删除
          this.hotelasset.splice(index, 1);
        } else {
          //   还没有该id,就添加
          this.hotelasset.push(value);
        }
        this.params.hotelasset = this.hotelasset;
      }
      if (index === 4) {
        let index = this.hotelbrand.indexOf(value);
        if (index > -1) {
          //   有该id就删除
          this.hotelbrand.splice(index, 1);
        } else {
          //   还没有该id,就添加
          this.hotelbrand.push(value);
        }
        this.params.hotelbrand = this.hotelbrand;
      }
    },
    //切换城市时触发
    handleSelect() {},
    //返回输入建议的方法
    querySearch(queryString, cb) {
      console.log(queryString);

      if (!queryString) {
        // 如果输入框的值是空的话把之前的城市列表删除掉
        return;
      }
      this.$axios({
        url: "/cities",
        params: {
          name: queryString
        }
      }).then(res => {
        const { data } = res.data;
        console.log(data);

        cb([
          {
            value: data[0].name
          }
        ]);
      });
    },
    //封装渲染的地图图标
    markersmap(data) {
      if (data == "") {
        MapLoader().then(AMap => {
          new AMap.Map("container", {
            resizeEnable: true,
            zoom: 13 //级别
            //中心点坐标
          });
        });
        return;
      }
      MapLoader()
        .then(AMap => {
          let map = new AMap.Map("container", {
            resizeEnable: true,
            zoom: 13, //级别
            center: [
              this.$store.state.hotel.hotellist[0].location.longitude,
              this.$store.state.hotel.hotellist[0].location.latitude
            ] //中心点坐标
          });
          map.clearMap(); // 清除地图覆盖
          this.map = map;
          var infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(10, -3)
          });
          this.maploading = false;
          let markers = [];
          data.map((item, index) => {
            markers.push({
              name: item.name,
              content: `<div class="marker-route marker-marker-bus-from ">
            <span class="markericon "
            v-on:mouseover='ourr'
            style='background-image: url("https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png");
             display: inline-block;
             width: 22px;
             height: 36px;
             background-size: 22px 36px;
             text-align: center;
             line-height: 24px;
             color: #fff;
            '>${index + 1}</span></div>`,
              position: [item.location.longitude, item.location.latitude]
            });
            return markers;
          });
          markers.forEach((marker, index) => {
            let pp = new AMap.Marker({
              map: this.map,
              content: marker.content,
              position: [marker.position[0], marker.position[1]],
              title: marker.name
              //级别
            });
            pp.on("mouseover", e => {
              infoWindow.setContent(marker.name);
              infoWindow.open(this.map, e.target.getPosition());
            });
            pp.on("mouseout", e => {
              this.map.clearInfoWindow();
            });
          });
        })
        .catch(e => {
          console.error(e); //加载错误提示
        });
    },

    //滑块的监听
    pricevalue1(value) {
      // console.log(value);
      // this.pricevalue = value;
      // this.params.price_in = this.pricevalue;
    },
    //每间人数成人选择的监听
    chengren(value) {
      this.form.value2 = value + "成人";
    },
    //儿童的监听
    ertong(value) {
      this.form.value3 = value + "儿童";
    },
    // 人数确定
    visiblepeople() {
      this.visible = false;
      this.inputtext = this.form.value2 + "  " + this.form.value3;
    },
    getHotel(data) {
      return this.$axios({
        url: "/hotels" + "?" + data
      }).then(res => {
        const { data } = res.data;
        this.$emit("chengshi", res.data);
        this.$store.commit("hotel/setHotellist", data);

        return res.data;
      });
      // });
    }
  },
  //监听
  computed: {
    hotelFilter() {
      this.levelscheckList; //星级复选框
      this.typescheckList; //经济复选框
      this.assetscheckList; //设施复选框
      this.brandscheckList; //品牌的列表

      this.params.city = this.$store.state.hotel.setcitydata.id;
      let data = ``;
      for (let key in this.params) {
        console.log(this.params[key]);

        if (Array.isArray(this.params[key])) {
          // debugger;
          this.params[key].forEach(v => {
            data += `&${key}=${v}`;
          });
        } else {
          data += `&${key}=${this.params[key]}`;
        }
      }
      this.getHotel(data);

      return "";
    }
  },
  //监听路由变化
  watch: {
    "$store.state.hotel.hotellist"() {
      this.markersmap(this.$store.state.hotel.hotellist);
    }
  }
};
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  height: 180px;
}
.custom-content-marker {
  position: relative;
  width: 25px;
  height: 34px;
}
.markericon {
  background-image: url("https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png");
  display: inline-block;
  width: 22px;
  height: 36px;
  background-size: 22px 36px;
  text-align: center;
  line-height: 24px;
  color: #fff;
}
.info1 {
  width: auto;
  border: 0;
  padding: 40px 5px;
  background-color: #ffffff;
}

.grid-content-left {
  height: 40px;
  line-height: 40px;
}
.primary {
  margin-top: 20px;

  border-top: 1px silver solid;
}
.grid-content-list {
  margin: 20px 0;
  ul {
    float: left;
    width: 100%;
    height: 50px;
    overflow: hidden;
    li {
      float: left;
      padding-right: 20px;
    }
  }
  .active {
    height: auto;
  }
  .switchshow {
    /deep/ .el-icon-d-arrow-right {
      color: red;
    }
  }
}
.grid-content-bottom {
  /deep/ .el-icon-star-on,
  .el-icon-star-off {
    margin: 0;

    font-size: 16px;
  }
  /deep/ .el-rate__text {
    padding: 0 10px;
  }
}
/deep/.el-checkbox__inner {
  //圆点
  border-radius: 8px;
}
.block1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  .demonstration {
    margin: 15px 0;
  }
}
.infinite-list {
  height: 100px;
}
.blockspan {
  display: flex;
  padding-top: 5px;
  justify-content: space-between;
  margin-bottom: 15px;
}
.border {
  border: 1px solid #cccccc;
  padding: 5px 0 5px 20px;
  margin: 20px 0;
  /deep/ .block1[data-v-68eaeb74] {
    border-left: 1px solid #cccccc;
  }
}
.block3 {
  padding-right: 20px;
}
</style>
