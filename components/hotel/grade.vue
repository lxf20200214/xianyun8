<template>
  <div class="grade">
    <h3>0条真实用户评论</h3>
    <el-row>
      <el-col :span="4" type="felx" class="grade_data">
        <p>总评数: 829</p>
        <p>好评数: 218</p>
        <p>差评数: 12</p>
      </el-col>
      <el-col :span="20" type="felx" class="user_grade">
        <span class="star">
          <div class="watermark">
            <div class="watermark_font">非常推荐</div>
          </div>
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </span>
        <!-- <span><el-progress type="circle" :percentage="70"  width="80" stroke-width="2" color="#f9b220"   text-inside="false">123</el-progress></span>
         <span><el-progress type="circle" :percentage="70"  width="80" stroke-width="2" color="#f9b220"   text-inside="false">123</el-progress></span>
        <span><el-progress type="circle" :percentage="70"  width="80" stroke-width="2" color="#f9b220"   text-inside="false">123</el-progress></span>-->
        <span>
          <canvas id="myCanvas"></canvas>
          <span class="grade_detail">
            环境
            <i>8.3</i>
          </span>
        </span>

        <span>
          <canvas id="Canvas"></canvas>
          <span class="grade_detail">
            环境
            <i>8.3</i>
          </span>
        </span>
        <span>
          <canvas id="my"></canvas>
          <span class="grade_detail">
            环境
            <i>8.3</i>
          </span>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
        // 评分默认值
      value: 3.7,
    }
  },
  mounted() {

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    // 线条宽度
    ctx.lineWidth = 3;
    // 线条 颜色
    ctx.strokeStyle = "#ff9900";
    ctx.beginPath();
    // arc参数 圆中心x坐标 y坐标, 半径  起始角  结束角(以弧度计算)      fasle顺时针 true逆时针
    ctx.arc(
      63,
      63,
      60,
      0 - (90 / 360) * (2 * Math.PI),
      (7 / 10) * (2 * Math.PI) - (90 / 360) * (2 * Math.PI),
      false
    );
    ctx.stroke();
    var a = document.getElementById("my");
    var ctx = a.getContext("2d");
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
      (7 / 10) * (2 * Math.PI) - (90 / 360) * (2 * Math.PI),
      false
    );
    ctx.stroke();
    var b = document.getElementById("Canvas");
    var ctx = b.getContext("2d");
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
      (7 / 10) * (2 * Math.PI) - (90 / 360) * (2 * Math.PI),
      false
    );
    ctx.stroke();
    
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
  #myCanvas,
  #my,
  #Canvas {
    width: 180px;
    height: 90px;
    display: inline-block;
    // position: relative;
    margin-top: 10px;
  }
  .grade_detail {
    position: absolute;
    top: -73px;
    right: -15px;
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
      width: 85px;
      height: 80px;
      top: -45px;
      left: 52px;
      opacity: 0.25;
      border-radius: 50%;
      border: 2px solid #f9b220;
      transform: rotate(-35deg);
      padding: 15px;
      .watermark_font {
        color: #f9b220;
        font-size: 30px;
      }
    }
  }
}
</style>