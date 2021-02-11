<template>
  <div
    class="control-input-text"
    :class="{'has-dropdown' : hasDropdown}"
  >
    <label
      class="control-input-text__label"
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
      >
    </label>
    
    <DropDown
      v-if="hasDropdown"
      v-show="isDropdownOpen"
      :is-dropdown-open="isDropdownOpen"
      :dropdown-list="dropdownList"
      :move-next-dropdown-item="selectNextDropdownItem"
      :move-previous-dropdown-item="selectPreviousDropdownItem"
      :move-inputed-item="matchItem"
      @choosen-new-current-element="pushSelectedItemToInput"
      @selected-new-current-element="saveSelectedItemValue"
      @close-dropdown="closeDropdown()"
      class="control-input-text__dropdown"
    />

    

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
  },
  // TODO сделать условное добавление свойства при hasDropdown == true
  data() {
    return {
      isDropdownOpen: false,
      selectNextDropdownItem: false,
      selectPreviousDropdownItem: false,
      inputValue: '',
      matchItem: null,
      dropdownListArrayReflection: [],
      selectedDropdownValue: '',
    }
  },
  watch: {
    value: function() {
      this.selectedDropdownValue = this.value
    }
  },
  computed: {
    getInputListeners() {
      if (this.hasDropdown) {
        return {
          input: (e) => {
            this.passMatchedElement()
            if(!this.isDropdownOpen) {
              this.isDropdownOpen = true
            }
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
              case 13:
                // Превентим отправку формы
                e.preventDefault()
                this.pushSelectedItemToInput(this.selectedDropdownValue)
                this.closeDropdown()
            }
          },
          focus: () => {
            // this.$emit('focus')
            this.isDropdownOpen = true
          },
          blur:() => {
              // this.isDropdownOpen = false
            // window.setTimeout(() => {
            //     // this.isDropdownOpen = false
            // }, 100)
            // this.$nextTick(function () {

            // })
          },
        }
      }
    },
  },
  methods: {
    pushSelectedItemToInput: function(selectedValue) {
      // Если не сматчена ни одно значение, не обновляем содержимое input
      if (selectedValue !== ''){
        this.inputValue = selectedValue
      }
    },
    passMatchedElement() {
      let matchedElementNumber = this.matchInputElement(this.inputValue)
      console.log(matchedElementNumber);
      this.matchItem = matchedElementNumber
    },
    matchInputElement(serchedSubstrElemName) {
      let index = 0;
      serchedSubstrElemName = serchedSubstrElemName.toLowerCase()
      if (serchedSubstrElemName === '') {
        // Исключаем пустую строку, т.к. findIndex считает, что любая строка
        // начинается с пустой строки
        return -1
      }
      index = this.dropdownListArrayReflection
                  .findIndex((elem) => {
                    elem = elem.toLowerCase()
                    return elem.startsWith(serchedSubstrElemName)
                  })
      // Если совбадение не найдено, то index = -1
      return index
    },
    saveSelectedItemValue(newValue) {
      this.selectedDropdownValue = newValue
    },
    updateDropdownListArrayReflection() {
      this.dropdownListArrayReflection = Object.entries(this.dropdownList).map(curent => curent[1])
    },
    closeDropdown() {
      this.isDropdownOpen = false
    },
  },
  components: {
    DropDown,
  },
  created: function() {
    this.updateDropdownListArrayReflection()
  }
};
  
</script>

<style lang="less">
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

  &:active,
  &:focus {
    border: none;
  }

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
    outline: none;
  }

  &__label-text {
    margin-bottom: @elements-margin-bottom;
    font-weight: 500;
    line-height: 21px;
    color: @text-gray;
    user-select: none;
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
    top: 84px;
    // bottom: calc(-1 * (@list-height + 4px));
    width: 100%;
  }
}
</style>