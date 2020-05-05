<template>
   <div class="hotel_information" >
      <div v-for="(item,index) in data" :key="index">
        <el-row class="basic_information">
        <el-col :span="4">
          <span>基本信息</span>
        </el-col>
        <el-col :span="20" type="felx" class="basic_data">
          <span>入住时间 :14:00之后</span>
          <span>离店事件:12:00之前</span>
          <span>{{item.creation_time}} / {{item.renovat_time}} </span>
          <span>热线电话: {{item.phone}} </span>
        </el-col>
      </el-row>
      <el-row class="basic_information">
        <el-col :span="4">
          <span>主要设施</span>
        </el-col>
        <el-col :span="20" type="felx" class="basic_data">
          <i class="square" v-for="(v,index) in item.hotelassets " :key="index">{{v.name ? v.name:value}}</i>
        </el-col>
      </el-row>
      <el-row class="basic_information">
        <el-col :span="4">
          <span>停车服务</span>
        </el-col>
        <el-col :span="20" type="felx" class="basic_data">
          <span> {{item.parking ? item.parking:content }}</span>
        </el-col>
      </el-row>
      <el-row class="basic_information">
        <el-col :span="4">
          <span>品牌信息</span>
        </el-col>
        <el-col :span="20" type="felx" class="basic_data">
          <span style="color:black;">{{item.real_city}}</span>
        </el-col>
      </el-row>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    //   由父组件传递过来的总数据(包含了info,flights,total,options)
    data: {
      default: () => {
        return {};
      }
    }
  },
  data(){
    return{
      content:"暂时没有哦~",
      value:'wifi'
    }
  },
  mounted(){
   setTimeout(() => {
        // console.log(this.data);
   }, 0);
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
      // width: 74px;
      padding: 0 10px;
      height: 30px;
      margin: 15px 10px;
      background-color: #eeeeee;
      border-radius: 5px;
      text-align: center;
      line-height: 30px;
    }
  }

</style>