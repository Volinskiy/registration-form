<template>

  <div class="control-select">
    <ControlInpuTtext
      v-model="inputTarget"
      :label="label"
      :warning-mess="warningMess"
      :placeholder="placeholder"
      :valid="valid"
      @inputTakeFocus="toggleFocusTrue()"
      @setFocusList="passFocus()"
    />
      <!-- :focused="hasInputFocus" -->
      <!-- @inputOutFocus="toggleFocusFalse()" -->

    <fieldset>
      <!-- Скрытая радиокнопка, используется для передачи фокуса input -->
       <!-- @change="passFocus()" -->
      <input
       class="hidden"
       type="radio"
       id="kraken" name="monster"
       tabindex="-1"
      >
      <label for="kraken">Kraken</label><br/>

      <input
       type="radio"
       id="sasquatch"
       name="monster"
       tabindex="-1"
       :ref="222"  
      >
      <label
        for="sasquatch"
      >Sasquatch</label><br/>

      <input
       type="radio"
       id="mothman"
       name="monster"
       tabindex="-1"
      >
      <label for="mothman">Mothman</label>
    </fieldset>
  
  </div>
</template>

<script>

import ControlInpuTtext from '@/components/control-input-text.vue'

export default {
  props: [
    'label', 'warning-mess', 'placeholder', 'valid',
  ],
  data() {
    return {
      inputTarget: '',
      hasInputFocus: false,
    }
  },
  methods: {
    passFocus() {
      
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
    ControlInpuTtext,
  },
};
  
</script>

<style lang="less">
  @import '../assets/variables.less';

.hidden {
  appearance: none;
}

input[type="radio"] {
  &:hover {
    outline: 1px solid black;
  }
}
</style>