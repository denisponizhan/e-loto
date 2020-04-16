<template>
  <nav class="header-navigation">
    <ul>
      <li v-for="i in navigation" :key="i.path">
        <router-link :to="i.path">{{i.label}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import navigation from "@/vue-router/navigation";
export default {
  name: "navigation-component",
  data() {
    return {
      navigation
    };
  }
};
</script>
<style lang="scss">
.header-navigation {
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    li {
      list-style: none;
      display: block;
      margin-right: 30px;
    }
  }
}
</style>