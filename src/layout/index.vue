<template>
  <div>
    <dataHeader></dataHeader>
    <Breadcrumb></Breadcrumb>
    <router-view></router-view>
    </div>
  </div>
</template>
<script>
import dataHeader from "./components/DataHeader.vue";
import Breadcrumb from "@/components/Breadcrumb";
export default {
  components: {
    dataHeader,
    Breadcrumb,
  },
};
</script>
<style lang="less" scoped></style>
