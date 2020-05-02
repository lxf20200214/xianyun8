<template>
  <div>
    <hotelList />
    酒店首页
    <!-- <nuxt-link :to="`/hotel/detail/?id=234`">酒店详情</nuxt-link> -->
  </div>
</template>

<script>
import hotelList from "@/components/hotel/hotelList.vue";
export default {
  components: {
    hotelList
  }
};
</script>

<style lang="less" scoped>
</style>