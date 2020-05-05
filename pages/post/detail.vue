<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="left">
        <PostItem :data="data" v-show="data.title" :total="total" />
        <div v-show="!data.title">没有这个页面</div>

        <div class="post-edit">
          <h4>评论</h4>
          <el-tag
            class="replyTag"
            type="info"
            closable
            :disable-transitions="false"
            @close="handleClose(tagName)"
            v-if="tagName"
          >回复@{{ tagName }}</el-tag>
          <div class="edit">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="textarea"
              resize="none"
            ></el-input>
          </div>
          <div class="edit-bottom">
            <el-row type="flex" justify="space-between">
              <!-- action:上传图片的地址
                list-type:图片上传组件使用图片列表布局
                handlePictureCardPreview:图片预览的事件
                handleRemove:移出图片的事件
                on-success:图片上传成后的回调函数
                file-list:上传的图片列表
              -->
              <el-upload
                :action="$axios.defaults.baseURL + '/upload'"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleImageSuccess"
                :file-list="fileList"
                name="files"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
              <div>
                <el-button size="mini" type="primary" @click="handleSubmit">提交</el-button>
              </div>
            </el-row>
          </div>
        </div>

        <div class="cmt-list">
          <div class="cmt-item" v-for="(item, index) in commentData" :key="index">
            <PostComment :data="item" @getReply="getReply" />
          </div>
        </div>
        <!-- size-change:切换条数时候触发的事件 -->
        <!-- current-change:切换页数时候触发的事件 -->
        <!-- current-page:当前的页数 -->
        <!-- page-size:当前的条数 -->
        <!-- total:总条数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <div class="right">
        <!-- 侧边推荐栏 -->
        <RecommendAside :data="recommendData" />
      </div>
    </el-row>
  </div>
</template>

<script>
import PostItem from "@/components/post/postItem";
import RecommendAside from "@/components/post/recommendAside";
import PostComment from "@/components/post/postComment";
export default {
  data() {
    return {
      data: {},
      commentData: [],
      recommendData: [],
      textarea: "", //编辑评论内容
      // 图片预览要使用的属性
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [], //图片上传的列表
      tagName: "", //回复人
      total: 0, //总条数
      pageIndex: 1, //当前页数
      pageSize: 2, //当前显示的条数
      id: "", //回复id
      pics: [], //提交评论的图片数据
      start: 0 //从多少条开始获取评论
    };
  },
  mounted() {
    // console.dir();
    this.getData();
    this.getComment();
    this.getRecommend();
  },
  methods: {
    // 获取攻略详情
    getData() {
      this.$axios({
        url: "/posts/" + this.$route.query.id
        //   params: {
        //     id: this.$route.query.id
        //   }
      }).then(res => {
        // console.log(res);
        this.data = res.data;
      });
    },
    // 获取评论
    getComment() {
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id,
          _start: this.start,
          _limit: this.pageSize
        }
      }).then(res => {
        // console.log(res);
        this.commentData = res.data.data;
        // console.log(this.commentData);
        this.total = res.data.total;
      });
    },
    // 获取推荐文章
    getRecommend() {
      this.$axios({
        url: "/posts/recommend"
        // params: {
        //   id: this.$route.query.id
        // }
      }).then(res => {
        // this.data = res.data.data;
        // console.log(res);
        this.recommendData = res.data.data;
      });
    },
    // 预览图片的事件
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 移出图片的事件
    handleRemove(file, fileList) {
      //  把当前的图片列表赋值给data
      this.fileList = fileList;
    },
    // 图片上传成功后的事件
    handleImageSuccess(response, file, fileList) {
      //  把当前的图片列表赋值给data
      console.log(response);
      this.pics = response;
      this.fileList = fileList;
    },
    // 提交事件
    handleSubmit() {
      if (this.textarea === "" && this.fileList.length === 0) {
        console.log(123);

        return;
      }

      let config = {
        url: "/comments",
        method: "post",
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        },
        data: {
          content: this.textarea,
          pics: this.pics,
          post: this.$route.query.id
        }
      };
      if (this.id) {
        config.data.follow = this.id;
      }
      this.$axios(config).then(res => {
        console.log(res);
        this.textarea = "";
        this.fileList = [];
        this.pics = [];
        this.$message.success(res.data.message);
        this.getComment();
      });
    },
    // 点击关闭tag的触发的事件
    handleClose() {
      this.tagName = "";
      this.id = "";
    },
    //   切换条数时候触发的事件
    handleSizeChange(val) {
      // 显示条数
      this.pageSize = val;
      //   一般条数发生变化会回到第一页
      this.pageIndex = 1;
      this.start = 0;
      this.getComment();
    },
    // 切换页数时候触发的事件
    handleCurrentChange(val) {
      // 修改页数
      this.pageIndex = val;
      this.start = 0 + (val - 1) * this.pageSize;
      this.getComment();
    },
    // 获取回复人信息
    getReply(item) {
      // console.log(item);
      this.tagName = item.account.nickname;
      this.id = item.id;
      document.querySelector("h4").scrollIntoView();
      // console.log(document.documentElement.scrollTop);
      window.scrollTo(0, document.documentElement.scrollTop + 32);
    }
  },
  components: {
    PostItem,
    RecommendAside,
    PostComment
  },
  watch: {
    $route() {
      this.getData();
      this.getComment();
      this.getRecommend();
    }
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  .left {
    width: 700px;
    margin-bottom: 20px;
    .post-edit {
      h4 {
        font-weight: 400;
        font-size: 18px;
        margin-bottom: 20px;
      }
      .replyTag {
        margin-bottom: 10px;
      }
      .edit {
        margin-bottom: 10px;
      }
      .edit-bottom {
        margin-bottom: 30px;
        /deep/ .el-upload--picture-card {
          width: 100px;
          height: 100px;
          line-height: 100px;
        }
        /deep/ .el-upload-list__item {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
  .right {
    width: 280px;
  }
}
.cmt-list {
  border: 1px solid #ddd;
  .cmt-item {
    padding: 20px 20px 5px;
    border-bottom: 1px dashed #ddd;
  }
  .cmt-item:last-child {
    border: none;
  }
}
</style>
