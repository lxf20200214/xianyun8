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
      <h2 class="title">
        锦江之星(吴泾店)
        <span
          v-for="(item,index) in 5"
          :key="index"
          class="iconfont iconhuangguan"
          title="热度"
        ></span>
      </h2>
      <div class="store_detail">
        <p>jin jiang zhi xing (shang hai min hang wu jing dian)</p>
        <p>
          <span class="iconfont el-icon-location">剑川路165号(近龙吴路)</span>
        </p>
      </div>
    </div>
    <!-- 图片和其他推荐 -->
    <Content />
    <!-- 地图  -->
    <Map />
    <!-- 基本信息 -->
    <Information />

    <!-- 评分 -->
    <Grade />
  </div>
</template>

<script>
// 导入评分组件
import Grade from "@/components/hotel/grade";
// 导入酒店基本信息组件
import Information from "@/components/hotel/information";
// 导入地图组件
import Map from "@/components/hotel/map";
// 导入图片跟其他推荐组件
import Content from "@/components/hotel/content";
export default {
  // 注册组件
  components: {
    Grade,
    Information,
    Map,
    Content
  },
  mounted(){
    this.$axios({
      url:'/hotels',
      params:{
       id: this.$route.query.id,
       city:197
      }
    }).then(res=>{
      console.log(res);
      
    })
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
}
</style>