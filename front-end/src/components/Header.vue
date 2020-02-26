<template>
  <div class="header">
    <button @click="submit">Place Stake</button>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "app-header",
  methods: {
    ...mapActions({
      loadCoinbase: "loadCoinbase",
      loadBalance: "loadBalance",
      placeStake: "placeStake"
    }),
    async submit() {
      await this.placeStake();
    }
  },
  async created() {
    await this.loadCoinbase();
    await this.loadBalance();
  }
};
</script>
<style scoped></style>
