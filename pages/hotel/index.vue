<template>
  <div>
<<<<<<< HEAD
    <hotelList />
=======
    酒店首页
    <nuxt-link :to="`/hotel/detail`">酒店详情</nuxt-link>
>>>>>>> 8200fb8eed43c20d75712a2ae744b7e7a57a9ea9
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