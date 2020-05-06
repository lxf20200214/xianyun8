<template>
  <div class="post-item">
    <a href="javascript:;" class="img">
      <h4>{{data.title}}</h4>
    </a>

    <p>{{data.summary}}</p>
    <div class="card-images">
      <img :src="item" v-for="(item,index) in data.images" :key="index" />
    </div>
    <div class="post-info">
      <div class="post-info-left">
        <span>
          <i class="el-icon-location-outline"></i>
          {{data.cityName}}
        </span>
        <span>
          <i>by</i>
          <a href="javascript:;">
            <img :src="`${$axios.defaults.baseURL}${data.account.defaultAvatar}`" alt />
            <i class="commonality">{{data.account.nickname}}</i>
          </a>
        </span>
        <span class="el-icon-view"></span>
        {{data.watch}}
      </div>
      <div class="post-info-right commonality">{{data.like?data.like:'0'}} 赞</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.data.images = this.data.images.slice(0, 3);
    // console.log(this.data.images);
  }
};
</script>

<style lang='less' scoped>
a:hover {
  color: orange;
}
.post-item {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  .img {
    h4 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 15px;
      font-weight: 400;
      font-size: 18px;
    }
  }

  p {
    margin-bottom: 15px;
    line-height: 1.5;
    font-size: 14px;
    height: 63px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .card-images {
    display: flex;
    margin: 15px 0;
    box-sizing: border-box;
    img {
      flex: 0 0 1;
      width: 220px;
      height: 150px;
      object-fit: cover;
    }
    img:nth-child(2) {
      padding: 0 20px;
    }
  }
  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .post-info-left {
      display: flex;
      font-size: 12px;
      color: #999;
      align-items: center;
      // .el-icon-location-outline {
      //   margin-right: 10px;
      // }
      span {
        margin-right: 10px;
        a {
          img {
            display: inherit;
            width: 16px;
            height: 16px;
            border-radius: 100px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>