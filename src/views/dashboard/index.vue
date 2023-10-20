<template>
  <div class="content">
    <div class="list1">条件展示区</div>
    <div class="list2">列表展示区</div>
  </div>
</template>
<style lang="less" scope>
.content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px - 72px);
}
.list1 {
  padding-top: 30px;
  text-align: center;
  color: #fff;
  height: 150px;
  background: rgba(39, 15, 170, 0.3);
}
.list2 {
  flex: 1;
  padding-top: 30px;
  text-align: center;
  color: #fff;
  background: rgba(69, 46, 204, 0.3);
}
</style>
