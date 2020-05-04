<template>
  <div class="container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" v-for="(v,index) in list" :key="index">
      <el-breadcrumb-item to="/hotel/index">酒店</el-breadcrumb-item>
      <el-breadcrumb-item to="/hotel/index">广州酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{v.name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 头部 -->
    <div class="header" v-for="(item,index) in list" :key="index+1">
      <h2 class="title">
       {{item.name}}
        <!--  -->
        <span
          v-for="(i,index) in item.hotellevel"
          :key="index+4"
          class="iconfont iconhuangguan"
          title="热度"
        ></span>
      </h2>
      <div class="store_detail">
      <div> {{item.alias}} </div>
      <div>
          <span class="iconfont el-icon-location">{{item.address}}</span>
        </div>
      </div>
    </div>
    <!-- 图片 -->
    <div class="picture">
      <div class="picture_left">
        <img  :src="content" alt />
      </div>
      <div class="picture_right">
        <img :src="item.value" alt="" v-for="(item,index) in img " :key="index+3" @click="handleClick(item,index)"> 
      </div>
    </div>
        <!-- 其他推荐 -->
    <DetailContent :data="item.products" v-for="(item,index) in list" :key="index+2"/>
    <!-- 地图  -->
    <DetailMap />
    <!-- 基本信息 -->
    <DetaiInformation :data="list" />

    <!-- 评分 -->
    <DetailGrade :data="item" v-for="(item,index) in list " :key="index+5" />
  </div>
</template>

<script>
// 导入评分组件
import DetailGrade from "@/components/hotel/detailGrade";
// 导入酒店基本信息组件
import DetaiInformation from "@/components/hotel/detaiInformation";
// 导入地图组件
import DetailMap from "@/components/hotel/detailMap";
// 导入图片跟其他推荐组件
import DetailContent from "@/components/hotel/detailContent";
export default {
  // 注册组件
  components: {
    DetailGrade,
    DetaiInformation,
    DetailMap,
    DetailContent
  },
  data(){
    return{
      list:{
        // 皇冠 
        hotellevel:{},
        // 产品 
        products:[],
        // 酒店 
        hotelassets:[],
        // 评分 
        scores:{}
      },
        content:require('../../assets/images/290532299510.jpg'),
      // 大图片默认初始值 
        path:require('../../assets/images/290532299510.jpg'),
       // 图片数据
      img:
      [
        {value:require('../../assets/images/090051494634.jpg')},
        {value:require('../../assets/images/271954226869.jpg')},
        {value:require('../../assets/images/290434094186.jpg')},
        {value:require('../../assets/images/290434247095.jpg')},
        {value:require('../../assets/images/090039224725.jpg')},
        {value:require('../../assets/images/290534002900.jpg')},
      ]
    }
  },
  mounted(){
  setTimeout(() => {
      this.$axios({
      url:'/hotels',
      params:{
       id: this.$route.query.id,
      }
    }).then(res=>{
      // 解构数据
      const { data } = res.data
      console.log(data);
      // 赋值到data进行渲染
        this.list = data 
        // console.log(this.list[0].scores);
        
    })
  }, 0);
  },
  methods:{
      // 点击放大图片事件
    handleClick(item,index){
      // 点击到的图片把路径赋值到path
      // 把小图片给到暂时数据接收
      this.content = item.value,
      // 把大图片给到小图片 
      item.value = this.path
      // 再把暂存数据的图片给回大图片
      this.path=this.content

    },
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
    .iconhuangguan {
      color: #ff9900;
    }
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
    img:nth-child(odd){
    margin-left: 10px;
    }
    img:nth-child(-n+4){
   margin-bottom: 10px;
    }
  }
 
  .mr {
    margin-right: 10px;
  }
}
}
</style>