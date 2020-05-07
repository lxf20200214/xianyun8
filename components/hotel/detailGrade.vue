<template>
  <div class="grade">
    <h3>829条真实用户评论</h3>
    <el-row>
      <el-col :span="4" type="felx" class="grade_data">
        <p>总评数: 829</p>
        <p>好评数: 218</p>
        <p>差评数: 12</p>
      </el-col>
      <el-col :span="20" type="felx" class="user_grade">
        <span class="star">
          <div class="watermark">
            <div class="watermark_font">{{value >4?'非常推荐':'推荐'}}</div>
          </div>
          <el-rate
            v-model='value'
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </span>
        <span>
          <canvas id="myCanvas_one"></canvas>
          <span class="grade_detail">
            环境
            <i>{{one}}</i>
          </span>
        </span>
        <span>
          <canvas id="myCanvas_two"></canvas>
          <span class="grade_detail">
            产品
            <i>{{two}}</i>
          </span>
        </span>
        <span>
          <canvas id="myCanvas_three"></canvas>
          <span class="grade_detail">
            服务
            <i>{{three}}</i>
          </span>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      default:()=>{
        return{}
      }
    }
  },
  data() {
    return {
      // 评分默认值
      value: 3.7,
      ctx: "",
      one: 2,
      two: 2,
      three: 2,
    };
  },
  mounted() {
    // 加载到异步队列
        setTimeout(() => {
        // console.log(this.data.scores);
        // 如果有值的时候才赋值
       if (this.data.scores) {
        // 圆圈的评论分数
          this.one = this.data.scores.environment
        this.two = this.data.scores.product
        this.three = this.data.scores.service
       }
        // 评论的星星
              this.value=this.data.stars

         this.$axios({
           url:'/hotels/comments',
           id:this.$route.query.id
         }).then(res=>{
          //  console.log(res);
           
         })     
        }, 0);
  
      // 因为Chrome下需要文档载入完成后才能获得canvas对象。
    var myCanvas_one = document.getElementById("myCanvas_one");
    var myCanvas_two = document.getElementById("myCanvas_two");
    var myCanvas_three = document.getElementById("myCanvas_three");

    // 需要用定时器使其比mounted慢,才可获取mounted的数据
   setTimeout(() => {
        if (myCanvas_one,myCanvas_two,myCanvas_three) {
   
      this.ctx = myCanvas_one.getContext("2d");
      this.getCanvas(this.ctx, this.one);

      this.ctx = myCanvas_two.getContext("2d");
      this.getCanvas(this.ctx, this.two);

      this.ctx = myCanvas_three.getContext("2d");
      this.getCanvas(this.ctx, this.three);
     }
   }, 5);
  },
  methods: {
    // 封装方法
    getCanvas(ctx, num) {
      // 线条宽度
      ctx.lineWidth = 3;
      // 线条 颜色
      ctx.strokeStyle = "#ff9900";
      ctx.beginPath();
      ctx.arc(
        63,
        63,
        60,
        0 - (90 / 360) * (2 * Math.PI),
        (num / 10) * (2 * Math.PI) - (90 / 360) * (2 * Math.PI),
        false
      );
      ctx.stroke();
    }
  }
};
</script>

<style lang="less" scoped>
.grade {
  margin-top: 30px;
  // height: 500px;
  /deep/ .el-row,
  .el-clo {
    height: 115px;
  }
  #myCanvas_one,
  #myCanvas_two,
  #myCanvas_three {
    width: 180px;
    height: 90px;
    display: inline-block;
    // position: relative;
    margin-top: 10px;
  }
  .grade_detail {
    position: absolute;
    top: -77px;
    right: -13px;
    color: #faca60;
    width: 50px !important;
    text-align: center;
    height: 50px !important;
    font-size: 14px;
  }

  h3 {
    margin: 20px 10px;
  }
  .grade_data {
    p {
      margin: 5px 10px;
    }
  }
  .user_grade {
    height: 100%;
    span {
      display: inline-block;
      width: 125px;
      position: relative;
    }
  }
  .star {
    position: relative;
    width: 220px !important;
    text-align: center;
    transform: translateY(-87px);
    /deep/ .el-rate {
      display: inline-block;
    }
    .watermark {
      position: absolute;
      // width: 85px;
      // height: 80px;
      top: -19px;
      left: 61px;
      opacity: 0.25;
      // border-radius: 50%;
      border: 2px solid hotpink;
      transform: rotate(-35deg);
      padding: 2px 6px;
      .watermark_font {
        color: red;
        font-size: 25px;
      }
    }
  }
  i{
    font-size: 13px;
    width: 100%;
    display: inline-block;
  }
}
</style>