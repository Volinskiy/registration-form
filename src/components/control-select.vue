<template>

  <div class="control-select">
    <ControlInputText
      v-model="inputTarget"
      :label="label"
      :warning-mess="warningMess"
      :placeholder="placeholder"
      :valid="valid"
      :isSelectCildComponent="true"
      :langList="langList"
    />

  </div>
</template>

<script>

import ControlInputText from '@/components/control-input-text.vue'

export default {
  props: [
    'label', 'warning-mess', 'placeholder', 'valid',
  ],
  data() {
    return {
      inputTarget: '',
      hasInputFocus: false,
      langList: [
        'Русский',
        'Английский',
        'Китайский',
        'Испанский',
        'Румынский',
        'Болгарский',
      ]
    }
  },
  methods: {
    passFocus() {
      // console.log('hasInputFocus');
      if (true) {
        // this.$refs['222'].addEventListener('click', function(){
        //   console.log('Click');
        // })
        this.toggleFocusFalse();
        // let event = new Event('mouseover', {bubbles: false, cancelable: false, composed: false});
        // console.log(this.$refs['222'].dispatchEvent(event));
        // this.hasInputFocus = !this.hasInputFocus
        // this.$refs['222'].mousover();
      } else {
        this.hasInputFocus = !this.hasInputFocus
      }
    },
    toggleFocusTrue() {
      if (!this.hasInputFocus) {
        this.hasInputFocus = !this.hasInputFocus
      }
    },
    toggleFocusFalse() {
      if (this.hasInputFocus) {
        this.hasInputFocus = !this.hasInputFocus
      }
    },
  },
  components: {
    ControlInputText,
  },
};
  
</script>

<style lang="less">
@import '../assets/variables.less';

.control-select {


}
</style>