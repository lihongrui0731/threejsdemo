<template>
  <a-config-provider>
    <a-layout-header><Header /></a-layout-header>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-config-provider>
</template>
<script setup>
import Header from "@/components/layout/Header.vue";
</script>
<style scoped>

</style>
