<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/header/Header'

  const ERR_OK = 0

  export default {
    data () {
      return {
        seller: {}
        // 变量seller 通过prop(parent2child)传给组件v-header
      }
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
      // this: vue实例
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = response.data
          // console.log(this.seller)
        }
      })
    },
    components: {
      'v-header': Header
    }
  }
</script>

<style lang="scss" scoped>
  @import "./common/scss/mixin";

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7, 17, 27, 0.1));

    .tab-item {
      flex: 1;
      text-align: center;

      &>a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);

        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
</style>
