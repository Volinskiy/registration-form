<template>
  <ul class="langlist">
    <li v-for="lang in langList"
      class="langlist__item"
      >
      {{ lang }}
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    langList: {
      type: Array,
      default: function () {
        return ['Немецкий', 'Белорусский']
      }
    },
    // 'has-dropdown-focus': {
    //   type: Boolean,
    //   default: false
    // }
  },
  watch: {
    // hasDropdownFocus: function() {
    //   console.log(this);
    // }
  }
};
  
</script>

<style lang="less">
@import '../assets/variables.less';


.langlist {


  list-style: none;
  padding: 0;
  margin: 0;
  background-color: @background-color-common;
  z-index: 1;
  color: @text-gray;
  padding: 12px 0;
  overflow-y: scroll;


  &__item {
    font-size: 16px;
    line-height: 1.3em;
    padding: 12px 15px 11px 15px;
  }
}

</style>