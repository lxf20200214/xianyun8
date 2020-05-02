<template>
  <div>
    <div class="picture">
      <div class="picture_left">
        <img  :src="content" alt />
      </div>
      <div class="picture_right">
        <img :src="item.value" alt="" v-for="(item,index) in img " :key="index" @click="handleClick(item,index)"> 
      </div>
    </div>
    <div class="recommend">
      <!-- <el-table :data="tableData" style="width: 100%">
           <nuxt-link to="https://hotels.ctrip.com/hotel/694679.html">  
        
        <el-table-column prop="date" label="价格来源" width="410"  :row-click="handleTo">
        </el-table-column>
       </nuxt-link>
        <el-table-column prop="name" label="低价房型" width="410"></el-table-column>
        <el-table-column prop="address" label="最低价格/每晚" width="180" style="color: #f90;">
          <span style="color: #f90;" > </span> 起
          <span class="iconfont el-icon-arrow-right" style="color: #f90;"></span>
        </el-table-column>
      </el-table> -->

      <!-- row行 col列 -->
     <!-- <el-row class="cell" type="flex" >
        <el-col :span="10">
          <span>基本信息</span>
        </el-col>
        <el-col :span="9" >
          <span>低价房型</span>
        </el-col>
        <el-col :span="5" class="money">
          <span>最低价格/每晚</span>
        </el-col>
      </el-row> -->
     <!-- <el-row class="cell" v-for="(item,index) in 3" :key="index" @mouseover="mouseOver(index)" @mouseleave="mouseOut(index)">
        <el-col :span="10" ref="cell" >
          <span>携程</span>
        </el-col>
        <el-col :span="10" >
          <span>高级大床房</span>
        </el-col>
        <el-col :span="4" class="money">
          <span style="color:#ffd89f;width:50px">¥8888</span> 起 <i  style="color:#ffd89f" class="iconfont el-icon-arrow-right"></i>
        </el-col>
      </el-row> -->
      <ul class="ul cell">
         <li>基本信息</li>
        <li style="margin-left:15px">低价房型</li>
        <li>最低价格/每晚</li>
      </ul>
    
      <ul   ref="list"  class="cell" v-for="(item,index) in 3" :key="index"   @mouseenter="handleEnter(index)" @mouseleave="handleLeave(index)"  @click="handleTo()"  >
        <li>基本信息</li>
        <li>低价房型 </li>
        <li>
          <span style="color:#ffd89f;width:50px">¥8888</span> 起 <i  style="color:#ffd89f" class="iconfont el-icon-arrow-right"></i>
        </li>
        </ul>
    </div>
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      content:require('../../assets/images/290532299510.jpg'),
      // 表格数据
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
      ],
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
    };
  },
  mounted(){},
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
      // 跳转携程
    handleTo(){
      location.href="https://hotels.ctrip.com/hotel/694679.html"
    },
    // 鼠标经过
    handleEnter(index){
      // console.log(index);
      //  this.$refs.list.style.background='gray'
         const cell= document.querySelectorAll('.cell')
         cell[index+1].style.background="#f5f7fa"
    },
    // 鼠标离开
    handleLeave(index){
      // console.log(index);
       const cell= document.querySelectorAll('.cell')
        cell[index+1].style.background=""

    }
  }
};
</script>

<style lang="less" scoped>
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
.recommend {
  margin-top: 50px;
  cursor: pointer;
  .cell{
    display: flex;
    height: 35px;
    padding: 5px 20px;
    color: grey;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    align-items: center;
      li:nth-child(3){
        margin-right: 100px;
      }
  }
}
</style>