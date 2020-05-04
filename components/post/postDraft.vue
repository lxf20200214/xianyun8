<template>
  <div class="draft-box">
    <h4 class="draft-title">
      草稿箱(5)
    </h4>
    <div class="draft-list">
      <div class="draft-item" v-for="(item, index) in draftData" :key="index">
        <div class="draft-post-title" @click="handleClick(item)">
          {{ item.title }}
          <span class="iconfont el-icon-edit"></span>
        </div>
        <p>{{ moment().format("YYYY-MM-DD") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      draftData: [],
      moment
    };
  },
  mounted() {
    setTimeout(() => {
      this.draftData = this.$store.state.post.saveData;
      console.log(123, this.draftData);
    }, 0);
  },
  watch: {
    "$store.state.post.saveData"() {
      this.draftData = this.$store.state.post.saveData;
      console.log(123, this.draftData);
    }
  },
  methods: {
    handleClick(item) {
      this.$emit("getDraft", item);
    }
  }
};
</script>

<style scoped lang="less">
.draft-box {
  border: 1px solid #ddd;
  padding: 10px;
  .draft-title {
    margin-bottom: 10px;
    font-weight: 400;
    color: #666;
  }
  .draft-list {
    .draft-item {
      margin-bottom: 10px;
      font-size: 14px;
      .draft-post-title {
        cursor: pointer;
        p {
          color: #999;
        }
      }
      .draft-post-title:hover {
        color: orange;
        text-decoration: underline;
      }
    }
  }
}
</style>
