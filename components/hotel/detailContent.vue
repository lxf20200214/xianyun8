<template>
  <div>
    <div class="recommend">
        <ul class="ul cell">
         <li>基本信息</li>
        <li style="margin-left:15px">低价房型</li>
        <li>最低价格/每晚</li>
      </ul>
      <ul   ref="list"  class="cell" v-for="(item,index) in data" :key="index"   @mouseenter="handleEnter(index)" @mouseleave="handleLeave(index)"  @click="handleTo()"  >
        <li>{{item.name}}</li>
        <li >{{item.bestType}} </li>
        <li>
          <span style="color:#ffd89f;width:50px">¥{{item.price}}</span> 起 <i  style="color:#ffd89f" class="iconfont el-icon-arrow-right"></i>
        </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    data:{
     default: () => {
        return {};
      }
    }
  },
  data() {
    return {
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
    };
  },
  mounted(){
setTimeout(() => {
  // console.log(this.data);
}, 0);     
    
  },
  methods:{
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

.recommend {
  margin-top: 50px;
  cursor: pointer;
  .cell{
    display: flex;
    height: 45px;
    padding: 10px 20px;
    color: grey;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    align-items: center;
      li:nth-child(3){
        margin-right: 100px;
      }
      li:nth-child(2){
      margin-left: 15px;
      }
  }
}
</style>