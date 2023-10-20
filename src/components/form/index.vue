<template>
  <el-dialog class="dialog" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <div class="title" slot="title"><span>定制场景</span></div>
    <el-form label-width="100px" :model="formLabelAlign">
      <el-form-item label="质检场景">
        <el-input placeholder="请输入内容" v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="场景描述">
        <el-input placeholder="请输入内容" v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="场景算法库">
        <el-select style="width: 100%" v-model="value1" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传图片">
        <div class="upload">
          <img src="@/assets/upload.png" alt="" />
          <span class="inner-text">
            <span class="plus">+</span>
            点击上传文件
          </span>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      dialogVisible: true,
      value1: [],
      options: [
        {
          value: "1",
          label: "算法1",
        },
        {
          value: "2",
          label: "算法2",
        },
        {
          value: "3",
          label: "算法3",
        },
        {
          value: "4",
          label: "算法4",
        },
        {
          value: "5",
          label: "算法5",
        },
      ],
    };
  },
  methods: {
    handleClose() {},
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
.dialog {
  /deep/ .el-dialog {
    background: rgb(1, 26, 61);
  }
  /deep/ .el-form-item__label {
    color: rgb(1, 134, 187);
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
  .upload {
    height: 80px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    border-radius: 4px;
    color: rgb(98, 111, 134);
    line-height: 80px;
    border: 1px solid rgb(0, 78, 145);
    .inner-text {
      display: flex;
      align-items: center;
    }
    .plus {
      font-size: 30px;
      padding: 0 25px;
      color: rgb(156, 163, 175);
      font-weight: bold;
    }
  }
}
</style>
