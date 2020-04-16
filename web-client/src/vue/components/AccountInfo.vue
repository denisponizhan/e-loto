<template>
  <a-page-header title="Account info">
    <a-descriptions size="small" :column="1">
      <a-descriptions-item label="Address">
        <a>{{account ? account : '...'}}</a>
      </a-descriptions-item>
    </a-descriptions>
    <a-row type="flex">
      <a-col span="10">
        <a-statistic title="Balance" prefix="ETH" :value="balance !== null ? balance : '...'" />
      </a-col>
      <a-col span="10">
        <a-row type="flex" align="bottom">
          <a-col span="18">
            <a-statistic
              title="Balance in game"
              prefix="ETH"
              :value="reward !== null? reward : '...'"
            />
          </a-col>
          <a-col span="6">
            <a-button type="primary" icon="money-collect">Withdraw</a-button>
          </a-col>
        </a-row>
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
    return {};
  },
  computed: {
    ...mapGetters({
      account: t.GET_SELECTED_ACCOUNT,
      balance: t.GET_ACCOUNT_BALANCE,
      reward: t.GET_REWARD_BALANCE
    })
  },
  async created() {},
  methods: {
    ...mapActions({})
  }
};
</script>
