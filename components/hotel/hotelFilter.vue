<template>
  <div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
    <script src="https://webapi.amap.com/loader.js"></script>

    <!-- <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=4e7b717582fe951d6aeb7920826f06e0&plugin=AMap.CitySearch"
    ></script>-->
=======
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=4e7b717582fe951d6aeb7920826f06e0&plugin=AMap.CitySearch"
    ></script>
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
                placeholder="切换城市"
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
              <el-popover width="300" placement="bottom-start" v-model="visible">
=======
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
              <el-popover
                width="300"
                placement="bottom-start"
                v-model="visible"
              >
<<<<<<< HEAD
=======
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
                        <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
=======
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                        <el-option
                          v-for="item in 10"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
<<<<<<< HEAD
=======
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
                        <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
=======
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                        <el-option
                          v-for="item in 10"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
<<<<<<< HEAD
=======
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="primary">
                  <div style="text-align: right; padding-top: 15px ">
<<<<<<< HEAD
                    <el-button type="primary" size="mini" @click="visiblepeople"
                      >确定</el-button
                    >
=======
<<<<<<< HEAD
                    <el-button type="primary" size="mini" @click="visiblepeople">确定</el-button>
=======
                    <el-button type="primary" size="mini" @click="visiblepeople"
                      >确定</el-button
                    >
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                  </div>
                </el-row>
                <!-- readonly是否只读 -->
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
              <div @click="switchshow" class="switchshow">
                <el-link>
                  <i class="el-icon-d-arrow-right"></i>等25个区域
                </el-link>
              </div>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="3">
              <el-badge value="?" class="item" type="primary">
<<<<<<< HEAD
=======
<<<<<<< HEAD
                <el-tooltip content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top">
=======
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                <el-tooltip
                  content="等级均价由平日价格计算得出，节假日价格会有上浮。"
                  placement="top"
                >
<<<<<<< HEAD
=======
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                  <span size="small">均价</span>
                </el-tooltip>
              </el-badge>
            </el-col>
            <el-col :span="21">
              <div class="grid-content bg-purple grid-content-bottom">
                <el-col :span="7">
<<<<<<< HEAD
=======
<<<<<<< HEAD
                  <el-tooltip content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="bottom-start">
=======
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                  <el-tooltip
                    content="等级均价由平日价格计算得出，节假日价格会有上浮。"
                    placement="bottom-start"
                  >
<<<<<<< HEAD
=======
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
                  <el-tooltip content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="bottom-start">
=======
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                  <el-tooltip
                    content="等级均价由平日价格计算得出，节假日价格会有上浮。"
                    placement="bottom-start"
                  >
<<<<<<< HEAD
=======
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
                  <el-tooltip content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="bottom-start">
=======
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                  <el-tooltip
                    content="等级均价由平日价格计算得出，节假日价格会有上浮。"
                    placement="bottom-start"
                  >
<<<<<<< HEAD
=======
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
        <!-- 地图 -->
        <el-col :span="11">
<<<<<<< HEAD
          <div
            class="grid-content bg-purple-light"
            v-loading="maploading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="map"
            style="width: 100%"
          >
=======
          <div class="grid-content bg-purple-light">
>>>>>>> dev
            <div id="container"></div>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="border">
      <el-col :span="22">
        <div class="grid-content bg-purple-dark">
          <div class="block">
            <div class="blockspan">
              <span class="demonstration">价格</span>
              <span>0-{{ pricevalue }}</span>
            </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
            <el-slider v-model="pricevalue" :max="4000" @change="pricevalue1"></el-slider>
=======
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
            <el-slider
              v-model="pricevalue"
              :max="4000"
              @change="pricevalue1"
            ></el-slider>
<<<<<<< HEAD
=======
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
<<<<<<< HEAD
                  levelscheckList.length > 1
                    ? "已选" + levelscheckList.length + "项"
                    : levelscheckList[0] || "不限"
=======
<<<<<<< HEAD
                levelscheckList.length > 1
                ? "已选" + levelscheckList.length + "项"
                : levelscheckList[0] || "不限"
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" placement="bottom-start">
<<<<<<< HEAD
=======
                <el-dropdown-item v-for="item in levels.levels" :key="item.levels">
                  <el-checkbox :label="item.name" @change="dropdownitem" v-model="levelscheckList"></el-checkbox>
=======
                  levelscheckList.length > 1
                    ? "已选" + levelscheckList.length + "项"
                    : levelscheckList[0] || "不限"
                }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" placement="bottom-start">
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                <el-dropdown-item
                  v-for="item in levels.levels"
                  :key="item.levels"
                >
                  <el-checkbox
                    :label="item.name"
                    @change="dropdownitem"
                    v-model="levelscheckList"
                  ></el-checkbox>
<<<<<<< HEAD
=======
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
<<<<<<< HEAD
                    typescheckList.length > 1
                      ? "已选" + typescheckList.length + "项"
                      : typescheckList[0] || "不限"
=======
<<<<<<< HEAD
                  typescheckList.length > 1
                  ? "已选" + typescheckList.length + "项"
                  : typescheckList[0] || "不限"
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                  }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
<<<<<<< HEAD
=======
                  <el-dropdown-item v-for="item in levels.types" :key="item.levels">
                    <el-checkbox :label="item.name" @change="dropdownitem" v-model="typescheckList"></el-checkbox>
=======
                    typescheckList.length > 1
                      ? "已选" + typescheckList.length + "项"
                      : typescheckList[0] || "不限"
                  }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                  <el-dropdown-item
                    v-for="item in levels.types"
                    :key="item.levels"
                  >
                    <el-checkbox
                      :label="item.name"
                      @change="dropdownitem"
                      v-model="typescheckList"
                    ></el-checkbox>
<<<<<<< HEAD
=======
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
<<<<<<< HEAD
                    assetscheckList.length > 1
                      ? "已选" + assetscheckList.length + "项"
                      : assetscheckList[0] || "不限"
=======
<<<<<<< HEAD
                  assetscheckList.length > 1
                  ? "已选" + assetscheckList.length + "项"
                  : assetscheckList[0] || "不限"
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                  }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
<<<<<<< HEAD
=======
                  <el-dropdown-item v-for="item in levels.assets" :key="item.levels">
=======
                    assetscheckList.length > 1
                      ? "已选" + assetscheckList.length + "项"
                      : assetscheckList[0] || "不限"
                  }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                  <el-dropdown-item
                    v-for="item in levels.assets"
                    :key="item.levels"
                  >
<<<<<<< HEAD
=======
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
                    <el-checkbox
                      :label="item.name"
                      @change="dropdownitem"
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
<<<<<<< HEAD
                    brandscheckList.length > 1
                      ? "已选" + brandscheckList.length + "项"
                      : brandscheckList[0] || "不限"
                  }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
=======
<<<<<<< HEAD
                  brandscheckList.length > 1
                  ? "已选" + brandscheckList.length + "项"
                  : brandscheckList[0] || "不限"
                  }}
                  <i
                    class="el-icon-arrow-down el-icon--right"
                  ></i>
=======
                    brandscheckList.length > 1
                      ? "已选" + brandscheckList.length + "项"
                      : brandscheckList[0] || "不限"
                  }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
                      @change="dropdownitem"
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
<<<<<<< HEAD
    <!-- <div v-bind="hotelFilter"></div> -->
  </div>
</template>
<script type="text/javascript"></script>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
=======
    <div v-bind="hotelFilter"></div>
  </div>
</template>

<script>
export default {
>>>>>>> dev
  data() {
    return {
      form: {
        hotelcity: "",
        value1: "嘻嘻",
        value2: "",
        value3: ""
      },
<<<<<<< HEAD
=======

>>>>>>> dev
      //加载
      maploading: true,
      map: {}, // 地图对象
      city: "",
<<<<<<< HEAD
=======
      hotelcityid: "", //城市id
>>>>>>> dev
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
      markerslist: [], //地图列表
      levels: {},
      inputtext: "" //人数输入框的值
    };
  },
<<<<<<< HEAD
=======
  beforeMount() {
    this.markerslist = this.$store.state.hotel.hotellist;
    console.log(this.markerslist);
  },
>>>>>>> dev
  mounted() {
<<<<<<< HEAD
=======
    setTimeout(() => {
      let map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 8 //级别
<<<<<<< HEAD
      });
      this.map = map;
      this.markersmap(this.$store.state.hotel.hoteldefaultlist);
=======
        // center: position //中心点坐标
      });
      this.map = map;
      this.hotelcityid = this.$store.state.hotel.setcitydata.id;
      this.getCities(this.hotelcityid);
>>>>>>> dev
      map.clearMap(); // 清除地图覆盖物
    }, 10);
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
<<<<<<< HEAD
    onSubmit() {
      this.$emit("myclick", this.form.hotelcity);
    },
=======
    onSubmit() {},
>>>>>>> dev
    //多选框绑定值发生变化时
    dropdownitem(value) {},
    //切换城市时触发
    handleSelect() {},
    //返回输入建议的方法
    querySearch(queryString, cb) {
      if (!queryString) {
        // 如果输入框的值是空的话把之前的城市列表删除掉
        return;
      }
<<<<<<< HEAD
      this.$axios({
        url: "/hotels",
        params: {
          name_contains: queryString
        }
      }).then(res => {
        const { data } = res.data;
        console.log(res);

        cb(data);
        // 保存this.form数据到vuex中,供历史记录调用
      });
=======
<<<<<<< HEAD
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
      // this.$emit("myclick");
      // this.getCities(queryString).then(value => {
      //   let value1 = [];
      //   value1.push({
      //     value: value.city
      //   });
      //
      // });
      // console.log();

      // cb([
      //   {
      //     value: this.form.hotelcity
      //   }
      // ]);
    },
    //封装渲染的地图图标
    markersmap(data) {
      var infoWindow = new AMap.InfoWindow({});
      this.maploading = false;
=======
      this.getCities(queryString).then(value => {
        let value1 = [];
        value1.push({
          value: value.city
        });
        cb(value1);
      });
    },
    // 封装请求城市的方法
    getCities(value) {
      // 请求和value相关的城市
      console.log(value);

      return this.$axios({
        url: "/hotels",
        params: {
          city: value
        }
      }).then(res => {
        // data是城市的数组
        // console.log(res);
        const { data } = res.data;
        console.log(data);

        if (data.length) {
          this.markersmap(data);
        }
        return res.config.params;
      });
      // });
    },
    //封装渲染的地图图标
    markersmap(data) {
>>>>>>> dev
      let markers = [];
      data.map((item, index) => {
        // console.log(index + 1, item.name, item.location.latitude);
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
<<<<<<< HEAD
      markers.forEach((marker, index) => {
<<<<<<< HEAD
=======
        console.log(marker.name);
=======

      markers.forEach((marker, index) => {
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
        let pp = new AMap.Marker({
          map: this.map,
          content: marker.content,
          position: [marker.position[0], marker.position[1]],
<<<<<<< HEAD
          title: marker.name,
          text: "oo"
          //级别
        });
        pp.on("mouseover", e => {
          infoWindow.setContent(marker.name);
<<<<<<< HEAD
          infoWindow.open(this.map, e.target.getPosition());
=======
          infoWindow.open(map, e.target.getPosition());
=======
          title: marker.name
          //级别
        });

        pp.on("mouseover", e => {
          pp.setLabel({
            offset: new AMap.Pixel(-5, -5), //设置文本标注偏移量
            content: `<div class='info1'>${marker.name}</div>`, //设置文本标注内容
            direction: "top" //设置文本标注方位
          });
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
        });
        pp.on("mouseout", e => {
          this.map.clearInfoWindow();
        });
      });
    },

    //滑块的监听
    pricevalue1(value) {
<<<<<<< HEAD
      // console.log(value);
      // console.log(this.pricevalue);
    },
    //每间人数成人选择的监听
    chengren(value) {
=======
      console.log(value);
      console.log(this.pricevalue);
    },
    //每间人数成人选择的监听
    chengren(value) {
      console.log(value);
>>>>>>> dev
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
    }
  },
  //监听
<<<<<<< HEAD
  // computed: {
  //   hotelFilter() {
  //     return;
  //   }
  // },
  //监听路由变化
  watch: {
    $route() {
      console.log(this.$route.query.page);
      if (this.$route.query.page != undefined) {
        setTimeout(() => {
          AMapLoader.load({
            key: "4e7b717582fe951d6aeb7920826f06e0", //首次调用load必须填写key
            version: "2.0", //JSAPI 版本号
            plugins: ["AMap.CitySearch", "AMap.Scale"] //同步加载的插件列表
          })
            .then(AMap => {
              let map = new AMap.Map("container", {
                resizeEnable: true,
                zoom: 13 //级别
              });
              map.clearMap(); // 清除地图覆盖
              this.map = map;
              let data = [];
              setTimeout(async () => {
                data = [...this.$store.state.hotel.hotellist];
                await this.markersmap(data);
              }, 10);
            })
            .catch(e => {
              console.error(e); //加载错误提示
            });
        }, 10);
      } else {
        setTimeout(() => {
          AMapLoader.load({
            key: "4e7b717582fe951d6aeb7920826f06e0", //首次调用load必须填写key
            version: "2.0", //JSAPI 版本号
            plugins: ["AMap.CitySearch", "AMap.Scale"] //同步加载的插件列表
          })
            .then(AMap => {
              let map = new AMap.Map("container", {
                resizeEnable: true,
                zoom: 13 //级别
              });
              map.clearMap(); // 清除地图覆盖
              this.map = map;
              this.markersmap(this.$store.state.hotel.hoteldefaultlist);
            })
            .catch(e => {
              console.error(e); //加载错误提示
            });
        }, 10);
      }
<<<<<<< HEAD
=======

      // 在页数切换之前呢，先清除掉地图上的其他内容
      // this.map = new AMap.Map("container", {
      //   zoom: 11 //级别
      // });
=======
  computed: {
    hotelFilter() {
      // return console.log(this.markerslist + "变化了");
>>>>>>> dev
>>>>>>> 9fa0b8a7876c7b2448eecbd10962048fe127a6ed
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
  /deep/ e-col {
    border-right: 1px solid #cccccc;
  }
}
</style>
