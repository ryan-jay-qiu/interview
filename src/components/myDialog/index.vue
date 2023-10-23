<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" class="dialog" width="30%">
    <div class="title" slot="title">
      <span>{{ title }}</span>
    </div>
    <slot></slot>
    <div v-if="footer" class="footer" @click="handlerSubmit" slot="footer">
      <span>提</span>
      <span>交</span>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "弹窗",
    },
    footer: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialogVisible: true,
    };
  },
  methods: {
    handlerSubmit() {
      this.$emit("handlerSubmit");
    },
  },
};
</script>
<style lang="less" scoped>
.title {
  width: 250px;
  height: 45px;
  padding-left: 45px;

  line-height: 45px;
  background: url("@/assets/form-title.png") no-repeat;
  background-size: contain;
  span {
    font-size: 18px;
    font-weight: 550;
    background: linear-gradient(to top, rgb(1, 26, 61) 0%, #fff 50%, #fff); /* 定义渐变背景 */
    -webkit-background-clip: text; /* 兼容 Webkit 浏览器 */
    background-clip: text; /* 将渐变应用于文本 */
    -webkit-background-clip: text; /* 将渐变应用于文本 */
    color: transparent; /* 文本颜色透明 */
  }
}
.footer {
  width: 120px;
  height: 50px;
  line-height: 50px;
  background: url("@/assets/footer.png") no-repeat;
  background-size: contain;
  margin: 0 auto;
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  span {
    width: 30px;
    color: rgb(248, 195, 3);
  }
}
.dialog {
  /deep/ .el-dialog {
    background: rgb(1, 26, 61);
  }
  /deep/ .el-dialog__body {
    padding-bottom: 0;
  }
  /deep/ .el-form-item__label {
    color: rgb(1, 134, 187);
    width: 100px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 100px !important;
  }
  /deep/ .el-input__inner,
  .upload {
    background: linear-gradient(to top, rgb(0, 59, 120) 0%, rgb(0, 8, 33));
    border-color: rgb(0, 78, 145);
    &::-webkit-input-placeholder {
      /* WebKit browsers，webkit内核浏览器 */
      color: rgb(113, 122, 138);
      font-size: 16px;
    }
  }
  /deep/ .el-tag.el-tag--info {
    border: none;
    background: none;
    color: #ccc1c1;
  }
  /deep/ .el-tag.el-tag--info .el-tag__close {
    background: transparent;
    color: rgb(0, 137, 192);
    border: 2px solid rgb(0, 137, 192);
    font-weight: bold;
  }
}
</style>
