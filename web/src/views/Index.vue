<template>
  <div>
    <v-header></v-header>
    <router-view />
    <v-footer></v-footer>
  </div>
</template>

<script>
import VHeader from "@/components/main-header";
import VFooter from "@/components/main-footer";
export default {
  components: {
    VHeader,
    VFooter,
  },
};
</script>

<style lang="less" scoped>
</style>