<template>
  <myDialog class="dialog" @handlerSubmit='handlerSubmit' :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :title="'定制场景'">
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
          <img src="@/assets/upload.png" alt>
          <span class="inner-text">
            <span class="plus">+</span>
            点击上传文件
          </span>
        </div>
      </el-form-item>
    </el-form>
  </myDialog>
</template>
<script>
import myDialog from "../myDialog/index.vue";
export default {
  components: {
    myDialog
  },
  data() {
    return {
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      dialogVisible: true,
      value1: [],
      options: [
        {
          value: "1",
          label: "算法1"
        },
        {
          value: "2",
          label: "算法2"
        },
        {
          value: "3",
          label: "算法3"
        },
        {
          value: "4",
          label: "算法4"
        },
        {
          value: "5",
          label: "算法5"
        }
      ]
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    handlerSubmit() {
            this.dialogVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
  .upload {
    height: 80px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    border-radius: 4px;
    color: rgb(98, 111, 134);
    line-height: 80px;
    border: 1px solid rgb(0, 78, 145);
    cursor: pointer;
    background: linear-gradient(to top, rgb(0, 59, 120) 0%, rgb(0, 8, 33));
    border-color: rgb(0, 78, 145);
    &::-webkit-input-placeholder {
      /* WebKit browsers，webkit内核浏览器 */
      color: rgb(113, 122, 138);
      font-size: 16px;
    }
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
</style>
