<template>
  <div class="main" @mouseleave="handleLeave">
    <!-- 左边的城市列表 -->
    <div class="left">
      <ul>
        <li
          v-for="(item, index) in cities"
          :key="index"
          @mouseenter="handleEnter(index)"
          :class="{active: current === index}"
        >
          <span>{{item.type}}</span>
          <i class="el-icon-arrow-right"></i>
        </li>
      </ul>
    </div>

    <!-- 右边当前的城市景区列表 -->
    <div class="right" v-if="current !== false">
      <a href="javascript:;" v-for="(item, index) in cities[current].children" :key="index">
        <i class="commonality">{{index+1}}</i>
        <em class="commonality" @click="sendCityName(item.city)">{{item.city}}</em>
        <span @click="sendCityName(item.city)">{{item.desc}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 记录当前的索引
      current: false,

      // 模拟的数据
      cities: []
    };
  },
  methods: {
    // 左侧菜单鼠标移入的事件
    handleEnter(index) {
      // 记录当前的索引
      this.current = index;
    },
    // 鼠标离开时候触发的事件
    handleLeave() {
      this.current = false;
    },
    sendCityName(data) {
      this.$emit("gainCityName", data);
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.cities = data;
    });
  }
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
}
.left {
  width: 260px;
  border: 1px solid #ddd;
  border-right: none;
  border-bottom: none;
  box-shadow: 0 0 1px #f5f5f5;
  position: relative;
  z-index: 9;
}
.left li {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding: 0 20px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    font-size: 20px;
  }
}
.left .active {
  border-right: 1px #fff solid;
  color: orange;
}
.right {
  position: absolute;
  border: 1px #ddd solid;
  left: 260px;
  top: 0;
  padding: 10px;
  width: 360px;
  z-index: 1;
  background-color: #fff;
  a {
    height: 40px;
    float: left;
    i {
      font-size: 26px;
      color: orange;
      text-align: unset;
      font-style: italic;
      padding-right: 10px;
      font-weight: 600;
    }
    em {
      padding-right: 10px;
    }
    em:hover {
      text-decoration: underline;
    }
    span:hover {
      text-decoration: underline;
    }
  }
}
</style> 