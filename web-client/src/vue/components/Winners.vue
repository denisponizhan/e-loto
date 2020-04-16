<template>
  <div id="winners-component">
    <h2>Winners</h2>
    <div
      class="demo-infinite-container winners custom-table"
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <a-list :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-row type="flex" align="middle" justify="space-between" style="width: 100%">
            <a-col span="20">
              <a-list-item-meta :description="toDateFormat(item.createdDate)">
                <a slot="title" :href="'#'">{{ item.userAddress.slice(0, 30) + "..."}}</a>
                <a-avatar slot="avatar" :src="toBlockieFormat(item.userAddress)" />
              </a-list-item-meta>
            </a-col>
            <a-col span="4">
              <a-tag color="green" class="tag">1.2 ETH</a-tag>
            </a-col>
          </a-row>
        </a-list-item>
        <div v-if="loading && !busy" class="demo-loading-container">
          <a-spin />
        </div>
      </a-list>
    </div>
  </div>
</template>

<script>
import reqwest from "reqwest";
import infiniteScroll from "vue-infinite-scroll";
import { dateMixin, blockiesMixin } from "@/vue/mixins";

export default {
  directives: { infiniteScroll },
  mixins: [dateMixin, blockiesMixin],
  data() {
    return {
      data: [],
      loading: false,
      busy: false
    };
  },
  beforeMount() {
    this.fetchData(res => {
      this.data = res;
    });
  },
  methods: {
    fetchData(callback) {
      reqwest({
        url: "http://localhost:3004/stakes",
        type: "json",
        method: "get",
        contentType: "application/json",
        success: res => {
          callback(res);
        }
      });
    },
    handleInfiniteOnLoad() {
      const data = this.data;
      this.loading = true;
      if (data.length > 14) {
        this.busy = true;
        this.loading = false;
        return;
      }
      this.fetchData(res => {
        this.data = data.concat(res);
        this.loading = false;
      });
    },
    toDateFormat(date) {
      return this.formatDate(date);
    },
    toBlockieFormat(seed) {
      return this.toBlockie(seed).toDataURL();
    }
  }
};
</script>

<style lang="scss">
.custom-table {
  border: 1px solid #edfcff;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background: rgba(255, 255, 255, 0.8);
  .ant-table-thead > tr > th {
    background: transparent;
  }
  .ant-table-thead > tr:last-child {
    border-bottom: none;
  }
  .ant-table-tbody > tr:last-child > td {
    border-bottom: none;
  }
}
</style>
