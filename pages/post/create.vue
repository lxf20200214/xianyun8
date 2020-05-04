<template>
  <div id="app">
    <div class="container">
      <div class="el-row">
        <div class="main">
          <h2>发表新攻略</h2>
          <p class="create-desc">分享你的个人游记，让更多人看到哦！</p>
          <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.title" placeholder="请输入内容" style="margin-bottom: 22px"></el-input>
            <vue-editor v-model="form.content"></vue-editor>
            <el-form-item label="选择城市" style=" margin-top: 20px;">
              <el-autocomplete
                class="inline-input"
                v-model="form.city"
                :fetch-suggestions="querySearch"
                placeholder="请搜索游玩城市"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-form>

          <el-row type="flex" align="middle">
            <el-button type="primary" @click="clickDraft">发布</el-button>
            <div class="issue">
              或者
              <a href="#" class="draft">保存到草稿</a>
            </div>
          </el-row>
        </div>
      </div>
    </div>
    <div class="drafts">
      <h4>草稿箱（5）</h4>
      <div class="draft-list">
        <div class="draft-item">
          <div>
            <span class="iconfont el-icon-edit"></span>
          </div>
          <p>2020-05-02</p>
        </div>
        <div class="draft-item">
          <div>
            <span class="iconfont el-icon-edit"></span>
          </div>
          <p>2020-05-02</p>
        </div>
        <div class="draft-item">
          <div>
            <span class="iconfont el-icon-edit"></span>
          </div>
          <p>2020-05-02</p>
        </div>
        <div class="draft-item">
          <div>
            <span class="iconfont el-icon-edit"></span>
          </div>
          <p>2020-05-02</p>
        </div>
        <div class="draft-item">
          <div>
            <span class="iconfont el-icon-edit"></span>
          </div>
          <p>2020-05-02</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        city: ""
      }
    };
  },
  methods: {
    handleSelect(item) {
      this.form.city = item.value;
    },
    querySearch(value, cb) {
      if (!value) {
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        const newData = data.map(v => {
          v.value = v.name;
          return v;
        });
        cb(newData);
      });
    },
    clickDraft() {
      console.log(this.form);
      this.$axios({
        url: "posts",
        method: "POST",
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        },
        data: this.form
      }).then(res => {
        console.log(res);
        this.$message.success(res.data.message);
        this.$router.push("/post");
      });
    }
  }
};
</script>

<style lang="less" scopde>
#app {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px 0;
}

.el-row {
  display: flex;
  //   justify-content: space-between;
  box-sizing: border-box;
}
.main {
  width: 750px;
  h2 {
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 10px;
  }
}
.create-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
.issue {
  font-size: 14px;
  padding-left: 15px;
  .draft {
    color: orange;
  }
}
.draft:hover {
  text-decoration: underline;
}
.drafts {
  width: 200px;
  border: 1px solid #ddd;
  padding: 10px;
  height: 320px;
  h4 {
    margin-bottom: 10px;
    font-weight: 400;
    color: #666;
  }
  .draft-list {
    margin-bottom: 10px;
    font-weight: 400;
    color: #666;

    .draft-item {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>
