<template>
  <div>
    <div class="menus-body" @mouseleave="handleLeave">
      <div class="menu" v-for="(item,index) in list" :key="index" @mouseenter="handleEnter(index)">
        <div class="menu-item">
          <span>{{item.type}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>

        <div class="listpost" v-if="current !== false">
          <div v-for="(item2,index2) in item.children" :key="index2">
            <a href="#">
              <i class="commonality">{{index2+1}}</i>
              <em class="commonality">{{item2.city}}</em>
              <span>{{item2.desc}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      current: false
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res);

      const { data } = res.data;
      this.list = data;
    });
  },
  methods: {
    // 左侧菜单鼠标移入的事件
    handleEnter(index) {
      // 记录当前的索引
      this.current = index;
      // console.log(index);
    },
    // 鼠标离开时候触发的事件
    handleLeave() {
      this.current = false;
      // console.log(this.current);
    }
  }
};
</script>

<style lang="less" scoped>
.menus-body {
  width: 260px;
  border: 1px solid #ddd;
  border-right: none;
  border-bottom: none;
  box-shadow: 0 0 1px #f5f5f5;
  z-index: 2;
  position: relative;

  .menu-item {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    padding: 0 10px 0 20px;
    font-size: 14px;

    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 14px;
    }
    i {
      font-size: 20px;
      color: #999;
    }
  }
  .listpost {
    position: absolute;
    top: -1px;
    right: -350px;
    border: 1px solid #ddd;
    width: 350px;

    background-color: #fff;
    z-index: 3;

    div {
      font-size: 14px;
      line-height: 40px;
      padding: 0 10px;
    }
    i {
      font-size: 24px;
      font-style: italic;
    }
    span {
      color: #999;
    }
    em {
      padding: 0 10px;
    }
    .commonality {
      padding-left: 10px;
    }
  }
  .menu-item:hover {
    color: orange;

    border-right: 0;
  }
}
</style>