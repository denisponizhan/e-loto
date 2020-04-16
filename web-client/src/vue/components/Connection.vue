<template>
  <a-row justify="end" type="flex" class="connection">
    <a-col>
      <span style="display: block; margin-right: 15px;">Metamask</span>
    </a-col>
    <a-col>
      <a-spin v-if="!connectionStatus" size="small" />
      <div v-else class="connection-bar">
        <a-badge
          :color="connectionStatus != CONNECTED ? 'red' : 'green'"
          :text="connectionStatus"
          class="connection-bage"
        />
        <span class="connection-network">{{NETWORKS[networkId]}}</span>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import t from "@/vuex/types";
import { CONNECTED, NETWORKS } from "@/utils/constants";

export default {
  name: "connection-component",
  data() {
    return {
      CONNECTED,
      NETWORKS
    };
  },
  computed: {
    ...mapGetters({
      connectionStatus: t.GET_CONNECTION_STATUS,
      networkId: t.GET_NETWORK_ID
    })
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss">
.connection {
  &-bar {
    display: flex;
    flex-direction: column;
    text-align: right;
  }
  &-network {
    font-size: 10px;
  }
}
</style>
