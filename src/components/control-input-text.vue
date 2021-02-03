<!-- TODO импортировать LangList по условию isSelectCildComponent == true -->

<template>
  <div
    class="control-input-text"
  >
    <label
      class="control-input-text__label"
      :class="{'is-select' : isSelectCildComponent}"
    >
      <span class="control-input-text__label-text">
        {{ label }}
      </span>
      <input
        type="text"
        class="input-text"
        :placeholder="placeholder"
        :value="value"
        v-on="getInputListeners"
      >
    
    <LangList
      v-if="isSelectCildComponent"
      v-show="isLanglistLangOpen"
      :langList="isSelectCildComponent ? langList : null"
      :has-langlist-focus="hasLanglistFocus"
      :has-langlist-hover="hasLanglistHover"
      class="control-input-text__langlist"
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
import LangList from '@/components/lang-list.vue'


export default {
  props: {
    label: String,
    warningMess: String,
    placeholder: String,
    valid: Boolean,
    value: String,
    isSelectCildComponent: {
      type: Boolean,
      default: false
    },
    hasLanglistHover: {
      type: Boolean,
      default: false
    },
    // TODO сделать условное добавление свойства при isSelectCildComponent == true
    langList: {
      type: Array,
      default: function () {
        return ['Немецкий', 'Белорусский']
      }
    },
  },
  data() {
    return {
      isLanglistLangOpen: false,
      hasLanglistFocus: false,
    }
  },
  computed: {
    getInputListeners() {
      if (this.isSelectCildComponent) {
        return {
          input: (e) => {
            this.$emit('input', e.target.value)
          },
          keydown: (e) => {
            if (e.keyCode == 40) {
              this.hasLanglistFocus = true
          }},
          focus: () => {
            this.isLanglistLangOpen = true
          },
          blur:() => {
            this.isLanglistLangOpen = false
          },
        }
      }
    },
    getComponentListeners() {
      if (this.isSelectCildComponent) {
        return {
        }
      }
    }
  },
  components: {
    LangList
  }
};
  
</script>

<style lang="less">
@import '../assets/variables.less';
@import '../assets/blocks/input-text.less';



.is-select {
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

  &__langlist {
    @list-height: 200px;
    position: absolute;
    height: @list-height;
    bottom: calc(-1 * (@list-height + 4px));
    width: 100%;
  }
}
</style>