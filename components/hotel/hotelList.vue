<template>
  <div>
    <div class="hote" v-for="(item,index) in list" :key="index">
      <div class="hoteimg">
        <a href="#">
          <img :src="item.photos" alt />
        </a>
      </div>
      <div class="hotetitle">
        <h4>
          <a href="#">{{item.name}}</a>
        </h4>
        <div class="graded">
          <span class="location">{{item.alias}}</span>
        </div>

        <div class="evaluate">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
            @change="item.stars"
          ></el-rate>
          <span class="commonality">17</span>条评价
          <span class="commonality">62</span>
          篇游记
        </div>
        <i class="iconfont iconlocation"></i>
        <span class="place">位于: {{item.address}}</span>
      </div>
      <div class="hotelist">
        <a
          href="https://hotels.ctrip.com/hotel/694679.html"
          v-for="(item2,index2) in item.products"
          :key="index2"
        >
          <span>{{item2.name}}</span>
          <span>
            <em class="commonality">￥{{item2.price}}</em>
            起
            <i class="el-icon-arrow-right"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3.4,
      list: []
    };
  },

  mounted() {
    this.$axios({
      url: "/hotels"
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.list = data;
    });
  }
};
</script>

<style lang="less" scoped>
a:hover {
  color: #000;
}
.hote {
  margin: 0 auto;
  width: 1020px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  height: 210px;
  padding: 25px 0;
  border-bottom: 1px solid #eee;
}
.hoteimg {
  float: left;
  height: 210px;
  a {
    img {
      width: 300px;
      height: 210px;
      padding: 0 10px;
    }
  }
}

.hotetitle {
  float: left;
  width: 400px;

  h4 {
    font-weight: 400;
    font-size: x-large;
    margin-bottom: 5px;
  }
  .graded {
    display: flex;
    align-items: center;
    height: 30px;
    span {
      margin-right: 5px;
    }
  }
  .location {
    color: #999;
  }
  .evaluate {
    line-height: 50px;
    display: flex;

    align-items: center;
    span {
      padding: 0 5px 0 20px;
      float: left;
    }
  }
  i {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
  }
  .place {
    font-size: 14px;
  }
}

.hotelist {
  float: left;
  width: 235px;
  // display: flex;
  // flex-direction: column-reverse;
  line-height: 50px;
  padding: 0 30px;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 0 20px;
  }
  a:hover {
    background-color: #eee;
    color: #000;
  }
}
</style>