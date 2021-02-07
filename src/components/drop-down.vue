<template>
  <div class="dropdown">
    <ul class="dropdown__list">
      <li
        v-for="(val, key, index) in dropdownList"
        :ref="index"
        :key="key"
        @click="toggleClickedItemToCurrent(index)"
        class="dropdown__item"
        >{{ val }}</li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    dropdownList: {
      type: Object,
      default: function () {
        return {
          'ab': 'Abkhaz',
          'aa': 'Afar',
          'bm': 'Bambara',
          'ba': 'Bashkir',
          'en': 'English',
          'eo': 'Esperanto',
          'gv': 'Manx',
          'mk': 'Macedonian',
          'rm': 'Romansh',
          'sn': 'Shona',
          'uz': 'Uzbek',
          'yo': 'Yoruba',
        }
      },
    },
    moveNextDropdownItem: {
      type: Boolean,
      default: false
    },
    movePreviousDropdownItem: {
      type: Boolean,
      default: false
    },
    moveInputedItem: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      lengthDataList: null,
      currentElementNumber: null,
    }
  },
  watch: {
    moveNextDropdownItem: function() {
      if(this.currentElementNumber === null) {
        // Значение -1 т.к. метод toggleToNextCurrentElement предусматривает возврат
        // к началу списка по достижении конца списка
        this.currentElementNumber = -1
      }
      this.toggleToNextCurrentElement()
      this.returnNewValueToParent()
    },
    movePreviousDropdownItem: function() {
      if(this.currentElementNumber === null) {
        // Значение this.lengthDataList т.к. метод toggleToPreviousCurrentElement предусматривает возврат
        // к концу списка по достижении начала списка
        this.currentElementNumber = this.lengthDataList
      }
      this.toggleToPreviousCurrentElement()
      this.returnNewValueToParent()
    },
    moveInputedItem() {
      this.toggleClickedItemToCurrent(this.moveInputedItem)
      this.currentElementNumber = this.moveInputedItem
      // this.returnNewValueToParent()
}
  },
  methods: {
    toggleClickedItemToCurrent(index) {
      if(this.currentElementNumber === null) {
        // Значение т.к. this.currentElementNumber имеет начальное значение null
        this.currentElementNumber = 0
      }
      this.renderNewCurrentElement(index)
      this.currentElementNumber = index
    },
    toggleToNextCurrentElement() {
      let newCurrentElement = null
      if ((this.currentElementNumber + 1) > this.lengthDataList) {
        newCurrentElement = 0
      } else {
        newCurrentElement = this.currentElementNumber + 1
      }
      this.renderNewCurrentElement(newCurrentElement)
      this.currentElementNumber = newCurrentElement
    },
    toggleToPreviousCurrentElement() {
      let newCurrentElement = null
      if ((this.currentElementNumber - 1) < 0) {
        newCurrentElement = this.lengthDataList
      } else {
        newCurrentElement = this.currentElementNumber - 1
      }
      this.renderNewCurrentElement(newCurrentElement)
      this.currentElementNumber = newCurrentElement
    },
    renderNewCurrentElement(CurrentElem) {
      if (this.currentElementNumber !== -1) {
        this.$refs[this.currentElementNumber][0].classList.remove('active')
      }
      this.$refs[CurrentElem][0].classList.add('active')
    },
    returnNewValueToParent() {
      const newCurrentValue = this.$refs[this.currentElementNumber][0].innerHTML
      this.$emit('selected-new-current-element', newCurrentValue)
    }

  },
  created: function() {
    this.lengthDataList = Object.keys(this.dropdownList).length - 1
  }
};
  
</script>

<style scoped lang="less">
@import '../assets/variables.less';


.dropdown {
  padding: 12px 0;
  overflow-y: scroll;
  z-index: 1;
  background-color: @background-color-common;
  
  &__list {

    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    font-size: 16px;
    line-height: 1.3em;
    padding: 12px 15px 11px 15px;
    text-align: left;
    color: @text-gray;

    &.active,
    &:hover {
      background-color: @controls-active-color;
      color: white;
    }
  }
}
</style>