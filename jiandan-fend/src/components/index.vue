<template lang="pug">
  .index
    router-view 
    
</template>

<script>
export default {
  data() {
    return {
      msg: "",
    };
  }
};
</script>

<style lang="less" scoped>
.index{
  margin-top: 2.51rem;
  padding: 0 0.8rem 1rem;
}
</style>

