<template>
  <div class="page">
    <Game />
    <a-row class="tables" type="flex" justify="space-between">
      <a-col :md="{ span: 11 }">
        <Stakes />
      </a-col>
      <a-col :md="{ span: 11 }">
        <Winners />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Header from "@/vue/components/Header";
import Game from "@/vue/components/Game";
import Stakes from "@/vue/components/Stakes";
import Winners from "@/vue/components/Winners";

export default {
  name: "main-component",
  components: {
    Header,
    Game,
    Stakes,
    Winners
  }
};
</script>
<style>
.tables {
  margin-top: auto;
}
</style>
