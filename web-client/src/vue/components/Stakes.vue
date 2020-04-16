<template>
  <div id="stakes-component">
    <h2>Stakes</h2>
    <div
      class="demo-infinite-container stakes custom-table"
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <a-list :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-row type="flex" align="middle" justify="space-between" style="width: 100%">
            <a-col span="22">
              <a-list-item-meta :description="toDateFormat(item.createdDate)">
                <a slot="title" :href="'#'">{{ item.userAddress.slice(0, 30) + "..."}}</a>
                <a-avatar slot="avatar" :src="toBlockieFormat(item.userAddress)" />
              </a-list-item-meta>
            </a-col>
            <a-col span="2">
              <a-tag color="purple" class="tag">{{item.bet}}</a-tag>
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
.demo-infinite-container {
  overflow: auto;
  padding: 8px 24px;
  height: 300px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
.blockies {
  border-radius: 50%;
}
</style>
