<template>
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
</template>

<script>
export default {
  mounted(){
    // this.$axios({
    //   url:'/options'
    // }).then(res=>{
    //   console.log(res);
      
    // })
  }
 
}
</script>

<style  lang="less" scoped>
.hotel_information {
    height: 250px;
    .basic_information {
      height: 60px;
      border-bottom: 1px solid #eee;
    }
    .basic_data {
      height: 60px;
      color: grey;
      font-size: 14px;
    }
    span {
      display: inline-block;
      padding: 15px 15px;
      line-height: 30px;
    }
    .square {
      display: inline-block;
      width: 64px;
      height: 30px;
      margin: 15px 20px;
      background-color: #eeeeee;
      border-radius: 5px;
      text-align: center;
      line-height: 30px;
    }
  }

</style>