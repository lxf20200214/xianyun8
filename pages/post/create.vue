<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="main">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <el-form ref="form" :model="form">
          <el-form-item>
            <el-input placeholder="请输入标题" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item class="editor">
            <!-- <vue-editor v-model="form.content" id="editor"></vue-editor> -->
            <client-only placeholder="Loading Your Editor...">
              <!-- useCustomImageHandler:使用自定义的图片上传  -->
              <!-- @image-added点击上传图片按钮时候的事件 -->
              <vue-editor
                placeholder="Write Something..."
                id="editor"
                useCustomImageHandler
                @image-added="handleImageAdded"
                v-model="form.content"
              ></vue-editor>
            </client-only>
          </el-form-item>
          <el-form-item label="选择城市">
            <!-- fetch-suggestions 返回输入建议的方法 
            获取搜索建议,它的功能就是根据当前输入的关键字,发起请求,把请求的结果显示下拉列表中
            比较类似input事件,有监听作用,不过他可以把数据展示在下拉列表-->
            <!-- select 点击选中建议项时触发 
            选中下拉列表某一项的时候触发的事件,通过参数获取到当前选中的那个选项-->
            <el-autocomplete
              :fetch-suggestions="queryDepartSearch"
              placeholder="请搜索游玩城市"
              @select="handleSelect"
              class="el-autocomplete"
              v-model="form.city"
            ></el-autocomplete>
          </el-form-item>
        </el-form>
        <div class="create-button">
          <el-button type="primary" @click="onSubmit" size="small">发布</el-button>
          <span class="submit-side">
            <span>或者</span>
            <a href="javascript:;" @click="handleSave">保存到草稿</a>
          </span>
        </div>
      </div>
      <div class="aside">
        <PostDraft @getDraft="getDraft" />
      </div>
    </el-row>
  </div>
</template>

<script>
import PostDraft from "@/components/post/postDraft";
import moment from "moment";
export default {
  data() {
    return {
      form: {
        title: "",
        city: "",
        content: ""
      },
      cities: [],
      moment
    };
  },
  components: {
    PostDraft
  },
  methods: {
    // 封装请求城市的方法
    getCities(value) {
      // 请求和value相关的城市
      return this.$axios({
        url: "airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // data是城市的数组
        const { data } = res.data;
        // data的属性没有value属性,需要转换下
        const newData = data.map(v => {
          v.value = v.name;
          return v;
        });
        return newData;
      });
    },
    onSubmit() {
      const rules = [
        {
          // 验证的值,如果是true表示不通过
          value: this.form.title.trim() === "",
          // 错误的提示信息
          message: "标题不能为空"
        },
        {
          // 验证的值,如果是true表示不通过
          value: this.form.content.trim() === "",
          // 错误的提示信息
          message: "内容不能为空"
        },
        {
          // 验证的值,如果是true表示不通过
          value: this.form.city.trim() === "",
          // 错误的提示信息
          message: "请选择城市"
        }
      ];
      // 先假设所有的验证都是通过的
      let isvalid = true;
      rules.forEach(v => {
        // 只要一个判断没通过,阻止后面的判断
        if (!isvalid) return;
        // 发现有不通过的判读
        if (v.value === true) {
          // 提示
          this.$message.warning(v.message);
          // 把通过的状态修改为false
          isvalid = false;
        }
      });
      // 如果验证不通过,就直接返回
      if (!isvalid) return;
      this.$axios({
        url: "/posts",
        method: "post",
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        },
        data: this.form
      }).then(res => {
        const { data } = res;
        this.$message.success(data.message);
        this.form.title = "";
        this.form.city = "";
        this.form.content = "";
      });
    },
    // 城市输入框获得焦点时触发(监听出发城市输入框的变化,一旦输入框的值发生了变化就会触发该事件)
    // value是输入框的值,cb是函数必须要调用
    // cb接收的参数有个固定的格式,参数必须是一个数组,并且数组是又对象组成的,还有对象必须要有value属性
    queryDepartSearch(value, cb) {
      // 如果value值是空的,就不需要请求
      if (!value) {
        // 禁止输入框的值是空的时候显示下拉框
        cb([]);
        // 如果输入框的值是空的话把之前的城市列表删除掉
        this.cities = [];
        return;
      }

      // 根据value请求城市
      this.getCities(value).then(newData => {
        // 保存data中,给blur事件使用,失去焦点的时候选中第一个
        this.cities = newData;
        //  cb是要请求成功之后才调用,因为在这里才可以拿到城市的数据
        cb(newData);
      });
    },
    // 城市下拉选择时触发
    handleSelect(item) {
      console.log(item);
    },

    // 富文本编辑的上传图片的事件
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      // 参数file是接口需要的属性
      formData.append("files", file);

      this.$axios({
        url: "/upload",
        method: "post",
        data: formData
      })
        .then(result => {
          // 回显到页面的编辑器中
          let url = result.data[0].url; // Get url from response
          // 往编辑中插入刚刚上传成的图片,第一个参数是编辑器获得焦点的地方
          Editor.insertEmbed(
            cursorLocation,
            "image",
            this.$axios.defaults.baseURL + url
          );
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存到store草稿箱
    handleSave() {
      let data = { ...this.form };
      data.time = this.moment().format("YYYY-MM-DD");
      // console.log(data.time);

      this.$store.commit("post/setSaveData", data);
      // console.log(this.$store.state.post.saveData);
    },
    // 获取草稿数据,替换
    getDraft(data) {
      this.form = { ...data };
    }
  }
};
</script>

<style lang="less" scopde>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .main {
    width: 750px;
    h2 {
      font-weight: 400;
      font-size: 22px;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }
    .create-button {
      .submit-side {
        margin-left: 10px;
        font-size: 14px;
        a {
          color: orange;
        }
        a:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .aside {
    width: 200px;
  }
}
#editor {
  height: 400px;
}
</style>
