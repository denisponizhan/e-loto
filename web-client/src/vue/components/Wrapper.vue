<template>
  <a-row class="wrapper" type="flex" justify="center">
    <a-col
      :xs="{ span: 24 }"
      :sm="{ span: 24 }"
      :md="{ span: 22 }"
      :lg="{ span: 18 }"
      :xl="{ span: 18 }"
    >
      <div class="content">
        <slot></slot>
      </div>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "wrapper-component"
};
</script>
<style lang="scss">
.wrapper {
  min-height: 100vh;
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .page {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
}
</style>