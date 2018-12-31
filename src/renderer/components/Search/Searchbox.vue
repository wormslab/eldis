<template>
  <section class="search-box-content">
    <input class="search-txt"
           type="text"
           :value="value"
           placeholder="Try to search"
           @input="handleInput"
    />
    <a class="search-btn" href="#"><i class="fa fa-search"></i></a>
  </section>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box-content {
  position: absolute;
  background: #2f3640;
  height: 52px;
  border-radius: 52px;
  padding: 6px 6px 6px 12px;
  .search-txt {
    border: none;
    outline: none;
    background: none;
    float: left;
    padding: 0;
    color: white;
    font-size: 16px;
    transition: 0.4s;
    line-height: 40px;
    width: 240px;
    padding: 0 6px;
  }
  .search-btn {
    color: #e84118;
    float: right;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #2f3640;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s;
  }
}
.search-box-content:hover > .search-btn {
  background: white;
}
</style>
