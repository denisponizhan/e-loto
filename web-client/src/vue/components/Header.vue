<template>
  <div id="header-component" class="header">
    <a-row align="middle" justify="space-between" type="flex" class="header-row">
      <a-col :md="{ span: 12 }">
        <Navigation />
      </a-col>
      <a-col :md="{ span: 12 }">
        <Connection />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Navigation from "@/vue/components/Navigation";
import Connection from "@/vue/components/Connection";

export default {
  name: "header-component",
  components: {
    Navigation,
    Connection
  }
};
</script>
<style lang="scss">
.header {
  height: 100px;
  &-row {
    height: 100%;
  }
}
</style>
