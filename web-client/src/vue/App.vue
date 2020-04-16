<template>
  <div id="app">
    <Particles />
    <Wrapper>
      <Header />
      <router-view></router-view>
    </Wrapper>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Particles from "@/vue/components/Particles";
import Wrapper from "@/vue/components/Wrapper";
import Header from "@/vue/components/Header";

import t from "@/vuex/types";

export default {
  name: "main-component",
  components: {
    Particles,
    Wrapper,
    Header
  },
  async created() {
    await this.init();
  },
  methods: {
    ...mapActions({
      init: t.INIT
    })
  }
};
</script>
