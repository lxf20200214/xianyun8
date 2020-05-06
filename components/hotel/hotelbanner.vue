<template>
  <div class="box">
    <el-carousel height="200px" direction="vertical" :autoplay="true" :interval="4000">
      <el-carousel-item v-for="item in img" :key="item.name" :label="item.name">
        <img :src="item.url" alt class="img" />
      </el-carousel-item>
    </el-carousel>
    <div class="news">
      <h1>热门酒店</h1>
      <span></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: [
        {
          url:
            "https://pages.c-ctrip.com/hotel/201812/00banner/1128_bcqd_780180.jpg",
          name: "百城千店80元起"
        },
        {
          url:
            "https://pages.c-ctrip.com/hotel/201810/banner/1018_liansuo_PC_780x180.jpg",
          name: "连锁酒店85元起"
        },
        {
          url:
            "https://images3.c-ctrip.com/ad/bigbutton/201702/0207_xky_780-180.jpg",
          name: "新开业酒店嘉年华 "
        },
        {
          url: "https://pages.c-ctrip.com/hotel/201902/qjdzb/qjdzb_780_180.jpg",
          name: "电影取景地"
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
/deep/.el-carousel__item .img {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  object-fit: cover;
}
.box {
  position: relative;
}
.news {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 5px solid #2577e3;
  h1 {
    color: #2577e3;
  }
  span {
    right: 10px;
    width: 189px;
    height: 44px;
    background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588770912546&di=fc6560bb72cccf65d7329d86ef6c42d5&imgtype=0&src=http%3A%2F%2Fimg.kuai8.com%2Fattaches%2Fnews%2Fimage%2F20161110%2F201611101804058234.png")
      no-repeat -50px center;
  }
  background-size: 100px 100px;
}
/deep/.el-carousel__indicators--labels {
  width: 150px;
  left: 850px;
  bottom: 0px;
  top: 0px;
}
/deep/.el-carousel__button {
  background-color: transparent;
  display: block;
  height: 50px;
  span {
    color: #fff;
    text-align: center;
    line-height: 32px;
  }
}
/deep/.el-carousel__indicator {
  padding: 0 10px;
  height: 50px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid #dedede;
}

/deep/.is-active::before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  margin: 10% 0 0 -29px;
  border-style: solid;
  border-width: 7px 10px;
  border-color: transparent #2577e3 transparent transparent;
}
/deep/.is-active {
  background-color: #2577e3;
}
// }
</style>