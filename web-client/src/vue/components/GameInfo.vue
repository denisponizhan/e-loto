<template>
  <a-page-header title="Game info" subTitle="Last winning number">
    <template slot="tags">
      <a-tag color="green">2</a-tag>
    </template>
    <a-row type="flex" align="bottom">
      <a-col span="10">
        <a-statistic-countdown title="Time to draw" :value="deadline" format="HH:mm" />
      </a-col>
      <a-col span="10">
        <a-statistic
          title="Total Stakes"
          prefix="ETH"
          :value="stakesTotal !== null ? stakesTotal : '...'"
        />
      </a-col>
    </a-row>
  </a-page-header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import t from "@/vuex/types";

export default {
  name: "account-component",
  data() {
    return {
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30
    };
  },
  computed: {
    ...mapGetters({
      stakesTotal: t.GET_STAKES_TOTAL
    })
  },
  async created() {},
  methods: {
    ...mapActions({})
  }
};
</script>
