<template>
  <div class="dropdown">
    <div class="dropdown__wrapper">
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
      currentElementNumber: -1,
    }
  },
  watch: {
    moveNextDropdownItem: function() {
      this.toggleToNextCurrentElement()
      this.returnNewValueToParent()
    },
    movePreviousDropdownItem: function() {
      if(this.currentElementNumber === -1) {
        // Значение this.lengthDataList т.к. метод toggleToPreviousCurrentElement предусматривает возврат
        // к концу списка по достижении начала списка
        this.currentElementNumber = this.lengthDataList
      }
      this.toggleToPreviousCurrentElement()
      this.returnNewValueToParent()
    },
    moveInputedItem() {
      this.toggleNewCurrent(this.moveInputedItem)
      this.returnNewValueToParent(true)
    }
  },
  methods: {
    toggleClickedItemToCurrent(indexElement) {
      this.toggleNewCurrent(indexElement)
      this.returnNewValueToParent()
      this.$emit('close-dropdown')
    },
    toggleNewCurrent(newIndexElement) {
      this.renderNewCurrentElement(newIndexElement)
      this.currentElementNumber = newIndexElement
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
    renderNewCurrentElement(newCurrentElem) {
      if (this.currentElementNumber !== -1) {
        this.$refs[this.currentElementNumber][0].classList.remove('active')
      }
      if (newCurrentElem !== -1) {
        this.$refs[newCurrentElem][0].classList.add('active')
      }
    },
    returnNewValueToParent(isForInsertion = false) {
      const newCurrentValue = this.$refs[this.currentElementNumber][0].innerHTML
      if (isForInsertion) {
        this.$emit('selected-new-current-element', newCurrentValue)
      } else {
        this.$emit('choosen-new-current-element', newCurrentValue)
      }
    }

  },
  created: function() {
    this.lengthDataList = Object.keys(this.dropdownList).length - 1
  }
};
  
</script>

<style lang="less">
@import '../assets/variables.less';


.dropdown {
  z-index: 1;
  background-color: @background-color-common;
  padding: 12px 0;

  &__wrapper {
    overflow-y: scroll;
    height: 100%;
  }
  
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
    user-select: none;

    &.active,
    &:hover {
      background-color: @controls-active-color;
      color: white;
    }
  }
}
</style>