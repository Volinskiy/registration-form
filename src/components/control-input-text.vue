<template>
  <div class="control-input-text">
    <label class="control-input-text__label">
      <span class="control-input-text__label-text">
        {{ label }}
      </span>
      <input
        type="text"
        class="control-input-text__input"
        :placeholder="placeholder"
      >
    </label>
    <span
      :class="{ active: !valid }"
      class="control-input-text__warn-mess">
      
      {{ warningMess }}
    </span>
  </div>
</template>

<script>

export default {
  props: [
    'label', 'warning-mess', 'placeholder', 'valid',
  ]
};
  
</script>

<style lang="less">
  @import '../assets/variables.less';

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

    &__input {
      @padding-top-bottom: 15px;

      border-radius: 6px;
      padding: @padding-top-bottom;
      line-height: 21px;
      border: 1px solid @controls-color;
      background: #FFFFFF;
      box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);

      &:active,
      &:focus {
        border-width: 2px;
        border-color: @controls-active-color;
        outline: none;
        // Учитываем изменение ширины border при фокусе/активности
        padding: calc(@padding-top-bottom - 1px);
      } 
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
  }
</style>