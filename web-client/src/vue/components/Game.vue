<template>
  <div id="game-component" class="game">
    <a-row type="flex">
      <a-col :md="{span: 12}">
        <GameInfo />
        <AccountInfo />
      </a-col>

      <a-col :md="{span: 12}">
        <a-page-header title="Play game">
          <a-row>
            <a-col span="24">
              <a-steps direction="vertical" :current="0">
                <a-step
                  title="Place stake"
                  description="Pick a number between 0 and 21, stake value is always 0.015 ETH"
                />
                <a-step title="Wait for draw" description="Your number is 2" />
              </a-steps>
            </a-col>
          </a-row>
          <a-row type="flex" justify="center" style="margin-top: 15px;">
            <a-form :layout="'inline'">
              <a-form-item label="Enter number">
                <a-input-number size="large" />
              </a-form-item>
              <a-form-item>
                <a-button key="1" type="primary" icon="dollar" size="large">Submit</a-button>
              </a-form-item>
            </a-form>
          </a-row>
        </a-page-header>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import AccountInfo from "@/vue/components/AccountInfo";
import GameInfo from "@/vue/components/GameInfo";

export default {
  name: "game-component",
  components: {
    AccountInfo,
    GameInfo
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.game {
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px 15px;
  .ant-page-header {
    background: transparent;
  }
}
</style>
