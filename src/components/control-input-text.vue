<!-- TODO импортировать LangList по условию hasDropDown == true -->

<template>
  <div
    class="control-input-text"
  >
    <label
      class="control-input-text__label"
      :class="{'has-dropdown' : hasDropdown}"
    >
      <span class="control-input-text__label-text">
        {{ label }}
      </span>
      <input
        v-model="inputValue"
        type="text"
        class="input-text"
        :placeholder="placeholder"
        v-on="getInputListeners"
        ref="input"
      >
    
    <DropDown
      v-if="hasDropdown"
      v-show="isDropdownOpen"
      :dropdown-list="hasDropdown ? dropdownList : null"
      :move-next-dropdown-item="selectNextDropdownItem"
      :move-previous-dropdown-item="selectPreviousDropdownItem"
      :move-inputed-item="matchItem"
      @selected-new-current-element="pushDropdownItem"
      class="control-input-text__dropdown"
    />

    
    </label>

    <span
      :class="{ active: !valid }"
      class="control-input-text__warn-mess">
      
      {{ warningMess }}
    </span>
  </div>
</template>

<script>
import DropDown from '@/components/drop-down.vue'


export default {
  props: {
    label: String,
    warningMess: String,
    placeholder: String,
    valid: Boolean,
    value: String,
    hasDropdown: {
      type: Boolean,
      default: false
    },
    // TODO сделать условное добавление свойства при hasDropdown == true
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
    matchItem: Number,
  },
  data() {
    return {
      isDropdownOpen: false,
      selectNextDropdownItem: false,
      selectPreviousDropdownItem: false,
      inputValue: '',
    }
  },
  computed: {
    getInputListeners() {
      if (this.hasDropdown) {
        return {
          input: (e) => {
            this.passMatchedItem()
          },
          keydown: (e) => {
            switch (e.keyCode) {
              case 40:
                this.selectNextDropdownItem = !this.selectNextDropdownItem
                break
              case 38:
                // Превентим перемещение курсора в начало строки
                e.preventDefault()
                this.selectPreviousDropdownItem = !this.selectPreviousDropdownItem
                break
            }
          },
          focus: () => {
            this.isDropdownOpen = true
          },
          blur:() => {
            // this.isDropdownOpen = false
          },
        }
      }
    },
  },
  methods: {
    pushDropdownItem: function(selectedValue) {
      this.$refs.input.value = selectedValue
    },
    passMatchedItem() {
      let matchElementNumber = this.matchInputElement(this.inputValue)
      if (matchElementNumber !== null) {
        this.matchItem = matchElementNumber

      }
    },
    matchInputElement(serchedSubstrName) {
      let index = 0;
      index = Object.entries(this.dropdownList).map(curent => curent[1]).findIndex(elem => elem.startsWith(serchedSubstrName))
      // index = Object.entries(this.dropdownList).map(curent => curent[1]).findIndex(elem => elem == serchedSubstrName)
      if (index != -1) {
        return index
      } else {
        return null
      }
    },
    compareStrings(substr) {
      startsWith
    }
  },
  watch: {

  },
  components: {
    DropDown
  }
};
  
</script>

<style scoped lang="less">
@import '../assets/variables.less';
@import '../assets/blocks/input-text.less';



.has-dropdown {
  position: relative;
}

.control-input-text {
  @elements-margin-bottom: 7px;
  
  display: flex;
  flex-direction: column;
  line-height: 1.3em;

  & > * {
    margin-bottom: @elements-margin-bottom;
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  &__label {
    display: flex;
    flex-direction: column;
    Size: 16px;
  }

  &__label-text {
    margin-bottom: @elements-margin-bottom;
    font-weight: 500;
    line-height: 21px;
    color: @text-gray;
  }

  &__warn-mess {
    color: #FF7171;
    font-size: 14px;
    line-height: 1.3em;
    visibility: hidden;

    &.active {
      visibility: visible;
    }
  }

  &__dropdown {
    @list-height: 200px;
    position: absolute;
    height: @list-height;
    bottom: calc(-1 * (@list-height + 4px));
    width: 100%;
  }
}
</style>