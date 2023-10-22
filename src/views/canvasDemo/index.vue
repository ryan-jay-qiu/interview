<template>
  <div>
    <el-row>
      <!-- 工具栏 -->
      <el-row>
        <el-col :span="24">
          <div id="toolbar">
            <div data-command="save" class="command tool">保存</div>
            <div class="tool" title="历史数据" @click="readHistoryData">回复保存数据</div>
            <div class="tool" title="历史数据" @click="readDataSource">查看元数据</div>
            <div class="tool" title="上传数据" @click="readUploadData">上传数据</div>
            <div class="tool" title="另存为文件" @click="saveAsFile">保存到本地</div>
          </div>
        </el-col>
      </el-row>
      <el-col :span="4">
        <div id="itempannel" class="left">
          <div class="left-title">待拖拽节点</div>
          <div class="left-content">
            <!-- <div class="item">
            <div class="top"></div>
            <div class="text">节点一</div>
            </div>-->
            <div
              v-for="item in data"
              :key="item.text"
              class="getItem item"
              data-shape="circle"
              data-type="node"
              data-color="#09A"
              data-size="60*60"
              :data-label="item.text"
            >
              <div class="top"></div>
              <div class="text">{{item.text}}</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :offset="2" :span="12">
        <div ref="graphContainer" id="page" class="right"></div>
      </el-col>
      <!-- 右键菜单 -->
      <section>
        <div id="contextmenu">
          <div data-status="node-selected" class="menu">
            <el-button data-command="copy" class="command">复制</el-button>
            <el-button data-command="paste" class="command">粘贴</el-button>
            <el-button data-command="delete" class="command">删除</el-button>
          </div>
          <div data-status="edge-selected" class="menu">
            <el-button data-command="delete" class="command">删除</el-button>
          </div>
          <div data-status="canvas-selected" class="menu">
            <el-button data-command="undo" class="command">撤销</el-button>
            <el-button data-command="redo" class="command disable">重做</el-button>
          </div>
        </div>
      </section>
      <myDialog
        :footer="false"
        title="查看元数据"
        :visible.sync="dialogVisible"
        @handlerSubmit="handlerSubmit"
      >
        <JsonEditorVue
          class="jse-theme-dark"
          mode="text"
          :main-menu-bar="false"
          :navigation-bar="false"
          :status-bar="false"
          v-model="dataSourceNode"
        />
      </myDialog>
    </el-row>

    <myDialog
      @handlerSubmit="handlerSubmit"
      :visible.sync="dialogNodeVisible"
      :before-close="() => dialogNodeVisible = false"
      title="编辑节点"
    >
      <el-form label-width="100px" :model="nodeData">
        <el-form-item label="节点大小">
          <el-input placeholder="请输入内容" v-model="nodeData.size"></el-input>
        </el-form-item>
        <el-form-item label="节点颜色">
          <el-input placeholder="请输入内容" v-model="nodeData.color"></el-input>
        </el-form-item>
        <el-form-item label="节点颜色">
          <el-input placeholder="请输入内容" v-model="nodeData.label"></el-input>
        </el-form-item>
      </el-form>
    </myDialog>
  </div>
</template>
<script>
import Vue from "vue";

import VCA from "@vue/composition-api";
import G6Editor from "@antv/g6-editor";
import JsonEditorVue from "json-editor-vue";
import myDialog from "@/components/myDialog";
Vue.use(VCA);
// import mixin from './mixin'
// import { construct } from 'netflix-conductor-json-tree/dist/index'
export default {
  name: "VueG6Editor",
  components: { JsonEditorVue, myDialog },
  data() {
    return {
      // 节点属性表单
      dialogVisible: false,
      dialogNodeVisible: false,
      dataSourceNode: "",
      nodeData: {},
      data: JSON.parse( localStorage.getItem("node")) || [
        { text: "节点一" },
        { text: "节点二" },
        { text: "节点三" },
        { text: "节点四" },
        { text: "节点五" },
        { text: "节点六" }
      ],
      nodeAttributeForm: {
        label: "",
        width: "",
        height: ""
      },
      // 节点属性表单
      edgeAttributeForm: {
        label: ""
      },
      // 画布属性栏表单
      canvasAttributeForm: {
        grid: false,
        cell: 20
      },
      // 编辑器
      editor: null
    };
  },
  mounted() {
    this.initG6Editor();
  },
  created() {
    localStorage.setItem('node',
      JSON.stringify([
        { text: "节点一" },
        { text: "节点二" },
        { text: "节点三" },
        { text: "节点四" },
        { text: "节点五" },
        { text: "节点六" }
      ])
    );
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 初始化
    initG6Editor() {
      const _this = this;
      const editor = new G6Editor();
      this.editor = editor;
      G6Editor.track(false);
      const Command = G6Editor.Command;
      // 注册新命令save
      Command.registerCommand("save", {
        // 禁止保存命令进入队列
        queue: false,
        // 命令是否可用
        enable: editor => {
          return true;
        },
        // 正向命令
        execute(editor) {
          const needSaveData = editor.getCurrentPage().save();
          console.log(needSaveData);
          localStorage.setItem("flowData", JSON.stringify(needSaveData));
          _this.save(needSaveData);
          _this.$message.success("数据已保存");
        },
        // 反向命令
        back(editor) {
          console.log("反向命令");
          console.log(editor);
        },
        // 快捷键：Ctrl + S
        shortcutCodes: [["metaKey", "s"], ["ctrlKey", "s"]]
      });

      // 画布
      const flow = new G6Editor.Flow({
        graph: {
          container: "page"
        },
        align: {
          line: {
            // 对齐线颜色
            stroke: "#FA8C16",
            // 对齐线粗细
            lineWidth: 1
          },
          // 开启全方位对齐
          item: false,
          // 网格对齐
          grid: true
        },
        grid: {
          // 网孔尺寸
          cell: 0
        },
        shortcut: {
          // 开启自定义命令保存的快捷键
          save: true
        }
      });
      window.flow = flow;

      // 设置边
      flow.getGraph().edge({
        shape: "flow-polyline"
      });

      // 元素面板栏
      const itempannel = new G6Editor.Itempannel({
        container: "itempannel"
      });
      // 工具栏
      const toolbar = new G6Editor.Toolbar({
        container: "toolbar"
      });
      // 右键菜单
      const contextmenu = new G6Editor.Contextmenu({
        container: "contextmenu"
      });
      // 挂载以上组件到Editor
      editor.add(flow);
      editor.add(itempannel);
      editor.add(toolbar);
      editor.add(contextmenu);
      // 挂载到window，方便调试
      window.editor = editor;
      // 默认关闭网格
      editor.getCurrentPage().hideGrid();
      // 获取当前画布
      const currentPage = editor.getCurrentPage();
      currentPage.on("afterchange", e => {
        if (e.action === "add") {
          if (
            e.model.nodetype === "startNode" ||
            e.model.nodetype === "endNode"
          ) {
            const nodes = this.editor.getCurrentPage().getNodes();
            for (const item of nodes) {
              if (
                item.model.nodetype === e.model.nodetype &&
                item.model.id !== e.model.id
              ) {
                this.editor.getCurrentPage().remove(e.item);
                this.$message.warning("只能有一个开始节点或结束节点");
              }
            }
          }
        }
      });
      currentPage.on("node:click", function(evt) {
        // 获取当前节点数据信息
        console.log(evt);
      });
      currentPage.on("node:dblclick", evt => {
        // 获取当前节点数据信息
        this.dialogNodeVisible = true;
        console.log(evt);
        console.log(evt.item.model);
        this.nodeData = { ...evt.item.model };
        console.log("双击事件");
      });
      currentPage.on("node:contextmenu", function(evt) {
        // 右键事件
        console.log(evt);
      });
      // 监听（选择对象后）事件
      currentPage.on("afteritemselected", ev => {
        console.log("打印所选对象属性", ev.item);
        console.log("打印所选对象数据模型", ev.item.model);
        const selectedItemDataModel = ev.item.model;
        // 如果选择的对象是节点
        if (ev.item.isNode) {
          this.nodeAttributeForm.label = selectedItemDataModel.label;
          this.nodeAttributeForm.width = selectedItemDataModel.size.split(
            "*"
          )[0];
          this.nodeAttributeForm.height = selectedItemDataModel.size.split(
            "*"
          )[1];
          this.nodeAttributeForm.color = selectedItemDataModel.color;
        }
        // 如果选择的对象是边
        if (ev.item.isEdge) {
          ev.item.graph.edge({
            shape: "flow-polyline-round"
          });
          this.edgeAttributeForm.label = selectedItemDataModel.label;
          this.edgeAttributeForm.shape = selectedItemDataModel.shape;
        }
      });
      // 监听（删除后）事件
      currentPage.on("afterdelete", ev => {});
    },
    // 开启/关闭网格对齐
    toggleGridShowStatus(value) {
      if (value) {
        this.editor.getCurrentPage().showGrid();
      } else {
        this.editor.getCurrentPage().hideGrid();
      }
    },

    // 保存为文件
    saveAsFile() {
      const jsonString = JSON.stringify(this.editor.getCurrentPage().save());
      const blob = new Blob([jsonString]);
      const blobURL = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.download = "数据.json";
      downloadLink.href = blobURL;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      URL.revokeObjectURL(blobURL);
      document.body.removeChild(downloadLink);
    },
    // 读取历史数据
    readHistoryData() {
      const stringData = localStorage.getItem("flowData");
      if (stringData === "" || stringData === "{}" || stringData === null) {
        this.$message.warning("无历史数据");
        return;
      }
      const jsonData = JSON.parse(stringData);
      this.editor.getCurrentPage().read(jsonData);
    },
    // 读取数据
    readDataSource() {
      const stringData = localStorage.getItem("flowData");
      if (stringData === "" || stringData === "{}" || stringData === null) {
        this.$message.warning("无历史数据");
        return;
      }
      const jsonData = JSON.parse(stringData);
      this.dataSourceNode = jsonData;
      this.dialogVisible = true;
    },
    // 读取上传数据
    readUploadData() {
      const uploadButton = document.createElement("input");
      uploadButton.setAttribute("type", "file");
      uploadButton.setAttribute("accept", ".json");
      uploadButton.addEventListener("change", e => {
        console.dir(uploadButton);
        const file = uploadButton.files[0];
        const fileReader = new FileReader();
        fileReader.onload = event => {
          console.log(event);
          const text = JSON.parse(event.target.result);
          console.log(text);
          this.editor.getCurrentPage().read(text);
        };
        fileReader.readAsText(file);
      });
      uploadButton.click();
    },
    //
    save(source) {
      // const res = construct(source);
      console.log(JSON.stringify(source, null, 2));
    },
    // 保存节点属性
    saveNodeAttribute() {
      this.editor.executeCommand(() => {
        // 获取画布
        const page = this.editor.getCurrentPage();
        // 获取所选对象
        const selectedItem = page.getSelected()[0];
        page.update(selectedItem.id, {
          label: this.selectedItem.label,
          size: this.selectedItem.width + "*" + this.selectedItem.height,
          color: this.selectedItem.color
        });
      });
    },
    // 保存边属性
    saveEdgeAttribute() {
      this.editor.executeCommand(() => {
        // 获取画布
        const page = this.editor.getCurrentPage();
        // 获取所选对象
        const selectedItem = page.getSelected()[0];
        console.log(this.edgeAttributeForm);
        page.update(selectedItem.id, {
          label: this.edgeAttributeForm.label,
          shape: this.edgeAttributeForm.shape
        });
      });
    },
    handlerSubmit() {
      this.dialogNodeVisible = false;
      const page = this.editor.getCurrentPage();
      console.log(this.nodeData);
      page.update(this.nodeData.id, {
        label: this.nodeData.label,
        size: this.nodeData.size,
        color: this.nodeData.color
      });
    },
    handleClose() {}
  }
};
</script>
<style lang='less' scoped>
#canvas {
  width: 100%;
  height: 100%;
}
.left,
.right {
  height: 800px;
  border: 1px solid rgb(105, 154, 197);
  padding: 10px;
  user-select: none;
}
.left-title {
  color: rgb(105, 163, 216);
  font-size: 18px;
  text-align: center;
}
.left-content {
  display: flex;
  flex-wrap: wrap;
  /* 可选：添加一些间距和样式 */
  gap: 10px;
  .item {
    width: 60px;
    height: 110px;
    flex: 0 0 calc(50% - 10px); /* 一行两个元素，减去间距 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .top {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgb(105, 163, 216);
    }
    .text {
      color: rgb(105, 163, 216);
      font-size: 18px;
      text-align: center;
      margin: 5px 0 15px 0;
    }
  }
}
#toolbar {
  display: flex;
  align-items: center;
  margin: 15px 0 10px;
  gap: 20px;
  .tool {
    width: 120px;
    height: 50px;
    font-size: 14px;
    background-color: rgb(105, 163, 216);
    line-height: 50px;
    text-align: center;
    color: #dcdfe6;
  }
}
#contextmenu {
  display: none;
  .menu {
    .el-button {
      width: 100%;
      display: block;
      margin-left: 0;
      border-radius: 0 !important;
      border-bottom: none;
      &:nth-last-of-type(1) {
        border-bottom: 1px solid #dcdfe6;
      }
    }
  }
}

.jse-theme-dark {
  --jse-theme: dark;

  /* over all fonts, sizes, and colors */
  --jse-theme-color: #2f6dd0;
  --jse-theme-color-highlight: #467cd2;
  --jse-background-color: #1e1e1e;
  --jse-text-color: #d4d4d4;

  /* main, menu, modal */
  --jse-main-border: 1px solid #4f4f4f;
  --jse-menu-color: #fff;
  --jse-modal-background: #2f2f2f;
  --jse-modal-overlay-background: rgba(0, 0, 0, 0.5);
  --jse-modal-code-background: #2f2f2f;

  /* tooltip in text mode */
  --jse-tooltip-color: var(--jse-text-color);
  --jse-tooltip-background: #4b4b4b;
  --jse-tooltip-border: 1px solid #737373;
  --jse-tooltip-action-button-color: inherit;
  --jse-tooltip-action-button-background: #737373;

  /* panels: navigation bar, gutter, search box */
  --jse-panel-background: #333333;
  --jse-panel-background-border: 1px solid #464646;
  --jse-panel-color: var(--jse-text-color);
  --jse-panel-color-readonly: #737373;
  --jse-panel-border: 1px solid #3c3c3c;
  --jse-panel-button-color-highlight: #e5e5e5;
  --jse-panel-button-background-highlight: #464646;

  /* navigation-bar */
  --jse-navigation-bar-background: #656565;
  --jse-navigation-bar-background-highlight: #7e7e7e;
  --jse-navigation-bar-dropdown-color: var(--jse-text-color);

  /* context menu */
  --jse-context-menu-background: #4b4b4b;
  --jse-context-menu-background-highlight: #595959;
  --jse-context-menu-separator-color: #595959;
  --jse-context-menu-color: var(--jse-text-color);
  --jse-context-menu-pointer-background: #737373;
  --jse-context-menu-pointer-background-highlight: #818181;
  --jse-context-menu-pointer-color: var(--jse-context-menu-color);

  /* contents: json key and values */
  --jse-key-color: #9cdcfe;
  --jse-value-color: var(--jse-text-color);
  --jse-value-color-number: #b5cea8;
  --jse-value-color-boolean: #569cd6;
  --jse-value-color-null: #569cd6;
  --jse-value-color-string: #ce9178;
  --jse-value-color-url: #ce9178;
  --jse-delimiter-color: #949494;
  --jse-edit-outline: 2px solid var(--jse-text-color);

  /* contents: selected or hovered */
  --jse-selection-background-color: #464646;
  --jse-selection-background-inactive-color: #333333;
  --jse-hover-background-color: #343434;
  --jse-active-line-background-color: rgba(255, 255, 255, 0.06);
  --jse-search-match-background-color: #343434;

  /* contents: section of collapsed items in an array */
  --jse-collapsed-items-background-color: #333333;
  --jse-collapsed-items-selected-background-color: #565656;
  --jse-collapsed-items-link-color: #b2b2b2;
  --jse-collapsed-items-link-color-highlight: #ec8477;

  /* contents: highlighting of search results */
  --jse-search-match-color: #724c27;
  --jse-search-match-outline: 1px solid #966535;
  --jse-search-match-active-color: #9f6c39;
  --jse-search-match-active-outline: 1px solid #bb7f43;

  /* contents: inline tags inside the JSON document */
  --jse-tag-background: #444444;
  --jse-tag-color: #bdbdbd;

  /* contents: table */
  --jse-table-header-background: #333333;
  --jse-table-header-background-highlight: #424242;
  --jse-table-row-odd-background: rgba(255, 255, 255, 0.1);

  /* controls in modals: inputs, buttons, and `a` */
  --jse-input-background: #3d3d3d;
  --jse-input-border: var(--jse-main-border);
  --jse-button-background: #808080;
  --jse-button-background-highlight: #7a7a7a;
  --jse-button-color: #e0e0e0;
  --jse-button-secondary-background: #494949;
  --jse-button-secondary-background-highlight: #5d5d5d;
  --jse-button-secondary-background-disabled: #9d9d9d;
  --jse-button-secondary-color: var(--jse-text-color);
  --jse-a-color: #55abff;
  --jse-a-color-highlight: #4387c9;

  /* svelte-select */
  --background: #3d3d3d;
  --border: 1px solid #4f4f4f;
  --list-background: #3d3d3d;
  --item-hover-bg: #505050;
  --multi-item-bg: #5b5b5b;
  --input-color: #d4d4d4;
  --multi-clear-bg: #8a8a8a;
  --multi-item-clear-icon-color: #d4d4d4;
  --multi-item-outline: 1px solid #696969;
  --list-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);

  /* color picker */
  --jse-color-picker-background: #656565;
  --jse-color-picker-border-box-shadow: #8c8c8c 0 0 0 1px;
}
</style>

